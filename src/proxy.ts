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

/**
 * Validates the session by calling /api/auth/me with the current cookies.
 * Returns true only when the server responds with 2xx.
 *
 * We forward the full Cookie header so HttpOnly tokens are included without
 * ever reading them on the client side.
 */
async function validateSession(request: Request): Promise<boolean> {
  try {
    const url = new URL('/api/auth/me', request.url);
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { cookie: request.headers.get('cookie') ?? '' },
      // Short timeout so a slow API doesn't stall the proxy
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    // Network error, timeout, or misconfigured API — treat as unauthenticated
    return false;
  }
}

export const proxy: NextProxy = async (request) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Fast-path: no cookie at all → definitely unauthenticated
  const hasCookie = Boolean(token);

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthOnly = AUTH_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected || isAuthOnly) {
    // Validate session server-side when a cookie is present
    const isAuthenticated = hasCookie ? await validateSession(request) : false;

    if (isProtected && !isAuthenticated) {
      const loginUrl = new URL(LOGIN_PAGE, request.url);
      loginUrl.searchParams.set('from', pathname);
      const redirect = NextResponse.redirect(loginUrl);

      // Clear a stale/invalid token cookie so the browser doesn't loop
      if (hasCookie) {
        redirect.cookies.delete('token');
      }

      return redirect;
    }

    if (isAuthOnly && isAuthenticated) {
      return NextResponse.redirect(new URL(DOCTOR_HOME, request.url));
    }
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
