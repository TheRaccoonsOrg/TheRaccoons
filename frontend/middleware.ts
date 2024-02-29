import createMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales } from './i18n';

export default createMiddleware({
  locales: locales,
  localePrefix: localePrefix,
  defaultLocale: defaultLocale,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
