'use server';
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

const generateUniqueUsername = async (baseUsername: string): Promise<string> => {
  let username = baseUsername;
  let count = 1;

  while (await db.user.findUnique({ where: { username } })) {
    username = `${baseUsername}${count}`;
    count++;
  }

  return username;
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, email, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  const baseUsername = email.split('@')[0];

  // Check if the username already exists
  const existingUsernameUser = await db.user.findUnique({ where: { username: baseUsername } });

  // If the username exists, generate a unique one; otherwise, use the base username
  const username = existingUsernameUser ? await generateUniqueUsername(baseUsername) : baseUsername;

  await db.user.create({
    data: {
      name,
      email,
      username: username,
      password: hashedPassword,
    },
  });
  const verificationNeeded = process.env.EMAIL_VERIFICATION === 'true';
  if (verificationNeeded) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Verification email sent!' };
  }
  return { success: 'Please login with your account' };
};
