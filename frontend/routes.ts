export const publicRoutes = [
  '^/en$',
  '^/lv$',
  '^/en/events$',
  '^/lv/events$',
  '^/en/events/$',
  '^/lv/events/$',
  '^/lv/stories$',
  '^/en/stories$',
  '^/en/events/.*$', // Allow all paths under /en/event/
  '^/lv/events/.*$', // Allow all paths under /lv/event/
];

export const authRoutes = [
  '/lv/auth/login',
  '/lv/auth/register',
  '/en/auth/login',
  '/en/auth/register',
  '/en/auth/error',
  '/lv/auth/error',
];

export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/en/admin/settings';
