import { useTranslations } from "next-intl";
import EventCard from "@/components/event-card";
import { eventsList } from "@/config/available-pages";

const EventsPage = () => {
  const t = useTranslations("Events");

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center ">
        {eventsList.map((item, index) => (
          <EventCard
            cardImage={item.cardImage}
            key={index}
            title={t(item.title)}
            buttonText={t(item.buttonText)}
            buttonLink={item.buttonLink}
            show={item.show}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
