import { GetEventList } from '@/actions/events';
import { EventTypes } from '@/types';
import { useTranslations } from 'next-intl';
import EventCardGrid from '../_components/event-card-grid';
import EventPageNav from '../_components/event-page-nav';

const EventsPage = () => {
  const filteredEvents = GetEventList('workshop' as EventTypes);
  const t = useTranslations('EventTypes');
  const eventTypes = [
    {
      href: '/events',
      label: t('all'),
    },
    {
      href: '/events/hackathons',
      label: t('hackathons'),
    },
    {
      href: '/events/workshops',
      label: t('workshops'),
    },
  ];
  return (
    <div>
      <div className="flex flex-col justify-center md:justify-start mx-5 md:mx-20">
        <EventPageNav events={eventTypes} placeHolder={t('sort')} />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <EventCardGrid props={filteredEvents} />
      </div>
    </div>
  );
};

export default EventsPage;
