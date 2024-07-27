/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.ts');
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/en/admin/dashboard',
        permanent: false,
      },
      {
        source: '/en/admin',
        destination: '/en/admin/dashboard',
        permanent: false,
      },
      {
        source: '/lv/admin',
        destination: '/lv/admin/dashboard',
        permanent: false,
      },
      {
        source: '/en/sitemap.xml',
        destination: '/sitemap.xml',
        permanent: false,
      },
      {
        source: '/lv/sitemap.xml',
        destination: '/sitemap.xml',
        permanent: false,
      },
      {
        source: '/en/robots.txt',
        destination: '/robots.txt',
        permanent: false,
      },
      {
        source: '/lv/robots.txt',
        destination: '/robots.txt',
        permanent: false,
      },
      {
        source: '/maps',
        destination: 'https://maps.google.com/',
        permanent: false,
      },
      {
        source: '/en/maps',
        destination: 'https://maps.google.com/',
        permanent: false,
      },
      {
        source: '/lv/maps',
        destination: 'https://maps.google.com/',
        permanent: false,
      },
      {
        source: '/scholar',
        destination: 'https://scholar.google.lv/',
        permanent: false,
      },
      {
        source: '/en/scholar',
        destination: 'https://scholar.google.lv/',
        permanent: false,
      },
      {
        source: '/lv/scholar',
        destination: 'https://scholar.google.lv/',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/en/auth/login',
        permanent: false,
      },
    ];
  },
};
const nextConfigWithIntl = withNextIntl(nextConfig);

const { withSentryConfig } = require('@sentry/nextjs');
const sentryCongig = {
  silent: true,
  org: 'theraccoonsorg',
  project: 'theraccoons-org',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
};

module.exports = withSentryConfig(nextConfigWithIntl, sentryCongig);
