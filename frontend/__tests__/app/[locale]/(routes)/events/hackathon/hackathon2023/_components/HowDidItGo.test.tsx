import { render, screen } from '@/__tests__/utils/test-wrapper';
import HowDidItGo from '@/app/[locale]/(routes)/events/hackathons/hackathon2023/_components/HowDidItGo';

jest.mock('@/components/hackathon/skeletons/ImageWithSkeleton', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="mock-image" />
  ),
}));

jest.mock('next/link', () => {
  const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  );
  Link.displayName = 'Link';
  return Link;
});

describe('HowDidItGo', () => {
  it('renders the main heading correctly', () => {
    render(<HowDidItGo />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('How did it go?');
  });

  it('renders all subheadings and corresponding paragraphs correctly', () => {
    render(<HowDidItGo />);

    const subheadings = ['Who Joined?', 'Date', 'Place', 'Who Organized the Event?', 'Workshops'];

    const paragraphs = [
      'More than a hundred participants with a median age of 19 years. Any high school or university student was welcome to participate regardless of skills and background.',
      '20th - 22nd of October, 2023',
      'House of Nature, Jelgavas Street 1, Riga, University of Latvia',
      'We, The Raccoons, together with the University of Latvia Student Council',
      'We organized a series of workshops before the event.',
    ];

    subheadings.forEach((subheading) => {
      expect(screen.getByText(subheading)).toBeInTheDocument();
    });

    paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('renders the workshop link correctly', () => {
    render(<HowDidItGo />);

    const link = screen.getByTestId('mock-link');
    expect(link).toHaveAttribute('href', '/events/workshop2023');
    expect(link).toHaveTextContent('Check them out!');
  });

  it('renders the image correctly', () => {
    render(<HowDidItGo />);

    const image = screen.getByTestId('mock-image');
    expect(image).toHaveAttribute('src', '/images/hackathon2023/raccoon2.webp');
    expect(image).toHaveAttribute('alt', 'Raccoon');
  });
});
