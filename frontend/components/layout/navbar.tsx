'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { LanguageChoiceDropDownMenu } from '../language-choice-dropdown';

import { Button } from '../ui/button';
import Link from 'next/link';
interface NavbarProps {
  navLinks: {
    route: string;
    path: string;
  }[];
}

export default function Navbar({ navLinks }: NavbarProps) {
  const [navbar, setNavbar] = useState(false);
  const handleClick = async () => {
    setNavbar(false);
  };

  return (
    <header className="mb-20 flex justify-center ">
      <nav className="bg-background fixed left-0 top-0 w-full  gap-x-10 px-5 md:flex md:items-center md:px-20">
        <div className="flex w-full items-center justify-between py-3 md:block md:py-5">
          <Link href="/" onClick={handleClick}>
            <h1 className="text-2xl font-bold duration-200">{siteConfig.name}</h1>
          </Link>
          <div className="flex  gap-x-2 md:hidden">
            <LanguageChoiceDropDownMenu />

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
          style={{ width: '100%', maxWidth: '16rem' }}>
          <ul className="flex flex-col items-center space-y-4 text-primary  md:flex-row md:space-y-0">
            {navLinks.map((link) => (
              <li key={link.route}>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={link.path} onClick={handleClick}>
                    {link.route}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block">
          <LanguageChoiceDropDownMenu />
        </div>
      </nav>
    </header>
  );
}
