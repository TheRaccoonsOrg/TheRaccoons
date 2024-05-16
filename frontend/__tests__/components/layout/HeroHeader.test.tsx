import { getNextImagePath } from '@/__tests__/utils/nextImagePath';
import { render, screen } from '@/__tests__/utils/test-wrapper';
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
    const imageParentDiv = await screen.findByTestId('image-parent-div');
    expect(imageParentDiv).toHaveClass('w-[345px] h-[350px] lg:w-[450px] lg:h-[450px]');
    const image = await screen.findByAltText('Raccoons main picture');
    expect(image).toBeInTheDocument();
  });

  it('should have correct image src and alt attributes', async () => {
    render(<HeroHeader {...heroHeaderProps} />);
    const imageParentDiv = await screen.findByTestId('image-parent-div');
    expect(imageParentDiv).toHaveClass('w-[345px] h-[350px] lg:w-[450px] lg:h-[450px]');
    const image = screen.getByAltText('Raccoons main picture');
    expect(image).toHaveAttribute('src', getNextImagePath('/images/main.webp', 1920));
    expect(image).toHaveAttribute('alt', 'Raccoons main picture');
  });
});
