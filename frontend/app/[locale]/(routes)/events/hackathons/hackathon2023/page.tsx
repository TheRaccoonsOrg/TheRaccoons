import GreenButton from '@/components/GreenButton';
import HowDidItGo from './_components/HowDidItGo';
import Winners from './_components/Winners';
import Categories from '@/components/hackathon/Categories';
import ContactSection from '@/components/layout/ContactSection';
import HeaderSection from '@/components/hackathon/header/HeaderSection';
import { CombinedImageProps } from '@/types';
import { challengeCategories } from './_data/categories';
import { communityPartners, partnerImages } from './_data/partner-images';
import Partners from '@/components/hackathon/Partners';
import SeeYouNextYear from '@/components/hackathon/SeeYouNextYear';

const headerImage: CombinedImageProps[] = [
  {
    imageStyles: 'hidden  md:block md:w-[700px] lg:w-[971px]',
    src: '/images/raccoons_apply.webp',
    alt: 'Hackathon2023',
    imageWidth: 971,
    imageHeight: 492,
    isPriority: true,
    date: '20.10 - 22.10.2023.',
    place: 'Riga, Latvia',
  },
  {
    imageStyles: 'block w-full md:hidden',
    src: '/images/raccoons_apply-sm.webp',
    alt: 'Hackathon2023',
    imageWidth: 560,
    imageHeight: 436,
    isPriority: true,
    date: '20.10 - 22.10.2023.',
    place: 'Riga, Latvia',
  },
];
const Hackathon2022 = () => {
  return (
    <div className="mx-10 flex flex-col items-center">
      <HeaderSection
        props={headerImage}
        submissionsLink="https://raccoons-2023.devpost.com/project-gallery"
        buttonText="All submissions"
        eventEnded={true}
      />
      <GreenButton
        buttonStyles="mt-10"
        buttonText="Watch Awards Ceremony"
        buttonHref="https://www.youtube.com/live/-RU_4tzY0Bw"
      />
      <HowDidItGo />
      <Winners />
      <Categories props={challengeCategories} />
      <GreenButton
        buttonStyles="mt-10 min-w-[200px]"
        buttonHref="https://raccoons-2023.devpost.com/project-gallery"
        buttonText="All submissions"
      />
      <SeeYouNextYear
        imageSrc="/images/hackathon2023/hackathon2023.webp"
        buttonHref="https://photos.app.goo.gl/4LfM9CetZzthEywJ6"
      />
      <Partners props={{ partnerImages, communityPartners }} />
      <ContactSection />
    </div>
  );
};

export default Hackathon2022;
