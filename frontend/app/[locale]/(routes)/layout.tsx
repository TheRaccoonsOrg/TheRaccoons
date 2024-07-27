import Navbar from '@/components/layout/NavBar';
import { getTranslations } from 'next-intl/server';
import { InterFont } from '@/lib/fonts';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations('NavLinks');

  const navLinksTranslated = [
    { route: t('home'), path: '/' },
    { route: t('events'), path: '/events' },
    { route: t('stories'), path: '/stories' },
  ];
  return (
    <body className={`${InterFont.className} flex min-h-screen flex-col bg-purple-bg text-primary`}>
      <main className="pt-20 bg-purple-bg">
        <Navbar navLinks={navLinksTranslated} />
        {children}
        <Toaster />
      </main>
    </body>
  );
};

export default MainLayout;
