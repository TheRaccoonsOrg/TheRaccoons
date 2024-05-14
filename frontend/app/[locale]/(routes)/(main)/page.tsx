import HeroHeader from '@/components/layout/HeroHeader';
import FriendsSection from '@/components/layout/FriendsSection';
import ContactSection from '@/components/layout/ContactSection';
import AboutUs from '@/components/layout/AboutUs';
import InfoSection from '@/components/layout/InfoSection';
import { getTranslations } from 'next-intl/server';
import NewsletterForm from '@/components/layout/NewsletterForm';

export default async function Main() {
  const t = await getTranslations('Index');
  const tImage = await getTranslations('Image');
  const tForm = await getTranslations('Newsletter');
  return (
    <div className="flex flex-col items-center">
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
      <NewsletterForm
        headerTitle={tForm('header')}
        description={tForm('description')}
        placeholderTitle={tForm('placeholderTitle')}
        additionalInfo={tForm('additionalInfo')}
        buttonText={tForm('buttonText')}
        listUUID={tForm('listUUID')}
        errorMessage={tForm('errorMessage')}
        successMessage={tForm('successMessage')}
        apiError={tForm('apiError')}
      />
      <ContactSection />
    </div>
  );
}
