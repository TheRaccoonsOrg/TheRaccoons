'use server';
import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/twoFactorToken';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/twoFactorConfirmation';

export const login = async (values: z.infer<typeof LoginSchema>, callBackUrl?: string | null) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, code } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Verification email sent!' };
  }

  const verifiedByAdmin = existingUser.role === 'ADMIN';
  if (!verifiedByAdmin) {
    return { error: 'Your account is not verified by admin!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: 'Invalid 2FA code!' };
      }
      if (twoFactorToken.token !== code) {
        return { error: 'Invalid 2FA code!' };
      }
      const hasExpred = new Date(twoFactorToken.expires) < new Date();

      if (hasExpred) {
        return { error: '2FA code has expired!' };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return { error: 'Invalid credentials!' };
        }
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
