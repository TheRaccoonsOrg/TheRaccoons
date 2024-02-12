// components/ImageWithSkeleton.js
import Image from 'next/image';
import { useState } from 'react';
import { SkeletonLoader } from './skeleton-loader';

const ImageWithSkeleton = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading && <SkeletonLoader />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-500 rounded-md ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
