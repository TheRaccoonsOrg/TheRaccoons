import { appendExtractedData, GetEventList, findWorkshopBySlug } from '@/actions/events';
import { hackathonCards } from '@/config/available-pages';
import { workshopsData } from '@/app/[locale]/(routes)/events/workshops/_data/workshopsData';
import { EventCardProps, EventTypes } from '@/types';

const mockHackathonCards: EventCardProps[] = [
  {
    typeOfEvent: 'hackathon',
    cardTitle: 'Hackathon 1',
    buttonText: 'Register',
    buttonLink: '/register/hackathon-1',
    cardImage: '/images/hackathon-1.jpg',
    lastModified: '2023-04-01T12:00:00Z',
    show: true,
    date: new Date('2022-07-01T12:00:00Z'),
  },
  {
    typeOfEvent: 'hackathon',
    cardTitle: 'Hackathon 2',
    buttonText: 'Register',
    buttonLink: '/register/hackathon-2',
    cardImage: '/images/hackathon-2.jpg',
    lastModified: '2022-04-01T12:00:00Z',
    show: true,
    date: new Date('2022-07-02T12:00:00Z'),
  },
];

beforeEach(() => {
  hackathonCards.length = 0;
  hackathonCards.push(...mockHackathonCards);
});

describe('appendExtractedData', () => {
  it('appends data correctly', () => {
    const result = appendExtractedData(workshopsData);
    expect(result).toHaveLength(mockHackathonCards.length + workshopsData.length);

    workshopsData.forEach((item, index) => {
      expect(result[mockHackathonCards.length + index]).toMatchObject({
        typeOfEvent: item.typeOfEvent,
        cardTitle: item.cardTitle,
        buttonText: item.buttonText,
        buttonLink: item.buttonLink,
        cardImage: item.cardImage,
        lastModified: item.lastModified,
        show: item.show,
        date: item.date,
      });
    });
  });

  it('handles empty input array correctly', () => {
    const result = appendExtractedData([]);
    expect(result).toHaveLength(mockHackathonCards.length);
  });
});

describe('GetEventList', () => {
  beforeEach(() => {
    appendExtractedData(workshopsData);
  });

  it('returns sorted and filtered hackathon events', () => {
    const result = GetEventList('hackathon');
    expect(result).toHaveLength(2);
    expect(result[0].cardTitle).toBe('Hackathon 1');
    expect(result[1].cardTitle).toBe('Hackathon 2');
  });

  it('returns sorted and filtered workshop events', () => {
    const result = GetEventList('workshop');
    expect(result).toHaveLength(workshopsData.length);
    expect(result[0].cardTitle).toBe('code-camp-7-title');
    expect(result[1].cardTitle).toBe('code-camp-6-title');
    expect(result[2].cardTitle).toBe('code-camp-5-title');
  });

  it('returns all sorted events when no type is specified', () => {
    const result = GetEventList('' as EventTypes);
    expect(result).toHaveLength(mockHackathonCards.length + workshopsData.length);
    expect(result[0].cardTitle).toBe('Hackathon 1');
    expect(result[1].cardTitle).toBe('Hackathon 2');
    expect(result[2].cardTitle).toBe('code-camp-7-title');
    expect(result[3].cardTitle).toBe('code-camp-6-title');
    expect(result[4].cardTitle).toBe('code-camp-5-title');
  });

  it('returns an empty array for an invalid event type', () => {
    const result = GetEventList('invalid-type' as EventTypes);
    expect(result).toHaveLength(mockHackathonCards.length + workshopsData.length);
  });

  describe('findWorkshopBySlug', () => {
    it('finds workshop by slug correctly', () => {
      const result = findWorkshopBySlug('code-camp-7');
      expect(result).toBeDefined();
      expect(result?.cardTitle).toBe('code-camp-7-title');
    });

    it('returns undefined for non-existent slug', () => {
      const result = findWorkshopBySlug('non-existent-slug');
      expect(result).toBeUndefined();
    });

    it('returns undefined for empty slug', () => {
      const result = findWorkshopBySlug('');
      expect(result).toBeUndefined();
    });
  });
});
