import React from 'react';
import { render, screen } from '@/__tests__/utils/test-wrapper';
import ContactSection from '@/components/layout/ContactSection';
import { contactConfig } from '@/config/site';
describe('ContactSection', () => {
  it('renders links to social media platforms', async () => {
    render(<ContactSection />);

    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      'https://www.facebook.com/RaccoonsHQ',
    );
    expect(screen.getAllByRole('link')[1]).toHaveAttribute(
      'href',
      'https://www.instagram.com/raccoonshq/',
    );
    expect(screen.getAllByRole('link')[2]).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/the-raccoons-student-community/',
    );
    expect(screen.getAllByRole('link')[3]).toHaveAttribute(
      'href',
      'https://twitter.com/RaccoonsHQ',
    );
    expect(screen.getAllByRole('link')[4]).toHaveAttribute(
      'href',
      'https://github.com/TheRaccoonsOrg',
    );
  });

  it('renders email link', async () => {
    render(<ContactSection />);
    expect(screen.getByText(contactConfig.email)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[5]).toHaveAttribute('href', `mailto:${contactConfig.email}`);
  });

  it('renders social media icons', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  });
});
