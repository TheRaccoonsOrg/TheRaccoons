import { notFound } from "next/navigation";
import "../globals.css";
import { siteConfig } from "@/config/site";
import { NextIntlClientProvider } from "next-intl";
import { InterFont } from "@/lib/fonts";

const locales = ["en", "lv"];

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
    icon: "/icon.png",
  },
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale}>
        <body
          className={`${InterFont.className} flex min-h-screen flex-col bg-background text-primary`}
        >
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
