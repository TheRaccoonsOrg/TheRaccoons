import { SiteConfig, ContactConfig } from '@/types';

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

export const baseUrl = 'https://theraccoons.org';

export const siteConfig: SiteConfig = {
  name: 'The Raccoons',
  author: 'Mihails Danilovs',
  description:
    'The Raccoons ir studentu kopiena, kas piesaista jauniešus, kuri vēlas pilnveidoties, nodrošinot viņiem vidi, kur pētīt, mācīties, veidot un radīt.',
  keywords: [
    'Raccoons',
    'The Raccoons',
    'The Raccoons Community',
    'The Raccoons Student Community',
    'The Raccoons Technology',
    'The Raccoons STEM',
    'The Raccoons Hackathon',
    'The Raccoons Code Camp',
    'Student STEM Community',
    'Technology Learning Platform',
    'Hackathon Events',
    'Technology Events',
    'STEM Events',
    'Technology Workshops',
    'Programming Workshops',
    'Technology Inspiration Stories',
    'STEM Education for Youth',
    'Code Camp Activities',
    'Online STEM Resources',
    'Technology Research Development',
    'Engineering and Science Learning',
  ],
  url: {
    base: baseUrl,
    author: 'https://github.com/mihaildanilov',
  },
};

export const contactConfig: ContactConfig = {
  email: 'hello@theraccoons.org',
};
