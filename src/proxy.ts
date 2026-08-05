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
 * Matches a pathname against a prefix exactly or when followed immediately by
 * a slash — preventing false positives like /user-settings matching /user.
 */
function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(prefix + '/');
}

/** Stamps x-request-id and all SECURITY_HEADERS onto any response. */
function applyCommonHeaders(response: NextResponse, requestId: string): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.set('x-request-id', requestId);
  return response;
}

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

  // Hoist requestId so every response branch — including redirects — carries it
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();

  // Fast-path: no cookie at all → definitely unauthenticated
  const hasCookie = Boolean(token);

  const isProtected = PROTECTED_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix));
  const isAuthOnly = AUTH_ONLY_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix));

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

      return applyCommonHeaders(redirect, requestId);
    }

    if (isAuthOnly && isAuthenticated) {
      return applyCommonHeaders(
        NextResponse.redirect(new URL(DOCTOR_HOME, request.url)),
        requestId,
      );
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  return applyCommonHeaders(response, requestId);
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};
