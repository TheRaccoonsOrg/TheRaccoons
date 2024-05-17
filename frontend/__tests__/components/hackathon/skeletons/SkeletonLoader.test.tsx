import { render, screen } from '@/__tests__/utils/test-wrapper';
import { SkeletonLoader } from '@/components/hackathon/skeletons/SkeletonLoader';

describe('SkeletonLoader', () => {
  test('renders with green background when green prop is true', () => {
    render(<SkeletonLoader green={true} />);
    const skeletonLoader = screen.getByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveClass('bg-hotgreen');
    expect(skeletonLoader).toHaveClass('animate-pulse');
    expect(skeletonLoader).toHaveClass('bg-opacity-40');
    expect(skeletonLoader).toHaveClass('rounded-md');
    expect(skeletonLoader).toHaveClass('h-full');
    expect(skeletonLoader).toHaveClass('w-full');
  });

  test('renders with purple background when green prop is false', () => {
    render(<SkeletonLoader green={false} />);
    const skeletonLoader = screen.getByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveClass('bg-purple-br');
    expect(skeletonLoader).toHaveClass('animate-pulse');
    expect(skeletonLoader).toHaveClass('bg-opacity-40');
    expect(skeletonLoader).toHaveClass('rounded-md');
    expect(skeletonLoader).toHaveClass('h-full');
    expect(skeletonLoader).toHaveClass('w-full');
  });
});
