'use client';
import { getAllEvents } from '@/actions/admin/management/events';
import CreateEventFormDialog from '@/components/dialogs/CreateEventFormDialog';
import ExportButton from '@/components/ExportButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventEntity } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';

import { BarLoader } from 'react-spinners';

const EventsPage = () => {
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchEvents = useCallback(() => {
    setLoading(true);
    getAllEvents().then((events) => {
      const sortedEvents = events.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setEvents(sortedEvents);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div>
      <ExportButton typeformId={'wtzlqAe9'} />
      <CreateEventFormDialog onEventCreated={fetchEvents} />
      {loading ? (
        <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center">
          <BarLoader color="#36f8a7" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
          {events.map((event, index) => (
            <Card key={index} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500">{event.location}</p>
                    <p className="text-sm text-gray-500">{event.date.toDateString()}</p>
                  </div>
                  <Button variant="outline" className="text-sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
