import { render, screen } from '@testing-library/react';
import EventCardGrid from '@/app/[locale]/(routes)/events/_components/EventCardGrid';

import { EventCardProps } from '@/types';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/app/[locale]/(routes)/events/_components/EventCard', () => {
  const EventCard = (props: EventCardProps) => (
    <div data-testid="event-card">
      <div>{props.cardTitle}</div>
      <div>{props.buttonText}</div>
    </div>
  );
  EventCard.displayName = 'EventCard';
  return EventCard;
});

describe('EventCardGrid', () => {
  const mockProps: EventCardProps[] = [
    {
      typeOfEvent: 'hackathon',
      cardImage: 'image1.jpg',
      cardTitle: 'title1',
      buttonText: 'button1',
      buttonLink: '/link1',
      show: true,
    },
    {
      typeOfEvent: 'hackathon',
      cardImage: 'image2.jpg',
      cardTitle: 'title2',
      buttonText: 'button2',
      buttonLink: '/link2',
      show: true,
    },
  ];

  it('renders EventCard components correctly', () => {
    render(<EventCardGrid props={mockProps} />);

    const eventCards = screen.getAllByTestId('event-card');
    expect(eventCards).toHaveLength(mockProps.length);

    mockProps.forEach((item) => {
      expect(screen.getByText(item.cardTitle)).toBeInTheDocument();
      expect(screen.getByText(item.buttonText)).toBeInTheDocument();
    });
  });
});
