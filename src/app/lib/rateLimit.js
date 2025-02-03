// Remove Redis dependency
// import Redis from 'ioredis';
// const redis = new Redis(process.env.REDIS_URL);

const RATE_LIMITS = {
  SEARCH: {
    window: 15 * 60, // 15 minutes
    max: 450 // Twitter API v2 rate limit
  },
  ENGAGEMENT: {
    window: 15 * 60,
    max: 300
  }
};

// In-memory rate limiting
const rateLimitStore = new Map();

export class RateLimiter {
  constructor(type) {
    this.type = type;
  }

  async isAllowed(userId) {
    try {
      const response = await fetch('/api/ratelimit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: this.type, userId })
      });
      
      const data = await response.json();
      return data.isAllowed;
    } catch (error) {
      console.error('Rate limit error:', error);
      return false;
    }
  }

  async getRemainingQuota(userId) {
    try {
      const response = await fetch('/api/ratelimit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: this.type, userId })
      });
      
      const data = await response.json();
      return data.remaining;
    } catch (error) {
      console.error('Rate limit error:', error);
      return 0;
    }
  }

  async waitForQuota(userId) {
    while (!(await this.isAllowed(userId))) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Clean up old entries periodically
  static cleanup() {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
      if (now >= data.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }
}

// Run cleanup every minute
setInterval(RateLimiter.cleanup, 60000); 