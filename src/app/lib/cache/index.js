// Remove all Redis-related code and keep only the in-memory implementation we created earlier

// Simple in-memory cache
const memoryCache = new Map();

// Cache layers
export const CACHE_LAYERS = {
  MEMORY: 'memory'
};

// Cache strategies
export const CACHE_STRATEGIES = {
  STRICT: 'strict',      // Must have fresh data
  STALE: 'stale',       // Can use stale data while revalidating
  FLEXIBLE: 'flexible'   // Use any available data
};

// Client-side cache wrapper
export async function getFromCache(key) {
  return memoryCache.get(key) || null;
}

export async function setCache(key, value) {
  memoryCache.set(key, value);
}

// Export other utility functions if needed
export function isStale(cached) {
  return Date.now() - cached.timestamp > cached.ttl;
}

export async function revalidateCache(key) {
  // For now, just remove stale data
  if (memoryCache.has(key) && isStale(memoryCache.get(key))) {
    memoryCache.delete(key);
  }
}

// Do not export internal implementation details
function setMemoryCache(key, value, ttl) {
  // ... implementation ...
} 