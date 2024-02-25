import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));

type Locale = 'en' | 'lv';
export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'lv'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  lv: 'Latvian',
};
