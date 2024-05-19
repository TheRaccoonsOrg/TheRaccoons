import TestInstruction from '@/app/[locale]/(routes)/stories/_components/TestInstruction';
import { render, screen } from '@testing-library/react';

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

describe('TestInstruction', () => {
  it('renders the first instruction text correctly', () => {
    render(<TestInstruction />);
    const firstText = screen.getByText('instruction.text.first');
    expect(firstText).toBeInTheDocument();
  });

  it('renders the second instruction text correctly', () => {
    render(<TestInstruction />);
    const secondText = screen.getByText('instruction.text.second');
    expect(secondText).toBeInTheDocument();
  });

  it('renders the third instruction text correctly', () => {
    render(<TestInstruction />);
    const thirdText = screen.getByText('instruction.text.third');
    expect(thirdText).toBeInTheDocument();
  });

  it('renders the fourth instruction text correctly', () => {
    render(<TestInstruction />);
    const fourthText = screen.getByText('instruction.text.fourth');
    expect(fourthText).toBeInTheDocument();
  });

  it('renders the image with correct attributes', () => {
    render(<TestInstruction />);
    const image = screen.getByAltText('Test description');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'instruction.image');
    expect(image).toHaveAttribute('width', '946');
    expect(image).toHaveAttribute('height', '618');
  });
});
