'use client';
import { SkeletonLoader } from '@/components/hackathon/skeletons/skeleton-loader';
import Image from 'next/image';
import { useState } from 'react';

const ImageWithSkeleton = ({
  green,
  src,
  alt,
  width,
  height,
  imageStyles,
}: {
  green: boolean;
  src: string;
  alt: string;
  width: number;
  height: number;
  imageStyles?: string;
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading && <SkeletonLoader green={green} />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={` transition-opacity duration-500 rounded-md ${
          loading ? 'opacity-0' : 'opacity-100'
        } ${imageStyles}`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
