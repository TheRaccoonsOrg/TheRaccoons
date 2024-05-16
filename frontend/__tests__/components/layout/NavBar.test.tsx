import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-wrapper';
import Navbar from '@/components/layout/NavBar';
import { getNextImagePath } from '@/__tests__/utils/nextImagePath';

describe('Navbar', () => {
  const navLinks = [
    { route: 'Home', path: '/' },
    { route: 'About', path: '/about' },
    { route: 'Contact', path: '/contact' },
  ];

  it('renders nav links correctly', () => {
    render(<Navbar navLinks={navLinks} />);

    navLinks.forEach((link) => {
      const navLinkElement = screen.getByText(link.route);
      expect(navLinkElement).toBeInTheDocument();
      expect(navLinkElement).toHaveAttribute('href', '/en' + (link.path === '/' ? '' : link.path));
    });
  });

  it('toggles the hamburger menu', async () => {
    render(<Navbar navLinks={navLinks} />);

    const hamburgerButton = screen.getByLabelText('Hamburger Menu');

    let navMenu = screen.getByTestId('hamburger-menu');
    expect(navMenu).toHaveClass('hidden');

    fireEvent.click(hamburgerButton);

    navMenu = screen.getByTestId('hamburger-menu');
    expect(navMenu).toHaveClass('block');

    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      expect(navMenu).toHaveClass('hidden');
    });
  });

  it('renders the logo and language dropdown', () => {
    render(<Navbar navLinks={navLinks} />);

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', getNextImagePath('/images/logo.webp', 1080));

    const languageDropdown = screen.getByTestId('language-dropdown');
    expect(languageDropdown).toBeInTheDocument();
  });

  it('clicking on nav links', () => {
    render(<Navbar navLinks={navLinks} />);
    for (const link of navLinks) {
      fireEvent.click(screen.getByText(link.route));
      expect(screen.getByText(link.route)).toHaveAttribute(
        'href',
        '/en' + (link.path === '/' ? '' : link.path),
      );
    }
  });
});
