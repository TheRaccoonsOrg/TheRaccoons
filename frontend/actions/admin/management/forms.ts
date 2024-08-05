'use server';

import { db } from '@/lib/db';
import { FormField } from '@/types';
export const getAllForms = async () => {
  return await db.form.findMany();
};

interface FormPayload {
  form_response: {
    form_id: string;
    definition: {
      id: string;
      title: string;
      fields: FormField[];
    };
  };
}

interface CreateFormFieldsResponse {
  success: boolean;
  message: string;
}

export const createFormFields = async (
  payload: FormPayload,
  eventId: string,
  formName: string,
): Promise<CreateFormFieldsResponse> => {
  try {
    // Check if the eventId exists in the EventEntity table
    const eventExists = await db.eventEntity.findUnique({
      where: { id: eventId },
    });

    if (!eventExists) {
      return { success: false, message: `Event with eventId ${eventId} does not exist` };
    }

    const { form_response } = payload;
    const { form_id, definition } = form_response;

    // Check if a form with the same name already exists
    const formExists = await db.form.findUnique({
      where: { name: formName },
    });

    if (formExists) {
      return { success: false, message: `Form with name ${formName} already exists` };
    }

    // Check if the form with the given form_id already exists
    const formIdExists = await db.form.findUnique({
      where: { typeformId: form_id },
    });

    if (formIdExists) {
      return { success: false, message: `Form with form_id ${form_id} already exists` };
    }

    // Extract form fields from the definition
    const fields = definition.fields.map((field) => ({
      ref: field.ref,
      title: field.title,
      type: field.type,
    }));

    // Create the form and its fields in the database
    await db.form.create({
      data: {
        typeformId: form_id,
        name: formName || definition.title,
        description: '',
        eventId: eventExists.id, // Ensure correct ID usage
        content: fields,
      },
    });

    return { success: true, message: 'Form created successfully' };
  } catch (error) {
    console.error('Error creating form fields:', error);
    return { success: false, message: 'Internal server error' };
  }
};
