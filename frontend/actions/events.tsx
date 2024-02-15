import { eventsList } from '@/config/available-pages';
import { EventTypes } from '@/types';

export const GetEventList = (type: EventTypes) => {
  if (type === 'hackathon') {
    return eventsList.filter((event) => event.typeOfEvent === 'hackathon');
  }
  if (type === 'workshop') {
    return eventsList.filter((event) => event.typeOfEvent === 'workshop');
  }
  return eventsList;
};
