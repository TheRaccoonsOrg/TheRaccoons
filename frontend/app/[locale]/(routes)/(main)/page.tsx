import HeroHeader from '@/components/layout/hero';
import FriendsSection from '@/components/layout/friends';
import ContactSection from '@/components/layout/contact-info';
import AboutUs from '@/components/layout/about-us';
import InfoSection from '@/components/layout/info-section';
import { getTranslations } from 'next-intl/server';

export default async function Main() {
  const t = await getTranslations('Index');
  const tImage = await getTranslations('Image');

  return (
    <div>
      <HeroHeader
        firstDesc={t('firstDesc')}
        secondDesc={t('secondDesc')}
        imageSrc={'/images/main.webp'}
        imageAlt="Raccoons main picture"
      />
      <AboutUs
        text={t('aboutUs')}
        imagePath={tImage('aboutUs')}
        alt={'About us'}
        width={500}
        height={500}
      />
      <InfoSection />
      <FriendsSection />
      <ContactSection />
    </div>
  );
}
