/* eslint-disable jest/no-conditional-expect */

import { render, screen } from '@/__tests__/utils/test-wrapper';
import '@testing-library/jest-dom';
import Categories from '@/components/hackathon/Categories';
import { challengeCategories } from '@/app/[locale]/(routes)/events/hackathons/hackathon2023/_data/categories';

describe('Categories', () => {
  test('renders categories correctly', () => {
    render(<Categories props={challengeCategories} />);

    challengeCategories.forEach((category) => {
      const categoryName = screen.getByText(category.categorieName);
      expect(categoryName).toBeInTheDocument();

      category.position.forEach((position) => {
        if (position.title) {
          const positionTitles = screen.queryAllByText((content, element) => {
            const hasText = (text: string) => element!.textContent!.includes(text);
            const isPositionTitle = hasText(position.title || '');
            return isPositionTitle;
          });
          expect(positionTitles.length).toBeGreaterThan(0);
        }

        position.projectName.forEach(() => {
          const projectNames = screen.queryAllByText((content, element) => {
            const hasText = (text: string) => element!.textContent!.includes(text);
            const isPowerPulse = hasText('PowerPulse');
            return isPowerPulse;
          });
          expect(projectNames.length).toBeGreaterThan(0);
        });

        if (position.description) {
          const description = screen.getByText(position.description);
          expect(description).toBeInTheDocument();
        } else {
          const description = position.description
            ? screen.queryByText(position.description)
            : null;
          expect(description).not.toBeInTheDocument();
        }
      });
    });
  });
});
