'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const EventPageNav = ({
  events,
  placeHolder,
}: {
  events: { href: string; label: string }[];
  placeHolder: string;
}) => {
  const router = useRouter();
  const selectEventType = (link: string) => {
    console.log('link', link);
    return router.push(link);
  };
  return (
    <Select onValueChange={(value) => selectEventType(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent defaultValue={'/events'}>
        {events.map((event) => (
          <SelectItem key={event.href} value={event.href} onClick={() => console.log('click')}>
            {event.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EventPageNav;
