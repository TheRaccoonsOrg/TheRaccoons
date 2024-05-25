import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';

const locales = ['en', 'lv'];
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider locale={locale}>
        {children}
        <Toaster />
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
