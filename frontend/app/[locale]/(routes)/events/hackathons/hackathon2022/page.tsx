import HeaderSection from '@/components/hackathon/header/HeaderSection';
import { CombinedImageProps } from '@/types';
import FinalPresentations from './_components/FinalPresentations';
import GreenButton from '@/components/GreenButton';
import Winners from './_components/Winners';
import Categories from '@/components/hackathon/Categories';
import { challengeCategories } from './_data/categories';
import Partners from '@/components/hackathon/Partners';
import { communityPartners, partnerImages } from './_data/partnerImages';
import ContactSection from '@/components/layout/ContactSection';
import SeeYouNextYear from '@/components/hackathon/SeeYouNextYear';
const headerImage: CombinedImageProps[] = [
  {
    imageStyles: 'hidden md:block md:w-[700px] lg:w-[971px]',
    src: '/images/raccoons_apply.webp',
    alt: 'Hackathon2022',
    imageWidth: 971,
    imageHeight: 492,
    isPriority: true,
    date: '25.11 - 27.11.2022.',
    place: 'Riga, Latvia',
  },
  {
    imageStyles: 'block w-full md:hidden',
    src: '/images/raccoons_apply-sm.webp',
    alt: 'Hackathon2022',
    imageWidth: 560,
    imageHeight: 436,
    isPriority: true,
    date: '25.11 - 27.11.2022.',
    place: 'Riga, Latvia',
  },
];
const Hackathon2022 = () => {
  return (
    <div className="mx-10 flex flex-col items-center">
      <HeaderSection
        props={headerImage}
        submissionsLink="https://the-raccoons-2022.devpost.com/project-gallery"
        buttonText="All submissions"
        eventEnded={true}
      />
      <FinalPresentations />
      <GreenButton
        buttonStyles="mt-10"
        buttonText="Watch Awards Ceremony"
        buttonHref="https://youtu.be/3Gg2-I_43Qg"
      />
      <Winners />
      <Categories props={challengeCategories} />
      <GreenButton
        buttonStyles="mt-10 min-w-[200px]"
        buttonText="All submissions"
        buttonHref="https://the-raccoons-2022.devpost.com/project-gallery"
      />
      <SeeYouNextYear
        imageSrc="/images/hackathon2022/hackathon2022.webp"
        buttonHref="https://bit.ly/raccoons2022Photos"
      />
      <Partners props={{ partnerImages, communityPartners }} />
      <ContactSection />
    </div>
  );
};

export default Hackathon2022;
