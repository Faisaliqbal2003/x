import { NextResponse } from 'next/server';

const rateLimitStore = new Map();

const RATE_LIMITS = {
  SEARCH: {
    window: 15 * 60,
    max: 450
  },
  ENGAGEMENT: {
    window: 15 * 60,
    max: 300
  }
};

export async function POST(request) {
  const { type, userId } = await request.json();
  const limit = RATE_LIMITS[type];
  const key = `ratelimit:${type}:${userId}`;
  const now = Date.now();

  let userData = rateLimitStore.get(key) || {
    count: 0,
    resetTime: now + (limit.window * 1000)
  };

  if (now >= userData.resetTime) {
    userData = {
      count: 0,
      resetTime: now + (limit.window * 1000)
    };
  }

  const remaining = Math.max(0, limit.max - userData.count);
  const isAllowed = userData.count < limit.max;

  if (isAllowed) {
    userData.count++;
    rateLimitStore.set(key, userData);
  }

  return NextResponse.json({
    isAllowed,
    remaining,
    resetTime: userData.resetTime
  });
} 