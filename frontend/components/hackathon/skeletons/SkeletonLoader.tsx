export const SkeletonLoader = ({ green }: { green: boolean }) => (
  <div
    className={
      (green ? 'bg-hotgreen ' : 'bg-purple-br ') +
      'animate-pulse  bg-opacity-40 rounded-md h-full w-full'
    }
    data-testid="skeleton-loader"></div>
);
