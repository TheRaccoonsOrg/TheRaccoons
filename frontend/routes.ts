export const publicRoutes = [
  '^/en$',
  '^/lv$',
  '^/en/events$',
  '^/lv/events$',
  '^/en/events/$',
  '^/lv/events/$',
  '^/lv/stories$',
  '^/en/stories$',
  '^/en/events/.*$',
  '^/lv/events/.*$',
  '^/en/auth/new-verification.*$',
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
