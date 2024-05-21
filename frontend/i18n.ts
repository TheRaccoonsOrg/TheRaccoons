import { getRequestConfig } from 'next-intl/server';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));

export type Locale = 'en' | 'lv';
export const defaultLocale: Locale = 'en';
export const localePrefix = 'always';

export const locales: Locale[] = ['en', 'lv'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  lv: 'Latviešu',
};
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
});
