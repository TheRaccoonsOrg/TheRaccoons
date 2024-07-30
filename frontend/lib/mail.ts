import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { createCancellationToken } from '@/lib/tokens';

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.NODE_ENV === 'production',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as SMTPTransport.Options);

type SendEmailDto = {
  from: string;
  to: string;
  subject: string;
  message: string;
};

export const sendEmail = async ({ from, to, subject, message }: SendEmailDto) => {
  return await transport.sendMail({
    from,
    to,
    subject,
    html: message,
    text: message,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/en/auth/new-verification?token=${token}`;
  await sendEmail({
    from: 'onboarding@yourdomain.com',
    to: email,
    subject: 'Verify your email address',
    message: `<p>Click <a href="${confirmLink}">here</a> to verify your email address.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/en/auth/new-password?token=${token}`;
  await sendEmail({
    from: 'onboarding@yourdomain.com',
    to: email,
    subject: 'Reset your password',
    message: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendEmail({
    from: 'onboarding@yourdomain.com',
    to: email,
    subject: '2FA Code',
    message: `<p>Your 2FA code: ${token}</p>`,
  });
};

export async function sendCancellationEmail(email: string, eventId: string, participantId: string) {
  const token = await createCancellationToken(participantId, eventId);
  const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/cancel?token=${token}`;

  const message = `<p>You can cancel your participation in the event by clicking the following link: <a href="${cancelUrl}">${cancelUrl}</a></p>`;

  await sendEmail({
    from: 'events@yourdomain.com',
    to: email,
    subject: 'Event Cancellation',
    message,
  });
}
