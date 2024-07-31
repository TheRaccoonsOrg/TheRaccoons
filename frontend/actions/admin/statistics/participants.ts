'use server';
import { db } from '@/lib/db';
import { getWeekRange } from '@/lib/date';

const countParticipants = async (start: Date, end: Date): Promise<number> => {
  return db.participant.count({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });
};

const countCancelledParticipants = async (start: Date, end: Date): Promise<number> => {
  const cancelledParticipants = await db.eventParticipant.findMany({
    where: {
      cancelled: true,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      participantId: true,
    },
  });

  const distinctCancelledParticipants = new Set(cancelledParticipants.map((p) => p.participantId));

  return distinctCancelledParticipants.size;
};

const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

const getAverageParticipationsPerEvent = async (): Promise<number> => {
  const events = await db.eventEntity.findMany({
    include: {
      participants: {
        where: {
          cancelled: false,
        },
        select: {
          participantId: true,
        },
      },
    },
  });

  const participantCounts = events.map((event) => {
    return new Set(event.participants.map((p) => p.participantId)).size;
  });

  const totalParticipants = participantCounts.reduce((sum, count) => sum + count, 0);
  return participantCounts.length > 0 ? totalParticipants / participantCounts.length : 0;
};

const getAverageParticipantCancellationsPerEvent = async (): Promise<number> => {
  const events = await db.eventEntity.findMany({
    include: {
      participants: {
        where: { cancelled: true },
        select: {
          participantId: true,
        },
      },
    },
  });

  const cancellationCounts = events.map((event) => {
    return new Set(event.participants.map((p) => p.participantId)).size;
  });

  const totalCancellations = cancellationCounts.reduce((sum, count) => sum + count, 0);
  return cancellationCounts.length > 0 ? totalCancellations / cancellationCounts.length : 0;
};

export const getParticipantStatistics = async (): Promise<{
  totalParticipants: number;
  totalCancelledParticipation: number;
  participantChange: number;
  cancelledChange: number;
  averageParticipantsPerEvent: number;
  averageParticipantCancellationsPerEvent: number;
}> => {
  const currentWeek = getWeekRange();
  const lastWeek = getWeekRange(1);

  const totalParticipants = await countParticipants(currentWeek.startOfWeek, currentWeek.endOfWeek);
  const totalCancelledParticipation = await countCancelledParticipants(
    currentWeek.startOfWeek,
    currentWeek.endOfWeek,
  );

  const lastWeekParticipants = await countParticipants(lastWeek.startOfWeek, lastWeek.endOfWeek);
  const lastWeekCancelledParticipants = await countCancelledParticipants(
    lastWeek.startOfWeek,
    lastWeek.endOfWeek,
  );

  const participantChange = calculatePercentageChange(totalParticipants, lastWeekParticipants);
  const cancelledChange = calculatePercentageChange(
    totalCancelledParticipation,
    lastWeekCancelledParticipants,
  );

  const averageParticipantsPerEvent = await getAverageParticipationsPerEvent();
  const averageParticipantCancellationsPerEvent =
    await getAverageParticipantCancellationsPerEvent();

  return {
    totalParticipants,
    totalCancelledParticipation,
    participantChange,
    cancelledChange,
    averageParticipantsPerEvent,
    averageParticipantCancellationsPerEvent,
  };
};

export async function getLastNParticipants(
  n: number,
): Promise<
  { participantId: string; participantName: string; eventName: string; eventCreatedAt: Date }[]
> {
  const participants = await db.eventParticipant.findMany({
    select: {
      participantId: true,
      participant: {
        select: {
          name: true,
        },
      },
      event: {
        select: {
          title: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      event: {
        createdAt: 'desc',
      },
    },
  });

  const uniqueParticipants = new Map<
    string,
    { participantId: string; participantName: string; eventName: string; eventCreatedAt: Date }
  >();

  for (const participant of participants) {
    if (!uniqueParticipants.has(participant.participantId)) {
      uniqueParticipants.set(participant.participantId, {
        participantId: participant.participantId,
        participantName: participant.participant.name,
        eventName: participant.event.title,
        eventCreatedAt: participant.event.createdAt,
      });
    }
  }

  return Array.from(uniqueParticipants.values()).slice(0, n);
}
