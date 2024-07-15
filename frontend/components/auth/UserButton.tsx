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
import { Link } from '@/i18n';
import { ExtendedUser } from '@/next-auth';
import { logout } from '@/actions/logout';

export const UserButton = ({ user }: { user: ExtendedUser }) => {
  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

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
        <DropdownMenuItem className="h-full w-full cursor-pointer" asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        {user.role === 'ADMIN' && (
          <>
            <DropdownMenuItem className="h-full w-full cursor-pointer" asChild>
              <Link href="/admin/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="h-full w-full cursor-pointer" asChild>
              <Link href="/admin/settings">Settings</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer h-full w-full">
          <RxExit className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
