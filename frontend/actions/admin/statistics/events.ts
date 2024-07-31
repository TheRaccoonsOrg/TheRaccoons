'use server';
import { db } from '@/lib/db';
import { startOfYear, endOfYear, subYears } from 'date-fns';

const getYearRange = (yearsAgo = 0): { startOfYear: Date; endOfYear: Date } => {
  const now = new Date();
  const start = startOfYear(subYears(now, yearsAgo));
  const end = endOfYear(subYears(now, yearsAgo));
  return { startOfYear: start, endOfYear: end };
};

const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return (part / total) * 100;
};

const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const getTotalEvents = async () => {
  const currentYear = getYearRange();
  const lastYear = getYearRange(1);

  const totalEventsCurrent = await db.eventEntity.count({
    where: {
      createdAt: {
        gte: currentYear.startOfYear,
        lte: currentYear.endOfYear,
      },
    },
  });

  const totalEventsPrevious = await db.eventEntity.count({
    where: {
      createdAt: {
        gte: lastYear.startOfYear,
        lte: lastYear.endOfYear,
      },
    },
  });

  const totalEventsChange = calculatePercentageChange(totalEventsCurrent, totalEventsPrevious);

  return {
    totalEvents: totalEventsCurrent,
    totalEventsChange,
  };
};

export const getEventAttendanceRate = async () => {
  const totalRegistered = await db.eventParticipant.count();
  const totalAttended = await db.eventParticipant.count({
    where: {
      cancelled: false,
    },
  });

  const attendanceRate = calculatePercentage(totalAttended, totalRegistered);

  return {
    totalRegistered,
    totalAttended,
    attendanceRate,
  };
};
