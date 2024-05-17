/* eslint-disable @next/next/no-img-element */
// __tests__/HeaderImage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-wrapper';
import '@testing-library/jest-dom';
import HeaderImage from '@/components/hackathon/header/HeaderImage';
import { CombinedImageProps } from '@/types';

// Mock next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} data-testid="next-image" />
  ),
}));

const props: CombinedImageProps[] = [
  {
    imageStyles: 'hidden  md:block md:w-[700px] lg:w-[971px]',
    src: '/images/raccoons_apply.webp',
    alt: 'Hackathon2023',
    imageWidth: 971,
    imageHeight: 492,
    isPriority: true,
    date: '20.10 - 22.10.2023.',
    place: 'Riga, Latvia',
  },
  {
    imageStyles: 'block w-full md:hidden',
    src: '/images/raccoons_apply-sm.webp',
    alt: 'Hackathon2023',
    imageWidth: 560,
    imageHeight: 436,
    isPriority: true,
    date: '20.10 - 22.10.2023.',
    place: 'Riga, Latvia',
  },
];

describe('HeaderImage', () => {
  it('renders CombineImage components correctly', () => {
    render(<HeaderImage props={props} />);

    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(2);

    expect(images[0]).toHaveAttribute('src', props[0].src);
    expect(images[0]).toHaveAttribute('alt', props[0].alt);
    expect(images[1]).toHaveAttribute('src', props[1].src);
    expect(images[1]).toHaveAttribute('alt', props[1].alt);
  });

  it('renders SkeletonLoader while images are loading', () => {
    render(<HeaderImage props={props} />);

    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoaders).toHaveLength(2);
  });

  it('hides SkeletonLoader after image has loaded', () => {
    render(<HeaderImage props={props} />);
    const images = screen.getAllByTestId('next-image');

    fireEvent.load(images[0]);
    fireEvent.load(images[1]);

    const skeletonLoaders = screen.queryAllByTestId('skeleton-loader');
    expect(skeletonLoaders).toHaveLength(0);
  });

  it('displays date and place after image has loaded', () => {
    render(<HeaderImage props={props} />);
    const images = screen.getAllByTestId('next-image');

    fireEvent.load(images[0]);
    fireEvent.load(images[1]);

    const dateElements = screen.getAllByText(/20\.10 - 22\.10\.2023\./);
    expect(dateElements).toHaveLength(2);

    const placeElements = screen.getAllByText('Riga, Latvia');
    expect(placeElements).toHaveLength(2);

    dateElements.forEach((dateElement) => {
      expect(dateElement).toBeInTheDocument();
    });

    placeElements.forEach((placeElement) => {
      expect(placeElement).toBeInTheDocument();
    });
  });
});
