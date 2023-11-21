import { SiteConfig, ContactConfig } from '@/types';

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

const baseUrl = 'https://theraccoons.org';

export const siteConfig: SiteConfig = {
  name: 'The Raccoons',
  author: 'Mihails Danilovs',
  description:
    'The Raccoons ir studentu kopiena, kas piesaista jauniešus, kuri vēlas pilnveidoties, nodrošinot viņiem vidi, kur pētīt, mācīties, veidot un radīt.',
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Radix UI',
    'shadcn/ui',
    'Landing Page',
    'Template',
    'Starter',
  ],
  url: {
    base: baseUrl,
    author: 'github.com/mihaildanilov',
  },
};

export const contactConfig: ContactConfig = {
  email: 'hello@theraccoons.org',
};
