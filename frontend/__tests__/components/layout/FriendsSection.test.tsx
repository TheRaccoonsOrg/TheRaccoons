/* eslint-disable jest/no-conditional-expect */
'use server';
import '@testing-library/jest-dom';
import FriendsSection from '@/components/layout/FriendsSection';
import { friendsImagePaths } from '@/lib/friends-pics';
import { render, screen } from '@/__tests__/utils/test-wrapper';
import { getNextImagePath } from '@/__tests__/utils/nextImagePath';

describe('FriendsSection', () => {
  it('renders the main image correctly', () => {
    render(<FriendsSection mainImageSrc="/images/en/friends.webp" />);

    const mainImage = screen.getByAltText('Friends / Draugi');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', getNextImagePath('/images/en/friends.webp', 1080));
    expect(mainImage).toHaveAttribute('width', '500');
    expect(mainImage).toHaveAttribute('height', '500');
  });

  it('renders all friend images with correct links', () => {
    render(<FriendsSection mainImageSrc="/images/en/friends.webp" />);

    friendsImagePaths.forEach((item) => {
      if (item.show) {
        const friendLink = screen.getByRole('link', { name: item.alt });
        expect(friendLink).toBeInTheDocument();
        expect(friendLink).toHaveAttribute('href', item.link);

        const friendImage = screen.getByAltText(item.alt);
        expect(friendImage).toBeInTheDocument();
        expect(friendImage).toHaveAttribute('alt', item.alt);
        expect(friendImage).toHaveAttribute('width', item.width.toString());
        expect(friendImage).toHaveAttribute('height', item.height.toString());
      }
    });
  });
});
