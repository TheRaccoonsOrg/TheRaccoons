'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { logout } from '@/actions/logout';
import { UserIcon } from 'lucide-react';

import { useEffect, useState } from 'react';
import { getInitials } from '@/lib/getInitials';

import { ThemeToggle } from '@/components/ThemeToggle';
import { getSession } from 'next-auth/react';

import { ExtendedUser } from '@/next-auth';
import { Link, usePathname } from '@/i18n';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/settings', label: 'Settings' },
];

const AdminNavigation = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<ExtendedUser | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      setUser(session?.user as ExtendedUser);
    };
    getUser();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="border-accent border-b-2">
      <div className="flex h-16 items-center px-4">
        <nav className="mx-6 hidden items-center space-x-4 md:flex lg:space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary',
              )}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild className="focus-visible:ring-transparent">
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name ? getInitials(user?.name) : <UserIcon />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-accent" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <div className="md:hidden">
                <DropdownMenuSeparator />
                {links.map((link) => (
                  <DropdownMenuItem key={link.href} onClick={handleItemClick}>
                    <Link href={link.href} className="w-full">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleItemClick}>
                  <Link href="/admin/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleItemClick}>
                  <Link href="/" className="w-full">
                    Back to home page
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await logout();
                  handleItemClick();
                }}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;
