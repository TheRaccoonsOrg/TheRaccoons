import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventCard from '@/app/[locale]/(routes)/events/_components/EventCard';
import { EventCardProps } from '@/types';

jest.mock('@/components/GreenButton', () => {
  const GreenButton = (props: { buttonStyles: string; buttonHref: string; buttonText: string }) => (
    <button data-testid="green-button">{props.buttonText}</button>
  );
  GreenButton.displayName = 'GreenButton';
  return GreenButton;
});

jest.mock('@/components/hackathon/skeletons/ImageWithSkeleton', () => {
  const ImageWithSkeleton = (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} data-testid="image-with-skeleton" />
  );
  ImageWithSkeleton.displayName = 'ImageWithSkeleton';
  return ImageWithSkeleton;
});

describe('EventCard', () => {
  const defaultProps: EventCardProps = {
    typeOfEvent: 'hackathon',
    show: true,
    cardTitle: 'Test Event',
    cardImage: 'test-image.jpg',
    buttonLink: '/test-link',
    buttonText: 'Learn More',
  };

  it('renders correctly when show is true', () => {
    render(<EventCard {...defaultProps} />);

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByTestId('green-button')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders the ImageWithSkeleton component when cardImage is provided', () => {
    render(<EventCard {...defaultProps} />);

    expect(screen.getByTestId('image-parent-div')).toBeInTheDocument();
    expect(screen.getByTestId('image-with-skeleton')).toBeInTheDocument();
    expect(screen.getByAltText('Image from event')).toBeInTheDocument();
  });

  it('does not render the ImageWithSkeleton component when cardImage is not provided', () => {
    render(<EventCard {...defaultProps} cardImage={''} />);

    expect(screen.queryByTestId('image-parent-div')).not.toBeInTheDocument();
  });

  it('does not render the component when show is false', () => {
    render(<EventCard {...defaultProps} show={false} />);

    expect(screen.queryByText('Test Event')).not.toBeInTheDocument();
    expect(screen.queryByTestId('green-button')).not.toBeInTheDocument();
  });
});
