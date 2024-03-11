import { baseUrl } from '@/config/site';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/_api',
          '/_partials',
          '/pro-gallery-webapp/v1/galleries',
          '/monitoring',
          '*?lightbox=',
        ],
      },
      {
        userAgent: 'Googlebot',
        disallow: ['*?lightbox='],
      },
      {
        userAgent: ['AdsBot-Google-Mobile', 'AdsBot-Google'],
        disallow: ['/_api/*', '/_partials*', '/pro-gallery-webapp/v1/galleries/*'],
      },
      {
        userAgent: 'PetalBot',
        disallow: ['/'],
      },
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 10,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
