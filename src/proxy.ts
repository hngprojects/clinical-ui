import { NextResponse, type NextProxy } from 'next/server';

const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const PROTECTED_PREFIXES = ['/user', '/verification'];
const AUTH_ONLY_PREFIXES = ['/login', '/signup', '/forgot-password', '/reset-password'];
const DOCTOR_HOME = '/user';
const LOGIN_PAGE = '/login';

export const proxy: NextProxy = (request) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = Boolean(token);

  // Redirect unauthenticated users away from protected pages
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL(LOGIN_PAGE, request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth-only pages
  const isAuthOnly = AUTH_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isAuthOnly && isAuthenticated) {
    return NextResponse.redirect(new URL(DOCTOR_HOME, request.url));
  }

  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.set('x-request-id', requestId);

  return response;
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};
