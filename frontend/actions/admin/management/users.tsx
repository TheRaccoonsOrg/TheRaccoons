'use server';

import { db } from '@/lib/db';

const getUsers = async () => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

const getUserById = async (userId: string) => {
  return db.user.findUnique({
    where: { id: userId },
  });
};
