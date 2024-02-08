import Header from '@/components/hackathon/header';
import { CombinedImageProps } from '@/types';
import FinalPresentations from './_components/final-presentations';
import GreenButton from '@/components/green-button';
import Winners from './_components/winners';
import Categories from '@/components/hackathon/categories';
import { challengeCategories } from './_data/categories';
import Partners from '@/components/hackathon/partners';
import { communityPartners, partnerImages } from './_data/partner-images';
import ContactSection from '@/components/layout/contact-info';
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
    imageWidth: 971,
    imageHeight: 492,
    isPriority: true,
    date: '25.11 - 27.11.2022.',
    place: 'Riga, Latvia',
  },
];
const Hackathon2022 = () => {
  return (
    <div className="mx-10 flex flex-col items-center">
      <Header
        props={headerImage}
        submissionsLink="https://the-raccoons-2022.devpost.com/project-gallery"
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
      <Partners props={{ partnerImages, communityPartners }} />
      <ContactSection />
    </div>
  );
};

export default Hackathon2022;
