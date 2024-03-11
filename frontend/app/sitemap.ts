import { eventsList } from '@/config/available-pages';
import { baseUrl } from '@/config/site';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'lv'];

  const staticPageNames = ['', 'stories', 'events'];
  const staticRoutes = staticPageNames.flatMap((pageName) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${pageName}`.replace(/\/+$/, ''),
      lastModified: '2024-03-11',
      changeFrequency: pageName === '' ? 'yearly' : 'monthly',
      priority: pageName === '' ? 1 : 0.9,
    })),
  );

  const dynamicRoutes = eventsList
    .filter((event) => event.show)
    .flatMap((event) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}${event.buttonLink}`,
        lastModified: event.lastModified,
        changeFrequency: event.typeOfEvent === 'hackathon' ? 'yearly' : 'monthly',
        priority: event.typeOfEvent === 'hackathon' ? 0.8 : 0.7,
      })),
    );

  return [...staticRoutes, ...dynamicRoutes] as MetadataRoute.Sitemap;
}
