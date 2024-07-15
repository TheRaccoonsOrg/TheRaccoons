'use server';
import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: { email },
    });
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    return await db.user.findUnique({
      where: { username },
    });
  } catch (error) {
    return null;
  }
};
