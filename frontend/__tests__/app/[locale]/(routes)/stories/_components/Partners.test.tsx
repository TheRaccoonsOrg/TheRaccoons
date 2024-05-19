import { render, screen } from '@testing-library/react';
import Partners from '@/app/[locale]/(routes)/stories/_components/Partners';
import { friendsImages } from '@/app/[locale]/(routes)/stories/_data/friends-images';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      main: '/images/main.webp',
      organize: '/images/organize.webp',
      support: '/images/support.webp',
      friends: '/images/friends.webp',
    };
    return translations[key];
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('Partners', () => {
  it('renders the main image correctly', () => {
    render(<Partners />);
    const mainImage = screen.getByAltText('partners');
    expect(mainImage).toHaveAttribute('src', '/images/main.webp');
  });

  it('renders the organize image correctly', () => {
    render(<Partners />);
    const organizeImage = screen.getByAltText('Organized by');
    expect(organizeImage).toHaveAttribute('src', '/images/organize.webp');
  });

  it('renders the support image correctly', () => {
    render(<Partners />);
    const supportImage = screen.getByAltText('Supported by');
    expect(supportImage).toHaveAttribute('src', '/images/support.webp');
  });

  it('renders the friends image correctly', () => {
    render(<Partners />);
    const friendsImage = screen.getByAltText('Friends');
    expect(friendsImage).toHaveAttribute('src', '/images/friends.webp');
  });

  it('renders all friend images with correct links', () => {
    render(<Partners />);
    friendsImages.forEach((item) => {
      const link = screen.getByRole('link', { name: item.alt });
      expect(link).toHaveAttribute('href', item.linkHref);
      const img = screen.getByAltText(item.alt);
      expect(img).toHaveAttribute('src', item.imagePath);
    });
  });
});
