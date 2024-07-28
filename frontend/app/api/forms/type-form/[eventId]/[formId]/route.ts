/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getFormFieldsByTypeformId } from '@/actions/admin/getFormFieldsByTypeformId';

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string; formId: string } },
) {
  const { eventId, formId } = params;

  try {
    const payload = await req.json();
    const { form_response } = payload;
    const { answers } = form_response;

    console.log('Payload:', JSON.stringify(payload, null, 2));
    console.log('form_id:', formId);
    console.log('Answers:', answers);

    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid answers format' }, { status: 400 });
    }

    // Verify the existence of the event
    const eventExists = await db.eventEntity.findUnique({
      where: { eventId },
    });

    if (!eventExists) {
      return NextResponse.json(
        { error: `Event with eventId ${eventId} does not exist` },
        { status: 404 },
      );
    }

    // Verify the existence of the form
    const formExists = await db.form.findUnique({
      where: { typeformId: formId },
    });

    if (!formExists) {
      return NextResponse.json(
        { error: `Form with formId ${formId} does not exist` },
        { status: 404 },
      );
    }

    const formFields = await getFormFieldsByTypeformId(formId);

    console.log('formFields:', formFields);

    if (!formFields || formFields.length === 0) {
      return NextResponse.json({ error: 'Form fields not found' }, { status: 404 });
    }

    const participantData: any = {};
    const responses: any = {};

    for (const answer of answers) {
      const fieldRef = answer.field.ref;
      const formField = formFields.find((field) => field.fieldRef === fieldRef);

      if (formField) {
        // Map the responses correctly based on the field type
        if (answer.type === 'text' || answer.type === 'short_text') {
          responses[fieldRef] = answer.text;
        } else if (answer.type === 'email') {
          responses[fieldRef] = answer.email;
        } else if (answer.type === 'phone_number') {
          responses[fieldRef] = answer.phone_number;
        } else if (answer.type === 'date') {
          responses[fieldRef] = answer.date;
        } else if (answer.type === 'multiple_choice' && answer.choice) {
          responses[fieldRef] = answer.choice.label;
        } else if (answer.type === 'yes_no') {
          responses[fieldRef] = answer.boolean;
        }

        // Populate participantData for specific fields
        if (fieldRef === 'email') {
          participantData.email = answer.email;
        } else if (fieldRef === 'full-name') {
          participantData.name = answer.text;
        } else if (fieldRef === 'phoneNumber') {
          participantData.phone = answer.phone_number;
        } else if (fieldRef === 'address') {
          participantData.address = answer.text;
        } else if (fieldRef === 'city') {
          participantData.city = answer.text;
        } else if (fieldRef === 'state') {
          participantData.state = answer.text;
        } else if (fieldRef === 'zip') {
          participantData.zip = answer.text;
        } else if (fieldRef === 'country') {
          participantData.country = answer.text;
        }
      }
    }

    if (!participantData.email || !participantData.name) {
      return NextResponse.json(
        { error: 'Missing required participant information' },
        { status: 400 },
      );
    }

    // Default values for other required fields
    participantData.phone = participantData.phone || 'N/A';
    participantData.address = participantData.address || 'N/A';
    participantData.city = participantData.city || 'N/A';
    participantData.state = participantData.state || 'N/A';
    participantData.zip = participantData.zip || 'N/A';
    participantData.country = participantData.country || 'N/A';

    let participant = await db.participant.findUnique({
      where: { email: participantData.email },
    });

    if (!participant) {
      participant = await db.participant.create({
        data: participantData,
      });
    } else {
      // Update existing participant's information
      participant = await db.participant.update({
        where: { email: participantData.email },
        data: participantData,
      });
    }

    // Check if EventParticipant already exists
    const existingEventParticipant = await db.eventParticipant.findUnique({
      where: {
        eventId_participantId: {
          eventId: eventExists.id,
          participantId: participant.id,
        },
      },
    });

    if (existingEventParticipant) {
      console.log(
        `EventParticipant for event ${eventId} and participant ${participant.id} already exists`,
      );
      return NextResponse.json(
        { message: 'Participant already registered for this event' },
        { status: 409 },
      );
    }

    const eventParticipant = await db.eventParticipant.create({
      data: {
        eventId: eventExists.id,
        participantId: participant.id,
        responses: JSON.stringify(responses, null, 2), // Format responses with 2-space indentation
      },
    });

    return NextResponse.json(eventParticipant);
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
