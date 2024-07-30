import { siteConfig } from '@/config/site';

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
  verification: { google: `xjnyriHFHQJ6VHJ8TD09Qszr-dy6MNQtDPkGTXS2ZXE` },
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
    <html lang={locale} suppressHydrationWarning className="h-full">
      {children}
    </html>
  );
};

export default RootLayout;
