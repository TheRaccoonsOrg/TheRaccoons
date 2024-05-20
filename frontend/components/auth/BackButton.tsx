'use client';

import { Link } from '@/i18n';
import { Button } from '../ui/button';

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="text-background w-full hover:underline" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
