/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react';
import InfoCard from '@/components/InfoCard'; // Adjust the import path as necessary
import '@testing-library/jest-dom';
import { InfoCardProps } from '@/types';

jest.mock('@/i18n', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@/components/GreenButton', () => ({
  __esModule: true,
  default: ({ buttonText, buttonHref }: { buttonText: string; buttonHref: string }) => (
    <button>
      <a href={buttonHref}>{buttonText}</a>
    </button>
  ),
}));

jest.mock('@/components/hackathon/skeletons/ImageWithSkeleton', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe('InfoCard', () => {
  const defaultProps: InfoCardProps = {
    imagePath: '/test-image.jpg',
    alt: 'Test Image',
    width: 300,
    height: 136,
    text: 'Test Text',
    buttonText: 'Test Button',
    buttonHref: '/test-button',
    linkText: 'Test Link',
    linkHref: '/test-link',
  };

  it('renders image with correct attributes', () => {
    render(<InfoCard {...defaultProps} />);

    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/test-image.jpg');
  });

  it('renders text content', () => {
    render(<InfoCard {...defaultProps} />);

    const textElement = screen.getByText('Test Text');
    expect(textElement).toBeInTheDocument();
  });

  it('renders GreenButton with correct props', () => {
    render(<InfoCard {...defaultProps} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();

    const buttonLink = screen.getByRole('link', { name: 'Test Button' });
    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink).toHaveAttribute('href', '/test-button');
  });

  it('renders Link with correct props', () => {
    render(<InfoCard {...defaultProps} />);

    const linkElement = screen.getByRole('link', { name: 'Test Link' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test-link');
  });

  it('does not render GreenButton if buttonText and buttonHref are not provided', () => {
    const { buttonText, buttonHref, ...restProps } = defaultProps;
    render(<InfoCard {...restProps} />);

    const buttonElement = screen.queryByRole('button');
    expect(buttonElement).not.toBeInTheDocument();
  });

  it('does not render Link if linkText and linkHref are not provided', () => {
    const { linkText, linkHref, ...restProps } = defaultProps;
    render(<InfoCard {...restProps} />);

    const linkElement = screen.queryByRole('link', { name: 'Test Link' });
    expect(linkElement).not.toBeInTheDocument();
  });
});
