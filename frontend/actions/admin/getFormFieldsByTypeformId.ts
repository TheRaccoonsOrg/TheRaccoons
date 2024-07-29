import { db } from '@/lib/db';

interface FormField {
  ref: string;
  title: string;
  type: string;
}

export const getFormFieldsByTypeformId = async (typeformId: string): Promise<FormField[]> => {
  const form = await db.form.findUnique({
    where: { typeformId },
    select: { content: true },
  });

  if (!form) {
    return [];
  }

  const content = form.content as unknown as FormField[];

  if (!Array.isArray(content)) {
    return [];
  }

  return content;
};
