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
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n';
import { LoginFormProps } from '@/types';

export const LoginForm = (props: LoginFormProps) => {
  const { translations } = props;
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const LoginSchema = z.object({
    email: z.string().email({
      message: translations.validation.email,
    }),
    password: z.string().min(1, {
      message: translations.validation.password,
    }),

    code: z.optional(z.string()),
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError('An error occurred. Please try again later.'));
    });
  };

  return (
    <div>
      <CardWrapper
        headerLabel={translations.text.title}
        backButtonLabel={translations.text.registerLink}
        backButtonHref="/auth/register">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {showTwoFactor ? (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2FA</FormLabel>
                      <Input
                        {...field}
                        className="bg-white focus:border-white focus-visible:ring-white"
                        placeholder="123456"
                        type="number"
                        disabled={isPending}
                      />
                      <FormControl />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <>
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
                        <FormLabel>Password</FormLabel>
                        <Input
                          {...field}
                          className="bg-white focus:border-white focus-visible:ring-white"
                          placeholder="********"
                          type="password"
                          disabled={isPending}
                        />
                        <FormControl />
                        <FormMessage />
                        <div className="flex justify-end">
                          <Button size="sm" className="text-backgorund p-0" variant="link" asChild>
                            <Link href="/auth/reset">{translations.text.forgotPasswordLink}</Link>
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button
              variant="outline"
              type="submit"
              size="lg"
              className="w-full bg-white"
              disabled={isPending}>
              {showTwoFactor ? 'Confirm' : translations.text.loginButton}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
