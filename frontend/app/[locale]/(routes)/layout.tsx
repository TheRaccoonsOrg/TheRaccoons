import Navbar from '@/components/layout/navbar';
import { useTranslations } from 'next-intl';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('NavLinks');

  const navLinksTranslated = [
    { route: t('home'), path: '/' },
    { route: t('events'), path: '/events' },
    { route: t('stories'), path: '/stories' },
  ];
  return (
    <main>
      <Navbar navLinks={navLinksTranslated} />
      {children}
    </main>
  );
};

export default MainLayout;
