import { NextResponse } from 'next/server';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

// OAuth 1.0a credentials
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET;

// Create OAuth 1.0a instance
const oauth = new OAuth({
  consumer: {
    key: TWITTER_API_KEY,
    secret: TWITTER_API_SECRET
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto
      .createHmac('sha1', key)
      .update(base_string)
      .digest('base64');
  }
});

export async function POST(request) {
  try {
    const { query } = await request.json();
    
    console.log('Received query:', query);

    // Request data
    const request_data = {
      url: 'https://api.twitter.com/1.1/users/search.json',
      method: 'GET',
      data: { q: query }
    };

    // Token credentials
    const token = {
      key: TWITTER_ACCESS_TOKEN,
      secret: TWITTER_ACCESS_SECRET
    };

    // Get authorization header
    const authorization = oauth.toHeader(oauth.authorize(request_data, token));

    const response = await fetch(`${request_data.url}?q=${encodeURIComponent(query)}`, {
      headers: {
        ...authorization,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Twitter API Response:', data);

    if (!data || data.errors) {
      throw new Error(data.errors?.[0]?.message || 'No results found');
    }

    return NextResponse.json({ data });
    
  } catch (error) {
    console.error('Twitter API Error:', {
      message: error.message,
      status: error.status
    });

    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch from Twitter API',
        status: error.status || 500
      }, 
      { status: error.status || 500 }
    );
  }
} 