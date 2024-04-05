import { useTranslations } from 'next-intl';
import { EventCardProps } from '@/types';
import EventCard from './event-card';

const EventCardGrid = ({ props }: { props: EventCardProps[] }) => {
  const t = useTranslations('Events');
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-wrap items-center justify-center">
        {props.map((item, index) => (
          <EventCard
            typeOfEvent={item.typeOfEvent}
            key={index}
            cardImage={item.cardImage}
            cardTitle={t(item.cardTitle)}
            buttonText={t(item.buttonText)}
            buttonLink={item.buttonLink}
            show={item.show}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCardGrid;
