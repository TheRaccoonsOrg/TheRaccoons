/* eslint-disable @next/next/no-img-element */
/* eslint-disable jest/no-conditional-expect */
import { render, screen } from '@testing-library/react';
import InfoSection from '@/components/layout/InfoSection';
import { infoSectionData } from '@/lib/content';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace) => {
    return jest.fn((key) => `${namespace}-${key}`);
  }),
}));

jest.mock('@/components/InfoCard', () => ({
  __esModule: true,
  default: ({
    imagePath,
    alt,
    width,
    height,
    text,
    buttonText,
    buttonHref,
    linkText,
    linkHref,
  }: {
    imagePath: string;
    alt: string;
    width: number;
    height: number;
    text: string;
    buttonText: string;
    buttonHref: string;
    linkText: string;
    linkHref: string;
  }) => (
    <div data-testid="info-card">
      <img src={imagePath} alt={alt} width={width} height={height} data-testid="info-card-image" />
      <p>{text}</p>
      {buttonText && (
        <a href={buttonHref} data-testid="info-card-button">
          {buttonText}
        </a>
      )}
      {linkText && (
        <a href={linkHref} data-testid="info-card-link">
          {linkText}
        </a>
      )}
    </div>
  ),
}));

describe('InfoSection', () => {
  it('renders InfoCard components correctly', () => {
    render(<InfoSection />);

    const infoCards = screen.getAllByTestId('info-card');
    expect(infoCards).toHaveLength(infoSectionData.length);

    infoSectionData.forEach((item, index) => {
      const imageElement = screen.getAllByTestId('info-card-image')[index];
      expect(imageElement).toHaveAttribute('src', `Image-${item.title}`);
      expect(imageElement).toHaveAttribute('alt', item.title || '');

      const textElement = screen.getByText(`Index-${item.title}`);
      expect(textElement).toBeInTheDocument();

      if (item.buttonText) {
        const buttonElement = screen.getByText(`Buttons-${item.buttonText}`);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveAttribute('href', item.buttonHref || '');
      }

      if (item.linkText) {
        const linkElement = screen.getByText(`Links-${item.linkText}`);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', item.linkHref || '');
      }
    });
  });
});
