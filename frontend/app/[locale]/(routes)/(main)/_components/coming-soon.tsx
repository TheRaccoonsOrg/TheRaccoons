import { getTranslations } from 'next-intl/server';

import GreenButton from '@/components/GreenButton';

const ComingSoon = async () => {
  const t = await getTranslations('ComingSoon');
  return (
    <div className="flex flex-col justify-center items-center py-5 space-y-2">
      <h1 className="font-raccoons text-5xl md:text-6xl text-hotgreen">{t('header')}</h1>
      <h1 className="font-raccoons text-2xl md:text-4xl text-hotgreen">{t('eventTitle')}</h1>
      <GreenButton
        buttonHref="/events/hackathons/hackathon2024"
        buttonText={t('buttonText')}
        buttonStyles="px-10"
      />
    </div>
  );
};

export default ComingSoon;
