import GreenButton from '@/components/green-button';
import HowDidItGo from './_components/how-did-it-go';
import Winners from './_components/winners';
import Categories from '@/components/hackathon/categories';
import SeeYouNextYear from './_components/see-you-next-year';
import Partners from './_components/partners';
import ContactSection from '@/components/layout/contact-info';
import Header from '@/components/hackathon/header';
import { CombinedImageProps } from '@/types';

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
    imageWidth: 971,
    imageHeight: 492,
    isPriority: true,
    date: '20.10 - 22.10.2023.',
    place: 'Riga, Latvia',
  },
];
const Hackathon2022 = () => {
  return (
    <div className="mx-10 flex flex-col items-center ">
      <Header props={headerImage} />
      <GreenButton
        buttonStyles="mt-10"
        buttonText="Watch Awards Ceremony"
        buttonHref="https://www.youtube.com/live/-RU_4tzY0Bw"
      />
      <HowDidItGo />
      <Winners />
      <Categories />
      <GreenButton
        buttonStyles="mt-10 min-w-[200px]"
        buttonHref="https://raccoons-2023.devpost.com/project-gallery"
        buttonText="All submissions"
      />
      <SeeYouNextYear />
      <Partners />
      <ContactSection />
    </div>
  );
};

export default Hackathon2022;
