import { render, screen } from '@testing-library/react';
import ColumnSection from '@/app/[locale]/(routes)/stories/_components/ColumnSection';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('ColumnSection', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `Translation for ${key}`);
  });

  it('renders all key pairs correctly', () => {
    render(<ColumnSection />);

    const keys = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

    keys.forEach((key) => {
      expect(screen.getByText(`Translation for ${key}.left`)).toBeInTheDocument();
      expect(screen.getByText(`Translation for ${key}.right`)).toBeInTheDocument();
    });
  });
});
