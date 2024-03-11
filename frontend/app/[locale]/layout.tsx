import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'lv'];
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  return <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>;
}
