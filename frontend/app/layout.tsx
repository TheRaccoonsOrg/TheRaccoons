import { InterFont } from '@/lib/fonts';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata = {
  metadataBase: new URL(siteConfig.url.base),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,

  creator: siteConfig.author,
  icons: {
    icon: '/icon.png',
  },
};

const locales = ['en', 'lv'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  return (
    <html lang={locale}>
      <body
        className={`${InterFont.className} flex min-h-screen flex-col bg-background  text-primary`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
