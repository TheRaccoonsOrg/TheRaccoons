'use client';

import React, { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createFormFields } from '@/actions/admin/createFormFields';

const FormInput = () => {
  const [payload, setPayload] = useState('');
  const [eventId, setEventId] = useState('');
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    startTransition(() => {
      try {
        const parsedPayload = JSON.parse(payload);
        createFormFields(parsedPayload, eventId).then((form) => {
          console.log('Form created successfully:', form);
          router.push('/'); // Redirect or update as needed
        });
      } catch (error) {
        console.error('Error creating form fields:', error);
      } finally {
        setIsPending(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        placeholder="Event ID"
        required
        disabled={isPending}
      />
      <textarea
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        rows={20}
        cols={80}
        placeholder="Paste your webhook payload here"
        required
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
};

export default FormInput;
