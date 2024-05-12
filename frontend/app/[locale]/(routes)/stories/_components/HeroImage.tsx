'use client';
import { SkeletonLoader } from '@/components/hackathon/skeletons/SkeletonLoader';
import Image from 'next/image';
import { useState } from 'react';

const HeroImage = ({ pathToImage }: { pathToImage: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="pr-5 md:pr-0 w-[345px] h-[287px] sm:w-[400px] sm:h-[347px] ">
      {loading && <SkeletonLoader green={false} />}
      <Image
        alt="Stories Header"
        width={994}
        height={864}
        src={pathToImage}
        onLoadingComplete={() => setLoading(false)}
        className={` transition-opacity duration-500 rounded-md ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
export default HeroImage;
