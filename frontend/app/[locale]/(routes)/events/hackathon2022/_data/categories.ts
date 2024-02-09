import { CategoriesProps } from '@/types';

export const challengeCategories: CategoriesProps[] = [
  {
    categorieName: 'SUSTAINABILITY',
    position: [
      {
        title: 'MAIN PRIZE (shared between):',
        projectName: ['USAVE'],
        description:
          'Application for adults to follow their expenses and see the mean values of product in Latvia. For younger audience it would give the opportunity to see the ways how to learn something and get money about that as well, and follow their expenses. ',
      },
      {
        title: null,
        projectName: ['EcoGo'],
        description:
          'Inspired by information about the cost of transporting products from distant countries and emissions. The application encourages people to use local products more.',
      },
    ],
  },
  {
    categorieName: 'DEEP SCIENCE',
    position: [
      {
        title: 'MAIN PRIZE:',
        projectName: ['Water desalination device'],
        description:
          'A microfluidic/microelectronic device with a microfluidic chip that desalinates and filters water. The device aims to help solve access to safe drinking water.',
      },
      {
        title: 'Additional prizes:',
        projectName: ['Ash Gaum'],
        description: 'Giving second life to single use vapes. ',
      },
      {
        title: null,
        projectName: ['Phosys'],
        description: 'An interactive web-based photonics simulator',
      },
    ],
  },
  {
    categorieName: 'DATA & HEALTHCARE',
    position: [
      {
        title: 'MAIN PRIZE: ',
        projectName: ['BioCode'],
        description:
          'An application that helps to take care after yourself, view your past medical records, arrange appointments, predict heart problems.',
      },
    ],
  },
  {
    categorieName: 'GAME DESIGN',
    position: [
      {
        title: 'MAIN PRIZE: ',
        projectName: ['Property of RTU 1.6.2'],
        description:
          'A game where you control a boat going down a river. In front of you there are lots of rocks, garbage and other dangerous things. Your task is to avoid all the obstacles while trying to achieve the highest score.',
      },
    ],
  },
];
