import { render, screen } from '@testing-library/react';
import HeroImage from '@/app/[locale]/(routes)/stories/_components/HeroImage';

jest.mock('@/components/hackathon/skeletons/ImageWithSkeleton', () => {
  const ImageWithSkeleton = (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} data-testid="image-with-skeleton" />
  );
  ImageWithSkeleton.displayName = 'ImageWithSkeleton';
  return ImageWithSkeleton;
});

describe('HeroImage', () => {
  const pathToImage = '/path/to/image.jpg';

  it('renders correctly with the provided pathToImage', () => {
    render(<HeroImage pathToImage={pathToImage} />);

    const image = screen.getByTestId('image-with-skeleton');
    expect(image).toHaveAttribute('src', pathToImage);
    expect(image).toHaveAttribute('alt', 'Stories Header');
  });
});
