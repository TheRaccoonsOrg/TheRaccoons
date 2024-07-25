import ContactSection from '@/components/layout/ContactSection';
import HeaderSection from '@/components/hackathon/header/HeaderSection';
import { CombinedImageProps } from '@/types';

import NewsletterForm from '@/components/layout/NewsletterForm';

import Information from '@/app/[locale]/(routes)/events/hackathons/hackathon2024/_components/Information';
import AboutTheEvent from '@/app/[locale]/(routes)/events/hackathons/hackathon2024/_components/AboutTheEvent';
import FriendsSection from '@/components/layout/FriendsSection';

const headerImage: CombinedImageProps[] = [
  {
    imageStyles: 'hidden  md:block md:w-[700px] lg:w-[971px]',
    src: '/images/raccoons_apply.webp',
    alt: 'Hackathon2023',
    imageWidth: 971,
    imageHeight: 492,
    isPriority: true,
    date: '25.10 - 27.10.2024.',
    place: 'Riga, Latvia',
  },
  {
    imageStyles: 'block w-full md:hidden',
    src: '/images/raccoons_apply-sm.webp',
    alt: 'Hackathon2023',
    imageWidth: 560,
    imageHeight: 436,
    isPriority: true,
    date: '25.10 - 27.10.2024.',
    place: 'Riga, Latvia',
  },
];

const informationData = [
  {
    title: 'What is a hackathon?',
    description:
      'A hackathon is a design sprint-like event where computer programmers and others involved in software development collaborate intensively on software projects.',
  },
  {
    title: 'What is the goal of a hackathon?',
    description:
      'The goal of a hackathon is to create a functioning product by the end of the event. Hackathons often focus on specific themes, such as programming languages, operating systems, applications, or APIs.',
  },
  {
    title: 'What are the benefits of participating in a hackathon?',
    description:
      'Hackathons provide an opportunity to learn new skills, meet new people, and gain experience working on a team. Participants can network with industry professionals, win prizes, and have fun!',
  },
  {
    title: 'Who can join?',
    description:
      'The event is open to high school and university students over the age of 16 from any country, regardless of their skills and background.',
  },
  {
    title: 'Date',
    description: '25th - 27th of October',
  },
  {
    title: 'Place',
    description: 'Riga, Latvia',
  },
  {
    title: 'Language',
    description: 'English',
  },
  {
    title: '',
    description: 'More information will be available soon. Stay tuned!',
  },
];
const Hackathon2024 = () => {
  return (
    <div className="mx-10 flex flex-col items-center">
      <HeaderSection
        props={headerImage}
        submissionsLink="#newsletter-form"
        buttonText="Sign up"
        eventEnded={false}
      />
      <AboutTheEvent />
      <Information data={informationData} />
      <NewsletterForm
        headerTitle={'Application will open soon!'}
        description={'Subscribe to be the first to receive an application form.'}
        placeholderTitle={'Enter your email'}
        additionalInfo={
          '*by submiting this form you are signing up to receive our emails and can unsubscribe at any time.'
        }
        buttonText={'Subscribe'}
        listUUID={'32713d66-097c-4eae-b7c9-92f496a6ea2c'}
        errorMessage={'Please enter a valid email address.'}
        successMessage={'Thank you for subscribing!'}
        apiError={'Something went wrong. Please try again later.'}
      />

      <FriendsSection />

      <ContactSection />
    </div>
  );
};

export default Hackathon2024;
