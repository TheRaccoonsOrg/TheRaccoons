/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { db } from '@/lib/db';

interface FormPayload {
  form_response: {
    form_id: string;
    definition: {
      id: string;
      title: string;
      fields: Array<{
        id: string;
        ref: string;
        type: string;
        title: string;
        properties: any;
      }>;
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
    const fields = definition.fields.map((field: any) => ({
      fieldRef: field.ref,
      fieldType: field.type,
      fieldLabel: field.title,
    }));

    // Create the form and its fields in the database
    return await db.form.create({
      data: {
        typeformId: form_id,
        name: definition.title,
        description: '',
        eventId: eventExists.eventId, // Ensure correct ID usage
        fields: {
          create: fields,
        },
      },
    });
  } catch (error) {
    console.error('Error creating form fields:', error);
    throw new Error('Internal server error');
  }
};
