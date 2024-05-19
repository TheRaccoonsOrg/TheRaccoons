import { render, screen } from '@testing-library/react';
import TestChoice from '@/app/[locale]/(routes)/stories/_components/TestChoice';

jest.mock('@/components/GreenButton', () => ({
  __esModule: true,
  default: ({
    buttonStyles,
    buttonText,
    buttonHref,
  }: {
    buttonStyles: string;
    buttonText: string;
    buttonHref: string;
  }) => (
    <a href={buttonHref} className={buttonStyles}>
      {buttonText}
    </a>
  ),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const testKeys = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
];

const disclaimerKeys = [
  {
    key: 'projectLink',
    link: 'https://www.google.com/url?q=http://1.1.1.3/18/A/001&sa=D&source=editors&ust=1618646329350000&usg=AFQjCNELxnFcCxSK8vBnEDcbgkMnsuynYw',
  },
  {
    key: 'privacyPolicy',
    link: 'https://cfla.gov.lv/lv/par-mums/fizisko-personu-datu-aizsardziba/privatuma-politika',
  },
  {
    key: 'dataSafety',
    link: 'https://www.ej.uz/raccoons_datuaizsardziba',
  },
];

describe('TestChoice', () => {
  it('renders all test items correctly', () => {
    render(<TestChoice />);
    testKeys.forEach((key) => {
      const text = screen.getByText(`tests.${key}.text`);
      const buttonText = screen.getByText(`tests.${key}.buttonText`);
      expect(text).toBeInTheDocument();
      expect(buttonText).toBeInTheDocument();
    });

    const text = screen.getByText('disclaimer.text');
    expect(text).toBeInTheDocument();

    disclaimerKeys.forEach((elem) => {
      const disclaimerData = screen.getByText(`disclaimer.${elem.key}`);
      expect(disclaimerData).toBeInTheDocument();

      const disclaimerLink = screen.getByRole('link', {
        name: `disclaimer.${elem.key}`,
      });
      expect(disclaimerLink).toHaveAttribute('href', elem.link);
    });
  });

  it('renders all buttons with correct links', () => {
    render(<TestChoice />);
    testKeys.forEach((key) => {
      const button = screen.getByRole('link', {
        name: `tests.${key}.buttonText`,
      });
      expect(button).toHaveAttribute('href', `tests.${key}.buttonHref`);
    });
  });
});
