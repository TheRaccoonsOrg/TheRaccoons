/* eslint-disable @next/next/no-img-element */
import { render, screen } from '@/__tests__/utils/test-wrapper';
import SeeYouNextYear from '@/components/hackathon/SeeYouNextYear';

jest.mock('@/components/GreenButton', () => ({
  __esModule: true,
  default: ({
    buttonStyles,
    buttonHref,
    buttonText,
  }: {
    buttonStyles: string;
    buttonHref: string;
    buttonText: string;
  }) => (
    <a href={buttonHref} className={buttonStyles} data-testid="green-button">
      {buttonText}
    </a>
  ),
}));

jest.mock('@/components/hackathon/skeletons/ImageWithSkeleton', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: string;
    height: string;
  }) => <img src={src} alt={alt} width={width} height={height} data-testid="image-with-skeleton" />,
}));

describe('SeeYouNextYear', () => {
  const props = {
    buttonHref: '/photos',
    imageSrc: '/images/event-photo.jpg',
  };

  test('renders the heading correctly', () => {
    render(<SeeYouNextYear {...props} />);
    const heading = screen.getByText('See You next year!');
    expect(heading).toBeInTheDocument();
  });

  test('renders the image correctly', () => {
    render(<SeeYouNextYear {...props} />);
    const image = screen.getByTestId('image-with-skeleton');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.imageSrc);
    expect(image).toHaveAttribute('alt', 'Photo from the event');
    expect(image).toHaveAttribute('width', '632');
    expect(image).toHaveAttribute('height', '421');
  });

  test('renders the paragraph correctly', () => {
    render(<SeeYouNextYear {...props} />);
    const paragraph = screen.getByText('YOU CAN FIND MORE PICTURES FROM THE EVENT BELOW');
    expect(paragraph).toBeInTheDocument();
  });

  test('renders the GreenButton correctly', () => {
    render(<SeeYouNextYear {...props} />);
    const button = screen.getByTestId('green-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', props.buttonHref);
    expect(button).toHaveTextContent('Photos from event');
  });
});
