'use server';
import { db } from '@/lib/db';

export const getFormFieldsByTypeformId = async (typeformId: string) => {
  const form = await db.form.findUnique({
    where: { typeformId },
    include: { fields: true },
  });

  if (!form) {
    throw new Error(`Form with typeformId ${typeformId} not found`);
  }

  return form.fields;
};
