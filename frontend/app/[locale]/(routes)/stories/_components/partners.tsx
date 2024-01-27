import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { friendsImages } from '../_data/friends-images';
import Link from 'next/link';
const Partners = () => {
  const t = useTranslations('Stories.partners');
  return (
    <div className="flex flex-col items-center jutify-center my-10">
      <Image
        src={t('main')}
        width={1270}
        height={340}
        alt="partners"
        className=" max-w-sm md:max-w-[700px] "
      />
      <Image
        className="mt-5"
        src="/images/hackathon2023/dots.webp"
        width={20}
        height={91}
        alt="Dots"
      />
      <div className="flex flex-col md:flex-row gap-y-10 gap-x-10 mt-10 items-center">
        <Image
          src={t('organize')}
          width={612}
          height={168}
          alt="Organized by"
          className="h-[100px] w-auto"
        />
        <div className="flex flex-col md:flex-row md:pr-10 items-center gap-10">
          <Image
            src="/images/stories/logo/RTU.webp"
            width={296}
            height={256}
            alt="RTU LOGO"
            className="w-auto h-[100px]"
          />
          <Image
            src="/images/stories/logo/Helve.webp"
            width={320}
            height={106}
            alt="Helve LOGO"
            className="w-auto h-[50px]"
          />
        </div>
      </div>
      <Image
        className="mt-10"
        src="/images/hackathon2023/dots.webp"
        width={20}
        height={91}
        alt="Dots"
      />
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 mt-10">
        <Image
          src="/images/stories/logo/tet.webp"
          width={286}
          height={134}
          alt="RTU LOGO"
          className="w-auto h-[50px]"
        />
        <Image
          src={t('support')}
          width={610}
          height={168}
          alt="Helve LOGO"
          className="w-auto h-[100px]"
        />
      </div>
      <Image
        className="mt-10"
        src="/images/hackathon2023/dots.webp"
        width={20}
        height={91}
        alt="Dots"
      />
      <Image
        className="mt-10 w-auto h-[100px]"
        src={t('friends')}
        width={398}
        height={206}
        alt="Friends"
      />
      {/* <div className="grid max-w-xs md:max-w-[700px] items-center md:grid-cols-5 gap-5 justify-center"> */}
      <div className="flex flex-wrap max-w-xs md:max-w-[700px] justify-center items-center gap-5">
        {friendsImages.map((item, index) => (
          <Link
            key={index}
            href={item.linkHref}
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center justify-center">
            <Image
              className="mt-6 w-auto h-[55px]"
              src={item.imagePath}
              width={item.width}
              height={item.height}
              alt={item.alt}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Partners;
