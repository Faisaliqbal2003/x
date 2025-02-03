import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAuthenticated = true; // Changed to true for testing
  
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
}; 