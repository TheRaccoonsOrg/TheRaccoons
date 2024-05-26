'use client';

import { FaUser } from 'react-icons/fa';
import { RxExit } from 'react-icons/rx';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { logout } from '@/actions/logout';
import { Link } from '@/i18n';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-gray-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem className="w-full cursor-pointer" asChild>
          <Link href="/admin/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full cursor-pointer">
          <Link href="/admin/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
          <RxExit className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
