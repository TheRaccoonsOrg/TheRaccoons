import { EventCardProps } from '@/types';

export const eventsList: EventCardProps[] = [
  {
    title: 'hackathon2023-title',
    buttonText: 'hackathon2023',
    buttonLink: '/events/hackathon2023',
    cardImage: '/images/hackathon2023/hackathon2023.webp',
    show: true,
  },
  {
    title: 'hackathon2022-title',
    buttonText: 'hackathon2022',
    buttonLink: '/events/hackathon2023',
    show: false,
  },
  {
    title: 'hackathon2023-old-title',
    buttonText: 'hackathon2023-old',
    buttonLink: '/events/hackathon2023-OLD',
    show: false,
  },
  {
    title: 'code-camp-4-title',
    buttonText: 'code-camp-4',
    buttonLink: '/events/code-camp-4',
    show: true,
  },
  {
    title: 'code-camp-3-title',
    buttonText: 'code-camp-3',
    buttonLink: '/events/code-camp-3',
    show: true,
  },
];
