'use server';

import { db } from '@/lib/db';
import { startOfWeek, endOfWeek, subWeeks } from 'date-fns';

const getWeekRange = (weeksAgo = 0): { startOfWeek: Date; endOfWeek: Date } => {
  const now = new Date();
  const start = startOfWeek(subWeeks(now, weeksAgo));
  const end = endOfWeek(subWeeks(now, weeksAgo));
  return { startOfWeek: start, endOfWeek: end };
};

const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const getFormStatistics = async () => {
  const currentWeek = getWeekRange();
  const lastWeek = getWeekRange(1);

  const totalFormsCurrent = await db.form.count({
    where: {
      createdAt: {
        gte: currentWeek.startOfWeek,
        lte: currentWeek.endOfWeek,
      },
    },
  });

  const totalFormsPrevious = await db.form.count({
    where: {
      createdAt: {
        gte: lastWeek.startOfWeek,
        lte: lastWeek.endOfWeek,
      },
    },
  });

  const totalFormSubmissionsCurrent = await db.eventParticipant.count({
    where: {
      createdAt: {
        gte: currentWeek.startOfWeek,
        lte: currentWeek.endOfWeek,
      },
    },
  });

  const totalFormSubmissionsPrevious = await db.eventParticipant.count({
    where: {
      createdAt: {
        gte: lastWeek.startOfWeek,
        lte: lastWeek.endOfWeek,
      },
    },
  });

  const totalFormsChange = calculatePercentageChange(totalFormsCurrent, totalFormsPrevious);
  const totalFormSubmissionsChange = calculatePercentageChange(
    totalFormSubmissionsCurrent,
    totalFormSubmissionsPrevious,
  );

  return {
    totalForms: totalFormsCurrent,
    totalFormsChange,
    totalFormSubmissions: totalFormSubmissionsCurrent,
    totalFormSubmissionsChange,
  };
};
