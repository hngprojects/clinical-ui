import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PREFIXES = ['/user', '/verification'];
const AUTH_ONLY_PREFIXES = ['/login', '/signup', '/forgot-password', '/reset-password'];
const DOCTOR_HOME = '/user';
const LOGIN_PAGE = '/login';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isAuthenticated = Boolean(token);

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL(LOGIN_PAGE, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthOnly = AUTH_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isAuthOnly && isAuthenticated) {
    return NextResponse.redirect(new URL(DOCTOR_HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets|api).*)'],
};
