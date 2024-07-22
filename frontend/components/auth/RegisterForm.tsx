'use client';
import { CardWrapper } from './CardWrapper';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../FormError';
import { FormSuccess } from '../FormSuccess';
import { useState, useTransition } from 'react';
import { register } from '@/actions/register';
import { RegisterFormProps } from '@/types';

export const RegisterForm = (props: RegisterFormProps) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const { translations } = props;
  const RegisterSchema = z.object({
    name: z.string().min(1, {
      message: translations.validation.name,
    }),
    email: z
      .string()
      .min(1, {
        message: translations.validation.email,
      })
      .email({
        message: translations.validation.emailValid,
      }),
    password: z.string().min(6, {
      message: translations.validation.password,
    }),
  });
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div>
      <CardWrapper
        headerLabel={translations.text.title}
        backButtonLabel={translations.text.loginLink}
        backButtonHref="/auth/login">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.text.name}</FormLabel>
                    <Input
                      {...field}
                      className="bg-white focus:border-white focus-visible:ring-white"
                      placeholder="John Doe"
                      disabled={isPending}
                    />
                    <FormControl />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.text.email}</FormLabel>
                    <Input
                      {...field}
                      className="bg-white focus:border-white focus-visible:ring-white"
                      placeholder="john.doe@example.com"
                      type="email"
                      disabled={isPending}
                    />
                    <FormControl />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.text.password}</FormLabel>
                    <Input
                      {...field}
                      className="bg-white focus:border-white focus-visible:ring-white"
                      placeholder="********"
                      type="password"
                      disabled={isPending}
                    />
                    <FormControl />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              variant="outline"
              type="submit"
              size="lg"
              className="w-full bg-white"
              disabled={isPending}>
              {translations.text.registerButton}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
