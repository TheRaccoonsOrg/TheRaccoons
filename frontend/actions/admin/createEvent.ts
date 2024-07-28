'use server';
import { db } from '@/lib/db';

interface CreateEventData {
  eventId: string;
  title: string;
  dateText: string;
  date: string;
  location: string;
  description: string;
  image: string;
  isPublished: boolean;
  content: string;
  draftContent: string;
}

export const createEvent = async (data: CreateEventData) => {
  try {
    const {
      eventId,
      title,
      dateText,
      date,
      location,
      description,
      image,
      isPublished,
      content,
      draftContent,
    } = data;

    return await db.eventEntity.create({
      data: {
        eventId,
        title,
        dateText,
        date: new Date(date),
        location,
        description,
        image,
        isPublished,
        content,
        draftContent,
      },
    });
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Internal server error');
  }
};
