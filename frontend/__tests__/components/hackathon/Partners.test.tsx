/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { render, screen } from '@/__tests__/utils/test-wrapper';
import Partners from '@/components/hackathon/Partners';
import {
  communityPartners,
  partnerImages,
} from '@/app/[locale]/(routes)/events/hackathons/hackathon2023/_data/partner-images';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('Partners', () => {
  const props = {
    partnerImages,
    communityPartners,
  };

  test('renders main images correctly', () => {
    render(<Partners props={props} />);

    const mainOrganizerImage = screen.getByAltText('Main Organizer');
    expect(mainOrganizerImage).toBeInTheDocument();
    expect(mainOrganizerImage).toHaveAttribute('src', '/images/en/main-org-LUSP.webp');

    const dotsImage = screen.getByAltText('Dots');
    expect(dotsImage).toBeInTheDocument();
    expect(dotsImage).toHaveAttribute('src', '/images/hackathon2023/dots.webp');

    const partnersImage = screen.getByAltText('Partners');
    expect(partnersImage).toBeInTheDocument();
    expect(partnersImage).toHaveAttribute('src', '/images/en/partners.webp');

    const communityPartnersImage = screen.getByAltText('Community Partners');
    expect(communityPartnersImage).toBeInTheDocument();
    expect(communityPartnersImage).toHaveAttribute('src', '/images/en/comminity_partners.webp');
  });

  test('renders partner images correctly', () => {
    render(<Partners props={props} />);

    partnerImages.forEach((item) => {
      const partnerImage = screen.getByAltText(item.alt);
      expect(partnerImage).toBeInTheDocument();
      expect(partnerImage).toHaveAttribute('src', item.imagePath);

      if (item.linkHref) {
        const linkElement = screen.getByRole('link', { name: item.alt });
        expect(linkElement).toHaveAttribute('href', item.linkHref);
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  test('renders community partner images correctly', () => {
    render(<Partners props={props} />);

    communityPartners.forEach((item) => {
      const communityPartnerImage = screen.getByAltText(item.alt);
      expect(communityPartnerImage).toBeInTheDocument();
      expect(communityPartnerImage).toHaveAttribute('src', item.imagePath);

      const linkElement = screen.getByRole('link', { name: item.alt });
      expect(linkElement).toHaveAttribute('href', item.linkHref);
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
