/* eslint-disable @next/next/no-img-element */
import { render, screen, fireEvent } from '@/__tests__/utils/test-wrapper';
import ImageWithSkeleton from '@/components/hackathon/skeletons/ImageWithSkeleton';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} data-testid="next-image" />
  ),
}));

describe('ImageWithSkeleton', () => {
  const props = {
    green: true,
    src: '/images/test.jpg',
    alt: 'Test Image',
    width: 500,
    height: 500,
    imageStyles: 'custom-styles',
  };

  it('renders SkeletonLoader while image is loading', () => {
    render(<ImageWithSkeleton {...props} />);
    const skeletonLoader = screen.getByTestId('skeleton-loader');
    expect(skeletonLoader).toBeInTheDocument();
    expect(skeletonLoader).toHaveClass('bg-hotgreen');

    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('opacity-0');
  });

  it('hides SkeletonLoader after image has loaded', () => {
    render(<ImageWithSkeleton {...props} />);
    const image = screen.getByTestId('next-image');

    // Simulate image load
    fireEvent.load(image);

    // SkeletonLoader should be removed
    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument();
    expect(image).toHaveClass('opacity-100');
  });

  it('applies custom styles to the image', () => {
    render(<ImageWithSkeleton {...props} />);
    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('custom-styles');
  });
});
