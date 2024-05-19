import { render, screen } from '@testing-library/react';
import Header from '@/app/[locale]/(routes)/stories/_components/Header';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/components/hackathon/skeletons/ImageWithSkeleton', () => {
  const ImageWithSkeleton = (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} data-testid="image-with-skeleton" />
  );
  ImageWithSkeleton.displayName = 'ImageWithSkeleton';
  return ImageWithSkeleton;
});

describe('Header', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        first: 'First paragraph',
        second: 'Second paragraph',
        third: 'Third paragraph',
        image: '/path/to/image.jpg',
      };
      return translations[key];
    });
  });

  it('renders all paragraphs and HeroImage correctly', () => {
    render(<Header />);

    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    expect(screen.getByText('Third paragraph')).toBeInTheDocument();

    const heroImage = screen.getByRole('img');
    expect(heroImage).toHaveAttribute('src', '/path/to/image.jpg');
  });
});
