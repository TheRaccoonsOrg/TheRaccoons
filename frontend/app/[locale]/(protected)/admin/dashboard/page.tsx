'use client';

import { startTransition } from 'react';
import { Button } from '@/components/ui/button';
import { createFormFields } from '@/actions/form';
import { createEvent } from '@/actions/createEvent';

const DashboardPage = () => {
  const addFormFields = () => {
    startTransition(() => {
      console.log('Create form');
      createFormFields();
    });
  };
  const addEvent = () => {
    startTransition(() => {
      console.log('Create event');
      createEvent();
    });
  };

  return (
    <div className="flex flex-row  h-full">
      <h1>Dashboard</h1>
      <Button onClick={addFormFields}>Add form fields</Button>
      <Button onClick={addEvent}>Add event</Button>
    </div>
  );
};

export default DashboardPage;
