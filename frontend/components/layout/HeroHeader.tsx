'use client';
import Image from 'next/image';
import { useState } from 'react';
import { SkeletonLoader } from '../hackathon/skeletons/SkeletonLoader';

interface HeroHeaderProps {
  firstDesc: string;
  secondDesc: string;
  imageSrc: string;
  imageAlt: string;
}
const HeroHeader = (props: HeroHeaderProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <header className={`flex flex-col justify-center items-center lg:flex-row gap-x-4 `}>
      <div className="w-[21.5625rem] sm:w-[25rem] md:w-[37.5rem] lg:w-[28.125rem]">
        <p>{props.firstDesc}</p>
        <br />
        <p>{props.secondDesc}</p>
      </div>
      <div className="w-[345px] h-[350px] lg:w-[450px] lg:h-[450px]">
        {loading && <SkeletonLoader green={false} />}

        <Image
          priority
          src={props.imageSrc}
          alt={props.imageAlt}
          width={800}
          height={800}
          onLoad={() => setLoading(false)}
          className={` transition-opacity duration-500 rounded-md ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </header>
  );
};

export default HeroHeader;
