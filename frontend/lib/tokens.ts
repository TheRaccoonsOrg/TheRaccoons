import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { db } from './db';
import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken';
import crypto from 'crypto';
import { getTwoFactorTokenByEmail } from '@/data/twoFactorToken';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  return db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  return db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  return db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export async function createCancellationToken(participantId: string, eventId: string) {
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + 6); // 6 months from now // TODO: Change to expires after event start date

  await db.cancellationToken.create({
    data: {
      token,
      participantId,
      eventId,
      expiresAt,
    },
  });

  return token;
}
