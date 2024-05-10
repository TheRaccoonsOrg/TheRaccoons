'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { subscribeToNewsletter } from '@/actions/subscribeToNewsletter';

type NewsletterFormProps = {
  headerTitle: string;
  description: string;
  placeholderTitle: string;
  additionalInfo: string;
  buttonText: string;
  errorMessage: string;
  listUUID: string;
};

const NewsletterForm = (props: NewsletterFormProps) => {
  const formSchema = z.object({
    email: z.string().email(props.errorMessage),
    uuid_list: z.array(z.string()),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      uuid_list: [props.listUUID],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    subscribeToNewsletter(values);
  };
  return (
    <div className="my-4 flex flex-col items-center justify-center gap-y-4">
      <h2 className="text-3xl font-bold">{props.headerTitle}</h2>
      <p className="text-white">{props.description}</p>
      <div className="w-[400px] mb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col items-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={props.placeholderTitle} {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="text-center">{props.additionalInfo}</FormDescription>
                </FormItem>
              )}
            />
            <Button
              className="bg-hotgreen rounded-full text-background font-bold min-w-[150px]"
              type="submit">
              {props.buttonText}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewsletterForm;
