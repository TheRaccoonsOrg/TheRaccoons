import { render, screen } from '@/__tests__/test-util';
import HeroHeader from '@/components/layout/HeroHeader';
import { HeroHeaderProps } from '@/types';

const heroHeaderProps: HeroHeaderProps = {
  firstDesc: 'First description',
  secondDesc: 'Second description',
  imageSrc: '/images/main.webp',
  imageAlt: 'Raccoons main picture',
};

describe('Hero header', () => {
  it('should render the hero header', async () => {
    render(<HeroHeader {...heroHeaderProps} />);
    const firstDesc = await screen.findByText('First description');
    expect(firstDesc).toBeInTheDocument();
    const secondDesc = await screen.findByText('Second description');
    expect(secondDesc).toBeInTheDocument();
    const skeletonLoader = await screen.findByTestId('skeleton-loader');
    expect(skeletonLoader).toBeInTheDocument();
    const image = await screen.findByAltText('Raccoons main picture');
    expect(image).toBeInTheDocument();
  });

  it('should have correct image src and alt attributes', () => {
    render(<HeroHeader {...heroHeaderProps} />);

    const image = screen.getByAltText('Raccoons main picture');
    expect(image).toHaveAttribute('src', '/_next/image?url=%2Fimages%2Fmain.webp&w=1920&q=75');
    expect(image).toHaveAttribute('alt', 'Raccoons main picture');
  });
});
