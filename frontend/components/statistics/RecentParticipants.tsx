'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getLastNParticipants } from '@/actions/admin/statistics/participants';
import { useEffect, useState } from 'react';
import { UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Participant = {
  participantId: string;
  participantName: string;
  eventName: string;
  eventCreatedAt: Date;
};

const RecentParticipants = () => {
  const [participants, setParticipants] = useState<Participant[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const participantData = await getLastNParticipants(6);
        setParticipants(participantData);
      } catch (error) {
        console.error('Error fetching data points:', error);
      }
    };

    fetchData();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ') // Split the string by spaces
      .map((word) => word.charAt(0)) // Take the first letter of each word
      .join(''); // Join the letters back into a single string
  };

  return (
    <div className="space-y-6">
      {participants?.map((participant) => {
        return (
          <div key={participant.participantId} className="flex items-center">
            <Avatar className="flex h-8 w-8 items-center justify-center">
              <AvatarFallback>
                {participant.participantName ? (
                  getInitials(participant.participantName)
                ) : (
                  <UserIcon />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{participant.participantName}</p>
              <p className="text-sm text-muted-foreground">Event: {participant.eventName}</p>
            </div>
            <div className="ml-auto font-medium">
              <Button size="sm">
                <Link href={`/admin/dashboard/participants/${participant.participantId}`}>
                  View Participant
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentParticipants;
