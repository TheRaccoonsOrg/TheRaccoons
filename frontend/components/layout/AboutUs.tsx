'use client';
import { InfoCardProps } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { SkeletonLoader } from '../hackathon/skeletons/SkeletonLoader';

const AboutUs = (props: InfoCardProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-x-10 md:flex-row">
      <div className="w-[345px] h-[161px] md:w-[400px] md:h-[184px]">
        {loading && <SkeletonLoader green={false} />}
        <Image
          src={props.imagePath}
          alt="Image"
          width={1000}
          height={1000}
          onLoad={() => setLoading(false)}
          className={` transition-opacity duration-500 rounded-md ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
      <p className="mt-4 w-[345px] md:w-[500px] ">{props.text}</p>
    </div>
  );
};
export default AboutUs;
