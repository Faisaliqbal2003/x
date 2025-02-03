import { NextResponse } from 'next/server';

// Server-side memory cache
const memoryCache = new Map();
const LRU_MAX_SIZE = 1000;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  const strategy = searchParams.get('strategy') || 'FLEXIBLE';

  const cached = memoryCache.get(key);
  if (!cached) {
    return NextResponse.json({ data: null });
  }

  if (isStale(cached) && strategy === 'STRICT') {
    memoryCache.delete(key);
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({ data: cached.value });
}

export async function POST(request) {
  const { key, value, ttl = 300 } = await request.json();

  if (memoryCache.size >= LRU_MAX_SIZE) {
    const oldestKey = memoryCache.keys().next().value;
    memoryCache.delete(oldestKey);
  }

  memoryCache.set(key, {
    value,
    timestamp: Date.now(),
    ttl: ttl * 1000
  });

  return NextResponse.json({ success: true });
}

function isStale(cached) {
  return Date.now() - cached.timestamp > cached.ttl;
} 