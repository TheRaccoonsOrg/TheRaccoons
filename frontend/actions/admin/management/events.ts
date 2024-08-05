'use server';
import { db } from '@/lib/db';

interface CreateEventData {
  eventId: string;
  title: string;
  dateText: string;
  date: Date;
  location: string;
  description: string;
}

interface CreateEventResult {
  success: boolean;
  message: string;
}

export const createEvent = async (data: CreateEventData): Promise<CreateEventResult> => {
  try {
    const { eventId, title, dateText, date, location, description } = data;

    // Check if the eventId already exists
    const existingEvent = await db.eventEntity.findUnique({
      where: { eventId },
    });

    if (existingEvent) {
      return { success: false, message: `Event with ID ${eventId} already exists` };
    }

    await db.eventEntity.create({
      data: {
        eventId,
        title,
        dateText,
        date: new Date(date),
        location,
        description,
        image: '',
        isPublished: false,
        content: '',
        draftContent: '',
      },
    });

    return { success: true, message: 'Event successfully created.' };
  } catch (error) {
    console.error('Error creating event:', error);
    return { success: false, message: 'Internal server error' };
  }
};

export const getAllEvents = async () => {
  return await db.eventEntity.findMany();
};
