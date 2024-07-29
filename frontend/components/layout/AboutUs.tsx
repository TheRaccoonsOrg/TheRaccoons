'use client';
import { InfoCardProps } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { SkeletonLoader } from '../hackathon/skeletons/SkeletonLoader';

const AboutUs = (props: InfoCardProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-x-10 lg:flex-row">
      <div className="w-[21.5625rem] h-[10.0625rem] md:w-[25rem] md:h-[11.5rem]">
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
      <p className="mt-4 w-[21.5625rem] md:w-[37.5rem] lg:w-[31.25rem] ">{props.text}</p>
    </div>
  );
};
export default AboutUs;
