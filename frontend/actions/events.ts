import { workshopsData } from '@/app/[locale]/(routes)/events/workshops/_data/workshopsData';
import { hackathonCards } from '@/config/available-pages';
import { EventCardProps, EventTypes, WorkshopProps } from '@/types';

export const appendExtractedData = (originalArray: WorkshopProps[]) => {
  const newArray: EventCardProps[] = originalArray.map((item) => ({
    typeOfEvent: item.typeOfEvent,
    cardTitle: item.cardTitle,
    buttonText: item.buttonText,
    buttonLink: item.buttonLink,
    cardImage: item.cardImage,
    lastModified: item.lastModified,
    show: item.show,
    date: item.date,
  }));

  hackathonCards.push(...newArray);

  return hackathonCards;
};
const updatedArray = appendExtractedData(workshopsData);
const sortedArray = updatedArray.sort((a, b) => {
  if (!a.date) return 1;
  if (!b.date) return -1;

  return -new Date(a.date) - -new Date(b.date);
});

export const GetEventList = (type: EventTypes) => {
  if (type === 'hackathon') {
    return sortedArray.filter((event) => event.typeOfEvent === 'hackathon');
  }
  if (type === 'workshop') {
    return sortedArray.filter((event) => event.typeOfEvent === 'workshop');
  }
  return sortedArray;
};

export const findWorkshopBySlug = (slug: string) => {
  return workshopsData.find((workshop) => workshop.slug === slug);
};
