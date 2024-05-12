import React from 'react';
import { render, screen } from '@/__tests__/test-util';
import HeaderSection from '@/components/hackathon/header/HeaderSection';
import { CombinedImageProps } from '@/types';

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
describe('Hackathon header', () => {
  it('should render the header section', async () => {
    render(<HeaderSection props={headerImage} submissionsLink="https://example.com" />);
    const images = await screen.findAllByAltText('Hackathon2022');
    images.forEach((header) => {
      expect(header).toBeInTheDocument();
    });
    const button = await screen.findByRole('link', {
      name: 'All submissions',
    });
    expect(button).toBeInTheDocument();

    const eventStatus = await screen.findByRole('heading', {
      level: 2,
      name: 'The event has ended!',
    });
    expect(eventStatus).toBeInTheDocument();
    const eventMessage = await screen.findByRole('heading', {
      level: 3,
      name: 'Thank you to everyone who participated and to all the partners!',
    });
    expect(eventMessage).toBeInTheDocument();
    const eventDetails = await screen.findByRole('heading', {
      level: 3,
      name: 'You can check out the winners and the hackathon details below.',
    });
    expect(eventDetails).toBeInTheDocument();
  });
});
