import { render, fireEvent, screen } from '@/__tests__/utils/test-wrapper';
import EventPageNav from '@/app/[locale]/(routes)/events/_components/EventPageNav';

const pushMock = jest.fn();
jest.mock('@/i18n', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({
    onValueChange,
    children,
  }: {
    onValueChange: (value: string) => void;
    children: React.ReactNode;
  }) => (
    <button
      data-testid="select"
      onClick={(e) =>
        onValueChange((e.target as HTMLButtonElement).getAttribute('data-value') || '')
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onValueChange((e.target as HTMLButtonElement).getAttribute('data-value') || '');
        }
      }}
      tabIndex={0}>
      {children}
    </button>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-trigger">{children}</div>
  ),
  SelectValue: ({ placeholder }: { placeholder: string }) => (
    <div data-testid="select-value">{placeholder}</div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ value, children }: { value: string; children: React.ReactNode }) => (
    <div data-testid="select-item" data-value={value}>
      {children}
    </div>
  ),
}));

describe('EventPageNav', () => {
  const mockEvents = [
    { href: '/event1', label: 'Event 1' },
    { href: '/event2', label: 'Event 2' },
  ];
  const mockPlaceHolder = 'Select an event';

  it('renders correctly', () => {
    render(<EventPageNav events={mockEvents} placeHolder={mockPlaceHolder} />);

    expect(screen.getByTestId('select-value')).toHaveTextContent(mockPlaceHolder);

    mockEvents.forEach((event) => {
      expect(screen.getByText(event.label)).toBeInTheDocument();
    });
  });

  it('navigates to the correct event on selection', () => {
    render(<EventPageNav events={mockEvents} placeHolder={mockPlaceHolder} />);

    const eventItem = screen.getByText(mockEvents[0].label);
    fireEvent.click(eventItem);

    expect(pushMock).toHaveBeenCalledWith(mockEvents[0].href);
  });
});
