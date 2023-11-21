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
import LinkWithRef from 'next-intl/link';
export function LanguageChoiceDropDownMenu() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-0">
          <BiWorld size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup>
          <LinkWithRef href="/" locale="lv">
            <DropdownMenuRadioItem value="top">LV</DropdownMenuRadioItem>
          </LinkWithRef>
          <LinkWithRef href="/" locale="en">
            <DropdownMenuRadioItem value="bottom">EN</DropdownMenuRadioItem>
          </LinkWithRef>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
