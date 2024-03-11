/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/lv/maps' || '/en/maps' || '/maps',
        destination: 'https://maps.google.com/',
        permanent: false,
      },
      {
        source: '/scholar' || '/en/scholar' || '/lv/scholar',
        destination: 'https://scholar.google.lv/',
        permanent: true,
      },
    ];
  },
};
const nextConfigWithIntl = withNextIntl(nextConfig);

const { withSentryConfig } = require('@sentry/nextjs');
const sentryCongig = {
  silent: true,
  org: 'mihail-danilov-org',
  project: 'javascript-nextjs',
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true, // Ensure if that really needed
};

module.exports = withSentryConfig(nextConfigWithIntl, sentryCongig);
