import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/admin', '/teacher'];

// Game API routes that require authentication
const gameApiRoutes = [
  '/api/game',
  '/api/progress',
  '/api/user/me',
  '/api/analytics',
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow next-auth routes + public assets
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Allow public leaderboard access (GET only)
  if (
    pathname.startsWith('/api/leaderboard') &&
    req.method === 'GET'
  ) {
    return NextResponse.next();
  }

  // JWT validation for game API endpoints
  if (gameApiRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }

    // Add user info to request headers for API routes
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', token.sub || '');
    requestHeaders.set('x-user-email', token.email || '');
    requestHeaders.set('x-user-role', (token.role as string) || '');

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 1️⃣ USER NOT LOGGED IN → Redirect to login
  if (!token && protectedRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2️⃣ BLOCK LOGGED-IN USERS FROM GOING TO /login
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 3️⃣ STRICT ROLE PROTECTION
  if (pathname.startsWith('/dashboard/admin') && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (pathname.startsWith('/dashboard/teacher') && token?.role !== 'TEACHER') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (pathname.startsWith('/dashboard/student') && token?.role !== 'STUDENT') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // 4️⃣ REDIRECT /dashboard BASED ON ROLE
  if (pathname === '/dashboard') {
    if (token?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/admin', req.url));
    }
    if (token?.role === 'TEACHER') {
      return NextResponse.redirect(new URL('/dashboard/teacher', req.url));
    }
    if (token?.role === 'STUDENT') {
      return NextResponse.redirect(new URL('/dashboard/student', req.url));
    }
  }

  return NextResponse.next();
}

// Middleware routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/teacher/:path*',
    '/login',
    '/api/game/:path*',
    '/api/progress/:path*',
    '/api/user/:path*',
    '/api/analytics/:path*',
    '/api/leaderboard/:path*',
  ],
};
