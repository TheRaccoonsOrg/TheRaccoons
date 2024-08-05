'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { startTransition, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { getAllEvents } from '@/actions/admin/management/events';
import { EventEntity } from '@prisma/client';
import { createFormFields } from '@/actions/admin/management/forms';

const FormSchema = z.object({
  eventId: z.string().min(1, { message: 'Event ID is required.' }),
  formName: z.string().optional(),
  payload: z
    .string()
    .min(1, { message: 'Payload is required.' })
    .refine(
      (val) => {
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Invalid JSON format' },
    ),
  formUrl: z.string().min(1, { message: 'Form URL is required.' }).url('Invalid URL format'),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface CreateTypeformDialogProps {
  onFormCreated: () => void;
}

const CreateTypeformDialog: React.FC<CreateTypeformDialogProps> = ({ onFormCreated }) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventId: '',
      formName: '',
      payload: '',
      formUrl: '',
    },
  });

  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents();
        setEvents(events);
      } catch (error) {
        toast.error('Failed to fetch events');
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handlePayloadChange = (value: string) => {
    form.setValue('payload', value);
    form.clearErrors('payload');
    try {
      const parsedPayload = JSON.parse(value);
      const formName = parsedPayload.form_response.definition.title;
      if (!form.getValues('formName')) {
        form.setValue('formName', formName);
      }

      const formId = form.getValues('formUrl').match(/form\/([a-zA-Z0-9]+)/)?.[1];
      if (formId && formId !== parsedPayload.form_response.form_id) {
        form.setError('payload', {
          type: 'manual',
          message: 'Form ID in payload does not match the form ID in the URL.',
        });
      }
    } catch (error) {
      form.setError('payload', { type: 'manual', message: 'Invalid JSON format' });
    }
  };

  const handleFormUrlChange = (value: string) => {
    form.setValue('formUrl', value);
    form.clearErrors('formUrl');
    try {
      const formId = value.match(/form\/([a-zA-Z0-9]+)/)?.[1];
      if (!formId) {
        throw new Error('Invalid form URL');
      }

      const eventId = form.getValues('eventId');
      const selectedEvent = events.find((event) => event.id === eventId);
      if (selectedEvent) {
        const webhookUrl = `https://www.theraccoons.org/api/forms/type-form/${selectedEvent.eventId}/${formId}`;
        setWebhookUrl(webhookUrl);

        const payload = form.getValues('payload');
        if (payload) {
          const parsedPayload = JSON.parse(payload);
          if (parsedPayload.form_response.form_id !== formId) {
            form.setError('formUrl', {
              type: 'manual',
              message: 'Form ID in payload does not match the form ID in the URL.',
            });
          }
        }
      } else {
        form.setError('eventId', { type: 'manual', message: 'Selected event not found' });
      }
    } catch (error) {
      form.setError('formUrl', { type: 'manual', message: 'Invalid form URL' });
    }
  };

  const handleCopyWebhookUrl = () => {
    if (webhookUrl) {
      navigator.clipboard
        .writeText(webhookUrl)
        .then(() => toast.success('Webhook URL copied to clipboard'))
        .catch(() => toast.error('Failed to copy Webhook URL'));
    }
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setIsPending(true);

    startTransition(() => {
      try {
        const parsedPayload = JSON.parse(data.payload);
        const formName = data.formName || parsedPayload.form_response.definition.title;

        const formIdFromUrl = data.formUrl.match(/form\/([a-zA-Z0-9]+)/)?.[1];
        if (parsedPayload.form_response.form_id !== formIdFromUrl) {
          form.setError('payload', {
            type: 'manual',
            message: 'Form ID in payload does not match the form ID in the URL.',
          });
          setIsPending(false);
          return;
        }

        // Validate necessary fields
        const necessaryFields = ['email', 'full-name', 'phoneNumber']; // Adjust according to your requirements
        const missingFields = necessaryFields.filter(
          (field) =>
            !parsedPayload.form_response.definition.fields.some(
              (f: { ref: string }) => f.ref === field,
            ),
        );

        if (missingFields.length > 0) {
          form.setError('payload', {
            type: 'manual',
            message: `Missing fields: ${missingFields.join(', ')}`,
          });
          setIsPending(false);
          return;
        }

        createFormFields(parsedPayload, data.eventId, formName)
          .then((result) => {
            if (result.success) {
              toast.success(result.message);
              setOpen(false);
              form.reset();
              onFormCreated();
            } else {
              if (result.message.includes('eventId')) {
                form.setError('eventId', { type: 'manual', message: result.message });
              } else if (result.message.includes('form_id')) {
                form.setError('payload', { type: 'manual', message: result.message });
              } else if (result.message.includes('name')) {
                form.setError('formName', { type: 'manual', message: result.message });
              } else {
                toast.error(result.message);
              }
            }
          })
          .catch((error) => {
            form.setError('payload', { type: 'manual', message: 'Error creating form fields' });
            toast.error('Error creating form fields');
            console.error('Error creating form fields:', error);
          })
          .finally(() => {
            setIsPending(false);
          });
      } catch (error) {
        form.setError('payload', { type: 'manual', message: 'Invalid JSON format' });
        console.error('Error parsing payload:', error);
        setIsPending(false);
      }
    });
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
          Create Typeform Integration
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[37.5rem] border-border">
        <DialogHeader>
          <DialogTitle>Create Typeform Integration</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event ID</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map((event) => (
                          <SelectItem key={event.id} value={event.id}>
                            {event.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Form Name"
                      {...field}
                      autoComplete="off"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Paste your Typeform URL here"
                      {...field}
                      onChange={(e) => handleFormUrlChange(e.target.value)}
                      autoComplete="off"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payload</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your webhook payload here"
                      rows={10}
                      cols={80}
                      {...field}
                      onChange={(e) => handlePayloadChange(e.target.value)}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {webhookUrl && (
              <div>
                <FormLabel>Webhook URL</FormLabel>
                <div className="flex items-center mt-2">
                  <Input value={webhookUrl} readOnly className="mr-2" />
                  <Button onClick={handleCopyWebhookUrl} type="button">
                    Copy
                  </Button>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTypeformDialog;
