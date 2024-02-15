import { GetEventList } from '@/actions/events';
import { EventTypes } from '@/types';
import { useTranslations } from 'next-intl';
import EventCardGrid from '../_components/event-card-grid';
import EventPageNav from '../_components/event-page-nav';
import ContactSection from '@/components/layout/contact-info';

const EventsPage = () => {
  const filteredEvents = GetEventList('hackathon' as EventTypes);
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
    <div className="flex flex-col justify-between min-h-screen ">
      <div className=" mx-5 md:mx-20 mt-4">
        <EventPageNav events={eventTypes} placeHolder={t('sort')} />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <EventCardGrid props={filteredEvents} />
      </div>
      <div className="mt-auto mb-20">
        <ContactSection />
      </div>
    </div>
  );
};

export default EventsPage;
