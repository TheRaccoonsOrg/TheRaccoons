'use client';
import { localeNames, locales } from '@/i18n';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { BiWorld } from 'react-icons/bi';

export function LanguageChoiceDropDownMenu() {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();

  const switchLocale = (locale: string) => {
    router.push(pathName, { locale: locale });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-0">
          <BiWorld size={20} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={locale}>
          {locales.map((loc) => (
            <DropdownMenuRadioItem key={loc} value={loc} onSelect={() => switchLocale(loc)}>
              {localeNames[loc]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
