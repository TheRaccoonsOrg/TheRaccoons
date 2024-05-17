import { render, screen, fireEvent, waitFor } from '@/__tests__/utils/test-wrapper';
import NewsletterForm from '@/components/layout/NewsletterForm';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    warning: jest.fn(),
  },
}));

describe('NewsletterForm', () => {
  const defaultProps = {
    headerTitle: 'Get the latest news!',
    description: 'Subscribe to catch upcoming news about hackathons, workshops and more!',
    placeholderTitle: 'Email',
    additionalInfo:
      '*by submiting this form you are signing up to receive our emails and can unsubscribe at any time.',
    buttonText: 'Subscribe',
    errorMessage: 'Invalid email address',
    listUUID: '1234-5678-9012',
    successMessage: 'Thank you for subscribing!',
    apiError: 'Something went wrong. Please try again later.',
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the form correctly', () => {
    render(<NewsletterForm {...defaultProps} />);

    expect(screen.getByText(defaultProps.headerTitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(defaultProps.placeholderTitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.additionalInfo)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.buttonText)).toBeInTheDocument();
  });

  it('validates the email input', async () => {
    render(<NewsletterForm {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText(defaultProps.placeholderTitle);
    const submitButton = screen.getByText(defaultProps.buttonText);

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(defaultProps.errorMessage)).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(defaultProps.errorMessage)).toBeInTheDocument();
    });
  });

  it('handles successful form submission', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    render(<NewsletterForm {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText(defaultProps.placeholderTitle);
    const submitButton = screen.getByText(defaultProps.buttonText);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(defaultProps.successMessage);
    });
  });

  it('handles failed form submission', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: false }), { status: 400 });

    render(<NewsletterForm {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText(defaultProps.placeholderTitle);
    const submitButton = screen.getByText(defaultProps.buttonText);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(defaultProps.apiError);
    });
  });
});
