'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { startTransition, useState } from 'react';
import { createEvent } from '@/actions/admin/management/events';
import { DialogDescription } from '@radix-ui/react-dialog';

const FormSchema = z.object({
  eventId: z.string().min(1, { message: 'Event ID is required.' }),
  title: z.string().min(1, { message: 'Title is required.' }),
  dateText: z.string().min(1, { message: 'Date Text is required.' }),
  date: z.date({ required_error: 'Date is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface CreateEventFormDialogProps {
  onEventCreated: () => void;
}

const CreateEventFormDialog: React.FC<CreateEventFormDialogProps> = ({ onEventCreated }) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventId: '',
      title: '',
      dateText: '',
      date: new Date(),
      location: '',
      description: '',
    },
  });
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hours, setHours] = useState<string>(String(new Date().getHours()).padStart(2, '0'));
  const [minutes, setMinutes] = useState<string>(String(new Date().getMinutes()).padStart(2, '0'));

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    startTransition(() => {
      const dateWithTime = new Date(selectedDate || new Date());
      dateWithTime.setHours(parseInt(hours, 10));
      dateWithTime.setMinutes(parseInt(minutes, 10));

      createEvent({ ...data, date: dateWithTime })
        .then((result) => {
          if (result.success) {
            setOpen(false);
            toast.success(result.message);
            form.reset();
            onEventCreated();
          } else {
            form.setError('eventId', {
              type: 'manual',
              message: result.message,
            });
          }
        })
        .catch((error: Error) => {
          form.setError('eventId', {
            type: 'manual',
            message: error.message,
          });
        });
    });
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 2 && /^\d*$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 23) {
      setHours(value.padStart(2, '0'));
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 2 && /^\d*$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 59) {
      setMinutes(value.padStart(2, '0'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            form.reset();
            setOpen(true);
          }}>
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[37.5rem] border-border">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <DialogDescription>Fill in the details of the event you want to create</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Event ID" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Date Text" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <FormLabel>Date and Time</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] pl-3 text-left font-normal',
                      !selectedDate && 'text-muted-foreground',
                    )}>
                    {selectedDate ? (
                      `${format(selectedDate, 'dd.MM.yyyy')} ${hours}:${minutes}`
                    ) : (
                      <span>Pick a date and time</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex flex-col space-y-2 p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined} // Ensure the selected date is either a Date or undefined
                      onSelect={(date) => setSelectedDate(date ?? null)} // Ensure the date is either a Date or null
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="HH"
                min={0}
                max={23}
                value={hours}
                onChange={handleHoursChange}
                className="w-20 h-10"
              />
              <span>:</span>
              <Input
                type="number"
                placeholder="MM"
                min={0}
                max={59}
                value={minutes}
                onChange={handleMinutesChange}
                className="w-20 h-10"
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventFormDialog;
