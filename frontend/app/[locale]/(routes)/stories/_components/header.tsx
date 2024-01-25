import { useTranslations } from 'next-intl';
import Image from 'next/image';
const Header = () => {
  const t = useTranslations('Stories.header');

  return (
    <div className="flex flex-col-reverse items-center md:flex-row gap-y-4 md:gap-x-6  ">
      <div className="flex flex-col max-w-[500px] gap-y-4 mx-10 ">
        <p>{t('first')}</p>
        <p>{t('second')}</p>
        <p>{t('third')}</p>
      </div>
      <div className="pr-5 md:pr-0">
        <Image
          className="relative h-5 w-auto top-[235px] md:top-[267px] left-[200px] md:left-[250px] "
          alt="Stories Header Image"
          width={150}
          height={50}
          src={'/images/stories/loading-dots.gif'}
        />
        <Image
          className="w-[350px] md:w-[400px]"
          alt="Stories Header"
          width={994}
          height={864}
          src={t('image')}
        />
      </div>
    </div>
  );
};

export default Header;
