import createMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales } from './i18n';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes';
import { NextResponse } from 'next/server';

export const intlMiddleware = createMiddleware({
  locales: locales,
  localePrefix: localePrefix,
  defaultLocale: defaultLocale,
});

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAutRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((pattern) => new RegExp(pattern).test(nextUrl.pathname));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAutRoute) {
    return intlMiddleware(req);
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return intlMiddleware(req);
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/en/auth/login', nextUrl));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|monitoring|.*\\..*).*)'],
};
