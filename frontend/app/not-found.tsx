import GreenButton from '@/components/green-button';
import { NextIntlClientProvider } from 'next-intl';

import { getTranslations } from 'next-intl/server';
export const dynamic = 'force-dynamic';
const NotFound = async ({ locale }: { locale: string }) => {
  const t = await getTranslations('errorMessages');
  return (
    <NextIntlClientProvider locale={locale}>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="font-extrabold text-6xl md:text-9xl text-white mb-10">
          <span className="sr-only">{t('error')}</span>404
        </h2>
        <h2 className="mb-10 text-2xl">{t('notFound')}</h2>
        <p className="mb-10 text-2xl text-center max-w-sm md:max-w-lg">{t('notFoundDesc')}</p>
        <GreenButton buttonHref="/" buttonText={t('backToHome')} buttonStyles="w-[220px] h-12" />
      </div>
    </NextIntlClientProvider>
  );
};

export default NotFound;
