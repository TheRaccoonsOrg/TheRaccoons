import { render, screen } from '@testing-library/react';
import TestDescription from '@/app/[locale]/(routes)/stories/_components/TestDescription';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
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
    width: number;
    height: number;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} width={width} height={height} />,
}));

describe('TestDescription', () => {
  it('renders the first description text correctly', () => {
    render(<TestDescription />);
    const firstText = screen.getByText('description.text.first');
    expect(firstText).toBeInTheDocument();
  });

  it('renders the second description text correctly', () => {
    render(<TestDescription />);
    const secondText = screen.getByText('description.text.second');
    expect(secondText).toBeInTheDocument();
  });

  it('renders the third description text correctly', () => {
    render(<TestDescription />);
    const thirdText = screen.getByText('description.text.third');
    expect(thirdText).toBeInTheDocument();
  });

  it('renders the image with correct attributes', () => {
    render(<TestDescription />);
    const image = screen.getByAltText('Test description');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'description.image');
    expect(image).toHaveAttribute('width', '946');
    expect(image).toHaveAttribute('height', '618');
  });
});
