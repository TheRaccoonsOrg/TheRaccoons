/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getFormFieldsByTypeformId } from '@/actions/admin/getFormFieldsByTypeformId';
import { sendCancellationEmail } from '@/lib/mail';
import { FormField } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string; formId: string } },
) {
  const { eventId, formId } = params;

  try {
    const payload = await req.json();
    const { form_response } = payload;

    const { answers, form_id: payloadFormID } = form_response;

    if (!payloadFormID || payloadFormID !== formId) {
      return NextResponse.json(
        { error: "URL and Payload Form ID doesn't match! Please check webhook URL!" },
        { status: 400 },
      );
    }

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

    if (!formFields || formFields.length === 0) {
      return NextResponse.json({ error: 'Form fields not found' }, { status: 404 });
    }

    const participantData: any = {};
    const responses: any = {};

    // Dynamically handle all answer types
    for (const answer of answers) {
      const fieldRef = answer.field.ref;
      const formField = formFields.find((field: FormField) => field.ref === fieldRef);

      if (formField) {
        switch (answer.type) {
          case 'text':
          case 'short_text':
          case 'long_text':
            responses[fieldRef] = answer.text;
            break;
          case 'email':
            responses[fieldRef] = answer.email;
            break;
          case 'phone_number':
            responses[fieldRef] = answer.phone_number;
            break;
          case 'date':
            responses[fieldRef] = answer.date;
            break;
          case 'choice':
          case 'multiple_choice':
          case 'dropdown':
            responses[fieldRef] = answer.choice?.label || null;
            break;
          case 'boolean':
          case 'yes_no':
            responses[fieldRef] = answer.boolean;
            break;
          case 'payment':
            responses[fieldRef] = JSON.stringify(answer.payment);
            break;
          case 'file_url':
            responses[fieldRef] = answer.file_url;
            break;
          case 'url':
            responses[fieldRef] = answer.url;
            break;
          case 'picture_choice':
            responses[fieldRef] = answer.choice?.label || null;
            break;
          default:
            console.warn(`Unhandled answer type: ${answer.type}`);
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
      } else {
        console.warn(`Form field not found for fieldRef: ${fieldRef}`);
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

    // Check if EventParticipant already exists for the same event and form
    const eventParticipant = await db.eventParticipant.findUnique({
      where: {
        eventId_participantId_formId: {
          eventId: eventExists.id,
          participantId: participant.id,
          formId: formExists.id,
        },
      },
    });

    if (eventParticipant) {
      // If the participant has canceled, mark the new submission as canceled
      const updatedEventParticipant = await db.eventParticipant.update({
        where: {
          id: eventParticipant.id,
        },
        data: {
          responses: responses,
          cancelled: eventParticipant.cancelled, // Keep the cancellation status
          cancelledAt: eventParticipant.cancelledAt, // Keep the cancellation time
        },
      });

      return NextResponse.json(
        { message: 'Participant form submission updated', data: updatedEventParticipant },
        { status: 200 },
      );
    }

    // Check if participant has previously canceled their participation for the event
    const previouslyCancelled = await db.eventParticipant.findFirst({
      where: {
        eventId: eventExists.id,
        participantId: participant.id,
        cancelled: true,
      },
    });

    // Create new EventParticipant record
    await db.eventParticipant.create({
      data: {
        eventId: eventExists.id,
        participantId: participant.id,
        formId: formExists.id,
        responses: responses,
        cancelled: !!previouslyCancelled, // Mark as cancelled if previously cancelled
        cancelledAt: previouslyCancelled ? previouslyCancelled.cancelledAt : null, // Retain previous cancellation time if applicable
      },
    });

    // Check if an email has already been sent to this participant for this event
    const emailSent = await db.eventParticipant.findFirst({
      where: {
        eventId: eventExists.id,
        participantId: participant.id,
        emailSent: true,
      },
    });

    if (!emailSent && eventExists.requiresCancellation) {
      // Send cancellation email
      await sendCancellationEmail(participant.email, eventExists.id, participant.id);

      // Mark the email as sent
      await db.eventParticipant.updateMany({
        where: {
          eventId: eventExists.id,
          participantId: participant.id,
        },
        data: {
          emailSent: true,
        },
      });
    }

    return NextResponse.json({ message: 'Form responses saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
