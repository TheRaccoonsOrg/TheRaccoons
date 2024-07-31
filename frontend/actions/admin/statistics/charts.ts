'use server';
import { db } from '@/lib/db';
import { eachDayOfInterval, format, subDays, addDays } from 'date-fns';

export const getChartData = async () => {
  const daysData = await db.participant.findMany({
    where: {
      createdAt: {
        gte: subDays(new Date(), 30),
      },
    },
    select: {
      createdAt: true,
    },
  });

  const formattedDaysData = eachDayOfInterval({
    start: subDays(new Date(), 30),
    end: addDays(new Date(), 3),
  }).map((day) => {
    const date = format(day, 'yyyy-MM-dd');
    const count = Math.max(
      0,
      daysData.filter((d) => format(d.createdAt, 'yyyy-MM-dd') === date).length,
    );
    return { date, count };
  });

  const eventsData = await db.eventEntity.findMany({
    include: {
      participants: true,
    },
  });

  const formattedEventsData = eventsData.map((event) => {
    return { event: event.title, count: event.participants.length };
  });

  const cancellationsData = await db.eventEntity.findMany({
    include: {
      participants: {
        where: {
          cancelled: true,
        },
      },
    },
  });

  const formattedCancellationsData = cancellationsData.map((event) => {
    return { event: event.title, count: event.participants.length };
  });

  return {
    newParticipantsByDays: formattedDaysData,
    participationsPerEvent: formattedEventsData,
    totalCancellationsPerEvent: formattedCancellationsData,
  };
};
