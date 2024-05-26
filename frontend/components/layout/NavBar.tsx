'use client';

import { useState } from 'react';
import { LanguageChoiceDropDownMenu } from '../LanguageChoiceDropdown';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Link } from '@/i18n';
import { UserButton } from '../auth/UserButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface NavbarProps {
  navLinks: {
    route: string;
    path: string;
  }[];
}

export default function Navbar({ navLinks }: NavbarProps) {
  const [navbar, setNavbar] = useState(false);
  const handleClick = () => {
    setNavbar(false);
  };
  const session = useCurrentUser();

  return (
    <header className="relative top-0 flex justify-center">
      <nav className="bg-background fixed left-0 top-0 w-full  gap-x-10 px-5 md:flex md:items-center md:px-20 z-50 border-solid border-b-2 border-purple-br border-opacity-50">
        <div className="flex w-full items-center justify-between py-3 md:block md:py-5 ">
          <Link href="/" onClick={handleClick}>
            <Image
              priority
              src="/images/logo.webp"
              alt="logo"
              width={428}
              height={78}
              className="w-auto h-[2rem]"
            />
          </Link>
          <div className="flex  gap-x-2 md:hidden">
            <div data-testid="language-dropdown">
              {session && <UserButton />}
              <LanguageChoiceDropDownMenu />
            </div>

            <button
              className="text-primary focus:border-primary rounded-md p-2 outline-none focus:border"
              aria-label="Hamburger Menu"
              onClick={() => setNavbar(!navbar)}>
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`absolute left-0 right-0 z-10 m-auto justify-self-center rounded-md border bg-background p-4 md:static md:flex md:border-none md:p-0 ${
            navbar ? 'block' : 'hidden'
          }`}
          style={{ width: '100%', maxWidth: '16rem' }}
          data-testid="hamburger-menu">
          <ul className="flex flex-col items-center space-y-4 text-primary  md:flex-row md:space-y-0">
            {navLinks.map((link) => (
              <li key={link.route}>
                <Button variant="ghost" className="w-full text-lg" asChild>
                  <Link href={link.path} onClick={handleClick}>
                    {link.route}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex flex-row items-center space-x-2 ">
          {session && <p className="whitespace-nowrap">{session?.name}</p>}
          {session && <UserButton />}
          <LanguageChoiceDropDownMenu />
        </div>
      </nav>
    </header>
  );
}
