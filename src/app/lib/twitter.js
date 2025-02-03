import axios from "axios";
import { RateLimiter } from './rateLimit';
import { getFromCache, setCache, CACHE_STRATEGIES } from './cache';
import PredictiveModel from './analytics/predictiveModel';

const getTwitterApi = () => {
  const TWITTER_BEARER_TOKEN = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;
  
  // Log for debugging
  console.log('Using Bearer Token:', TWITTER_BEARER_TOKEN?.slice(0, 20) + '...');
  
  return axios.create({
    baseURL: "https://api.twitter.com/2",
    headers: {
      'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
};

// Initialize rate limiters
const searchLimiter = new RateLimiter('SEARCH');
const engagementLimiter = new RateLimiter('ENGAGEMENT');

// Create model instance but initialize it lazily
const predictiveModel = new PredictiveModel();

// Initialize model in the background
(async () => {
  if (typeof window !== 'undefined') {  // Only run on client side
    try {
      await predictiveModel.initialize();
    } catch (error) {
      console.error('Failed to initialize predictive model:', error);
    }
  }
})();

// Add analytics tracking
const analyticsData = {
  searches: [],
  engagements: [],
  predictions: []
};

// Basic user search - works with free API
export const searchTwitterUsers = async (filters) => {
  try {
    const response = await axios.post('/api/twitter', {
      query: filters.bioKeywords || 'developer'
    });

    console.log('API Response:', response.data);
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    return response.data.data || [];

  } catch (error) {
    console.error('Search error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message || 'Failed to search users');
  }
};

// Get user's recent tweets for engagement analysis
export const getUserTweets = async (userId) => {
  try {
    const response = await getTwitterApi().get(`/users/${userId}/tweets`, {
      params: {
        max_results: 100,
        'tweet.fields': 'public_metrics,created_at',
        exclude: 'retweets,replies'
      }
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user tweets:", error);
    throw error;
  }
};

// Get user's followers
export const getUserFollowers = async (userId) => {
  try {
    const response = await getTwitterApi().get(`/users/${userId}/followers`, {
      params: {
        max_results: 100,
        'user.fields': 'public_metrics,description,location,verified'
      }
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user followers:", error);
    throw error;
  }
};

// Calculate real engagement rate from recent tweets
export const calculateUserEngagement = async (userId) => {
  try {
    const tweets = await getUserTweets(userId);
    if (!tweets || tweets.length === 0) return 0;

    const totalEngagement = tweets.reduce((sum, tweet) => {
      const metrics = tweet.public_metrics;
      return sum + metrics.like_count + metrics.retweet_count + metrics.reply_count;
    }, 0);

    return (totalEngagement / tweets.length).toFixed(2);
  } catch (error) {
    console.error("Error calculating engagement:", error);
    return 0;
  }
};

// Main function to search leads with available filters
export const findLeads = async (filters) => {
  try {
    // 1. Initial user search with basic filters
    const users = await searchTwitterUsers(filters);

    // 2. If engagement filter is applied, get more details
    if (filters.engagementRate) {
      const usersWithEngagement = await Promise.all(
        users.map(async (user) => {
          const engagement = await calculateUserEngagement(user.id);
          return {
            ...user,
            engagement_rate: engagement
          };
        })
      );

      return usersWithEngagement.filter(
        user => user.engagement_rate >= filters.engagementRate
      );
    }

    return users;
  } catch (error) {
    console.error("Error in lead search:", error);
    throw error;
  }
};

// Add Redis or similar caching mechanism (here using a simple in-memory cache for demo)
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Add historical data store
const historicalData = {
  followerDistribution: {
    '1k-5k': 0.45,    // 45% of users
    '5k-10k': 0.25,   // 25% of users
    '10k-50k': 0.20,  // 20% of users
    '50k-100k': 0.07, // 7% of users
    '100k+': 0.03     // 3% of users
  },
  engagementRates: {
    average: 1.2,
    distribution: {
      '0-1%': 0.40,   // 40% of users
      '1-2%': 0.30,   // 30% of users
      '2-5%': 0.20,   // 20% of users
      '5-10%': 0.08,  // 8% of users
      '10%+': 0.02    // 2% of users
    }
  },
  verifiedRatio: 0.15 // 15% of users are verified
};

// Enhanced estimation with caching and fallbacks
export const getEstimatedCount = async (filters) => {
  try {
    // Check cache first
    const cacheKey = JSON.stringify(filters);
    const cachedResult = await getFromCache(cacheKey, CACHE_STRATEGIES.FLEXIBLE);
    if (cachedResult) return cachedResult;

    // Try primary estimation method
    const estimate = await getPrimaryEstimate(filters);
    if (estimate > 0) {
      await setCache(cacheKey, estimate, 300);
      return estimate;
    }

    // Fallback to historical data if API fails
    const fallbackEstimate = getFallbackEstimate(filters);
    await setCache(cacheKey, fallbackEstimate, 300);
    return fallbackEstimate;

  } catch (error) {
    console.error("Error in estimation:", error);
    // Final fallback to historical data
    return getFallbackEstimate(filters);
  }
};

// Primary estimation using Twitter API
async function getPrimaryEstimate(filters) {
  try {
    const countQuery = await getTwitterApi().get('/users/search', {
      params: {
        query: buildSearchQuery(filters),
        'user.fields': 'public_metrics',
        max_results: 10
      }
    });

    let baseCount = countQuery.data.meta.total_results || 
                    countQuery.data.meta.result_count * 10;

    const estimate = await calculateAccurateEstimate(baseCount, filters);
    await setCache(`estimate_${JSON.stringify(filters)}`, estimate, 300);
    return estimate;

  } catch (error) {
    console.error("Primary estimation failed:", error);
    throw error;
  }
}

// More accurate estimation calculation
async function calculateAccurateEstimate(baseCount, filters) {
  let estimate = baseCount;
  
  // Apply follower count filter
  if (filters.followerCount?.min || filters.followerCount?.max) {
    const followerReduction = await getFollowerCountReduction(
      filters.followerCount.min,
      filters.followerCount.max
    );
    estimate *= followerReduction;
  }

  // Apply engagement rate filter
  if (filters.engagementRate) {
    const engagementReduction = await getEngagementRateReduction(
      filters.engagementRate,
      await getRecentEngagementStats()
    );
    estimate *= engagementReduction;
  }

  // Apply location filter
  if (filters.location) {
    const locationReduction = await getLocationReduction(filters.location);
    estimate *= locationReduction;
  }

  // Apply verified filter
  if (filters.verifiedOnly) {
    estimate *= await getVerifiedRatio();
  }

  return Math.floor(estimate);
}

// Fallback estimation using historical data
function getFallbackEstimate(filters) {
  let baseEstimate = 1000000; // Base Twitter user pool
  let multiplier = 1;

  // Apply historical follower distribution
  if (filters.followerCount?.min) {
    multiplier *= getHistoricalFollowerMultiplier(filters.followerCount.min);
  }

  // Apply historical engagement distribution
  if (filters.engagementRate) {
    multiplier *= getHistoricalEngagementMultiplier(filters.engagementRate);
  }

  // Apply verified ratio
  if (filters.verifiedOnly) {
    multiplier *= historicalData.verifiedRatio;
  }

  return Math.floor(baseEstimate * multiplier);
}

// Recent stats management
async function getRecentEngagementStats() {
  const cacheKey = 'recent_engagement_stats';
  const cached = await getFromCache(cacheKey, CACHE_STRATEGIES.STALE);
  if (cached) return cached;

  try {
    const stats = await calculateRecentEngagementStats();
    await setCache(cacheKey, stats, 3600); // 1 hour TTL
    return stats;
  } catch (error) {
    console.error("Error getting recent stats:", error);
    return historicalData.engagementRates;
  }
}

// Error handling wrapper
async function withErrorHandling(operation, fallback) {
  try {
    return await operation();
  } catch (error) {
    console.error(`Operation failed: ${error.message}`);
    return fallback;
  }
}

// Historical data helpers
function getHistoricalFollowerMultiplier(minFollowers) {
  if (minFollowers < 5000) return historicalData.followerDistribution['1k-5k'];
  if (minFollowers < 10000) return historicalData.followerDistribution['5k-10k'];
  if (minFollowers < 50000) return historicalData.followerDistribution['10k-50k'];
  if (minFollowers < 100000) return historicalData.followerDistribution['50k-100k'];
  return historicalData.followerDistribution['100k+'];
}

function getHistoricalEngagementMultiplier(minEngagement) {
  if (minEngagement <= 1) return historicalData.engagementRates.distribution['0-1%'];
  if (minEngagement <= 2) return historicalData.engagementRates.distribution['1-2%'];
  if (minEngagement <= 5) return historicalData.engagementRates.distribution['2-5%'];
  if (minEngagement <= 10) return historicalData.engagementRates.distribution['5-10%'];
  return historicalData.engagementRates.distribution['10%+'];
}

// Add analytics endpoints
export const getSearchAnalytics = async (userId) => {
  const userSearches = analyticsData.searches.filter(s => s.userId === userId);
  return {
    totalSearches: userSearches.length,
    averageResults: userSearches.reduce((acc, s) => acc + s.resultCount, 0) / userSearches.length,
    popularFilters: getPopularFilters(userSearches),
    quotaRemaining: await searchLimiter.getRemainingQuota(userId)
  };
};

// Helper functions
function getPopularFilters(searches) {
  const filterCounts = {};
  searches.forEach(search => {
    Object.entries(search.filters).forEach(([key, value]) => {
      filterCounts[`${key}:${value}`] = (filterCounts[`${key}:${value}`] || 0) + 1;
    });
  });
  
  return Object.entries(filterCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([filter, count]) => ({ filter, count }));
}

// Add this function near other helper functions
function buildSearchQuery(filters) {
  let query = '';
  
  // Bio keywords with exact match option
  if (filters.bioKeywords) {
    query += filters.exactMatch 
      ? `bio:"${filters.bioKeywords}" `
      : `bio:${filters.bioKeywords} `;
  }

  // Location filter with radius
  if (filters.location) {
    query += filters.radius 
      ? `location:"${filters.location}" within:${filters.radius}km `
      : `location:${filters.location} `;
  }

  // Account filters
  if (filters.verifiedOnly) query += 'is:verified ';
  if (filters.hasWebsite) query += 'has:url ';
  if (filters.hasProfileImage) query += 'has:profile_image ';
  
  // Language filter
  if (filters.language) query += `lang:${filters.language} `;

  // Account age filter
  if (filters.minAccountAge) {
    const date = new Date();
    date.setDate(date.getDate() - filters.minAccountAge);
    query += `created_before:${date.toISOString().split('T')[0]} `;
  }

  // Exclude certain keywords
  if (filters.excludeKeywords) {
    filters.excludeKeywords.forEach(keyword => {
      query += `-${keyword} `;
    });
  }

  return query.trim();
}

// Test function for free API
export const testTwitterAPI = async () => {
  try {
    console.log('Testing Twitter API...');
    const users = await searchTwitterUsers({
      bioKeywords: "developer"
    });
    console.log(`Found ${users.length} users`);
    return users.length > 0;
  } catch (error) {
    console.error('API Test failed:', error);
    return false;
  }
};

// Add more endpoints
export const twitterEndpoints = {
  searchUsers: '/users/search',
  userTweets: '/tweets/search/recent',
  userFollowers: '/users/:id/followers',
  userFollowing: '/users/:id/following',
  userLikes: '/users/:id/liked_tweets'
};

// Add more API functions as needed

export default searchTwitterUsers;
