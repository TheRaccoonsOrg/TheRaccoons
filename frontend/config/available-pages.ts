import { EventCardProps } from '@/types';

export const hackathonCards: EventCardProps[] = [
  {
    typeOfEvent: 'hackathon',
    cardTitle: 'hackathon2023-title',
    buttonText: 'hackathon2023',
    buttonLink: '/events/hackathons/hackathon2023',
    cardImage: '/images/hackathon2023/hackathon2023.webp',
    lastModified: '2024-03-11',
    show: true,
    date: new Date('2023-10-20T16:00:00'),
  },
  {
    typeOfEvent: 'hackathon',
    cardTitle: 'hackathon2024-title',
    buttonText: 'hackathon2024',
    buttonLink: '/events/hackathons/hackathon2024',
    cardImage: '/images/hackathon2023/hackathon2023.webp',
    lastModified: '2024-07-25',
    show: true,
    date: new Date('2024-10-25T16:00:00'),
  },
  {
    typeOfEvent: 'hackathon',
    cardTitle: 'hackathon2022-title',
    buttonText: 'hackathon2022',
    buttonLink: '/events/hackathons/hackathon2022',
    cardImage: '/images/hackathon2022/hackathon2022.webp',
    lastModified: '2024-03-11',
    show: true,
    date: new Date('2022-11-25T16:00:00'),
  },
];
