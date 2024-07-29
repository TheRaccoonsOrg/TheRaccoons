'use server';
import { db } from '@/lib/db';
import { FormField } from '@/types';

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

export const createFormFields = async (payload: FormPayload, eventId: string) => {
  try {
    // Check if the eventId exists in the EventEntity table
    const eventExists = await db.eventEntity.findUnique({
      where: { eventId },
    });

    if (!eventExists) {
      console.log(`Event with eventId ${eventId} does not exist`);
      return null;
    }

    const { form_response } = payload;
    const { form_id, definition } = form_response;

    // Extract form fields from the definition
    const fields = definition.fields.map((field) => ({
      ref: field.ref,
      title: field.title,
      type: field.type,
    }));

    // Create the form and its fields in the database
    return await db.form.create({
      data: {
        typeformId: form_id,
        name: definition.title,
        description: '',
        eventId: eventExists.id, // Ensure correct ID usage
        content: fields,
      },
    });
  } catch (error) {
    console.error('Error creating form fields:', error);
    throw new Error('Internal server error');
  }
};
