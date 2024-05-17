import { render, screen } from '@/__tests__/utils/test-wrapper';
import GreenButton from '@/components/GreenButton';
import '@testing-library/jest-dom';

jest.mock('@/i18n', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('GreenButton', () => {
  const defaultProps = {
    buttonHref: '/test-link',
    buttonText: 'Test Button',
    buttonStyles: 'extra-class',
  };

  it('renders the button with correct text and link', () => {
    render(<GreenButton {...defaultProps} />);

    const linkElement = screen.getByRole('link', { name: defaultProps.buttonText });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', defaultProps.buttonHref);
  });

  it('applies default and custom styles', () => {
    render(<GreenButton {...defaultProps} />);

    const buttonElement = screen.getByRole('link', { name: defaultProps.buttonText });

    expect(buttonElement).toHaveClass(/bg-hotgreen/);
    expect(buttonElement).toHaveClass(/rounded-full/);
    expect(buttonElement).toHaveClass(/text-background/);
    expect(buttonElement).toHaveClass(/font-bold/);
    expect(buttonElement).toHaveClass(/min-w-\[100px\]/);
    expect(buttonElement).toHaveClass(/extra-class/);
  });

  it('renders without optional styles', () => {
    const { buttonHref, buttonText } = defaultProps;
    render(<GreenButton buttonHref={buttonHref} buttonText={buttonText} />);

    const buttonElement = screen.getByRole('link', { name: defaultProps.buttonText });

    expect(buttonElement).toHaveClass(/bg-hotgreen/);
    expect(buttonElement).toHaveClass(/rounded-full/);
    expect(buttonElement).toHaveClass(/text-background/);
    expect(buttonElement).toHaveClass(/font-bold/);
    expect(buttonElement).toHaveClass(/min-w-\[100px\]/);
    expect(buttonElement).not.toHaveClass(/extra-class/);
  });
});
