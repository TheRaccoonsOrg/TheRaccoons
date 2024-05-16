import Navbar from '@/components/layout/NavBar';
import { getTranslations } from 'next-intl/server';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations('NavLinks');

  const navLinksTranslated = [
    { route: t('home'), path: '/' },
    { route: t('events'), path: '/events' },
    { route: t('stories'), path: '/stories' },
  ];
  return (
    <main className="min-h-screen pt-20">
      <Navbar navLinks={navLinksTranslated} />
      {children}
    </main>
  );
};

export default MainLayout;
