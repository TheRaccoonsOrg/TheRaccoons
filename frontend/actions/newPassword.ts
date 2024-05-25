'use server';
import { getPasswordResetTokenByToken } from '@/data/passwordResetToken';
import { getUserByEmail } from '@/data/user';
import { NewPasswordSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Token is missing' };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }
  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: 'Token not found' };
  }
  const hasExpired = new Date() > existingToken.expires;

  if (hasExpired) {
    return { error: 'Token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { email: existingToken.email },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Password updated!' };
};
