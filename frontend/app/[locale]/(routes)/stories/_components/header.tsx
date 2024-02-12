import { useTranslations } from 'next-intl';
import HeroImage from './hero';

const Header = () => {
  const t = useTranslations('Stories.header');

  return (
    <div className="flex flex-col-reverse items-center lg:flex-row gap-y-4 md:gap-x-10 mx-10">
      <div className="flex flex-col max-w-[700px] lg:max-w-[500px] gap-y-4 ">
        <p>{t('first')}</p>
        <p>{t('second')}</p>
        <p>{t('third')}</p>
      </div>
      <HeroImage pathToImage={t('image')} />
    </div>
  );
};

export default Header;
