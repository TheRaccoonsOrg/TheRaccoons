'use client';
import { SkeletonLoader } from '@/components/hackathon/skeletons/SkeletonLoader';
import Image from 'next/image';
import { useState } from 'react';

const ImageWithSkeleton = ({
  priority,
  green,
  src,
  alt,
  width,
  height,
  imageStyles,
}: {
  priority?: boolean;
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
        priority={priority}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={` transition-opacity duration-500 rounded-md ${
          loading ? 'opacity-0' : 'opacity-100'
        } ${imageStyles}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
