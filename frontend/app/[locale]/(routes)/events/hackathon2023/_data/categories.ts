interface CategoriesProps {
  categorieName: string;
  position: {
    title: string;
    projectName: string[];
    description: string | null;
  }[];
}
export const challengeCategories: CategoriesProps[] = [
  {
    categorieName: 'Deep Science',
    position: [
      {
        title: 'Winners (€2000 cash):',
        projectName: ['SafeSight'],
        description:
          'AR goggles that provide real-time safety feedback on construction sites by highlighting dangerous objects.',
      },
      {
        title: '2nd-place (€500 cash):',
        projectName: ['LATSAT'],
        description:
          'An independent nano-satellite network which can provide accurate live information using triangulation.',
      },
      {
        title: 'Additional prizes:',
        projectName: ['PowerPulse', 'EmpowerAI', 'inLoco', 'Deep metaphysical reset'],
        description: null,
      },
    ],
  },
  {
    categorieName: 'Your challenge',
    position: [
      {
        title: 'Winners (gifts from Raccoons): ',
        projectName: ['School Schedule Generator'],
        description:
          'Tool to create schedules for educational organizations much faster and easier by taking into account the preferences of students and teachers.',
      },
      {
        title: 'Motivational prize:',
        projectName: ['Theodor: the password keeper'],
        description:
          'Password manager tool, designed for elderly people for intuitive and secure password storage.',
      },
    ],
  },
  {
    categorieName: 'Gamedev',
    position: [
      {
        title: 'Winners (€500 cash + board games):',
        projectName: ['Mental Chess'],
        description:
          'Game - a version of chess to raise awareness on many ways mental illnesses may manifest and to help people recognize the problems they are facing.',
      },
    ],
  },
  {
    categorieName: 'Sustainability and data',
    position: [
      {
        title: 'Winners (TechChill tickets + audio equipment):',
        projectName: ['ForestMon'],
        description:
          'Tool to monitor forestry and prevent illegal tree-cutting in real-time using the power of satellite maps.',
      },
    ],
  },
];
