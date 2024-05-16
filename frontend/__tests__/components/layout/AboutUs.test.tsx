import { render, screen } from '@/__tests__/utils/test-wrapper';

import '@testing-library/jest-dom';
import AboutUs from '@/components/layout/AboutUs';
import { getNextImagePath } from '@/__tests__/utils/nextImagePath';

const aboutUsText =
  'We are a student organization with a keen interest in the latest technology and science. We believe that technology should be known to everyone, regardless of industry, so we have created different types of activities that allow you to get to know technology and science better, try your hand at programming.';
const setup = async () => {
  render(
    <AboutUs
      text={aboutUsText}
      imagePath="/images/aboutUs.webp"
      alt={'About us'}
      width={500}
      height={500}
    />,
  );
};

describe('AboutUs', () => {
  it('renders SkeletonLoader initially', () => {
    setup();
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  });

  it('renders Image with correct props', () => {
    setup();
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    const imageParentDiv = screen.getByTestId('image-parent-div');
    expect(imageParentDiv).toHaveClass('w-[345px] h-[161px] md:w-[400px] md:h-[184px]');
    expect(image).toHaveAttribute('src', getNextImagePath('/images/aboutUs.webp', 2048));
    expect(image).toHaveAttribute('alt', 'Image');
    expect(image).toHaveAttribute('width', '1000');
    expect(image).toHaveAttribute('height', '1000');
  });
});
