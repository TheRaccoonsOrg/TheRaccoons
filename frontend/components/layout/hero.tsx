'use client';
import Image from 'next/image';
import { useState } from 'react';
import { SkeletonLoader } from '../hackathon/skeletons/skeleton-loader';

interface HeroHeaderProps {
  firstDesc: string;
  secondDesc: string;
  imageSrc: string;
  imageAlt: string;
}
const HeroHeader = (props: HeroHeaderProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <header className={`flex flex-col justify-center items-center md:flex-row gap-x-4 `}>
      <div className="w-[345px] sm:w-[400px] md:w-[450px]">
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
          onLoadingComplete={() => setLoading(false)}
          className={` transition-opacity duration-500 rounded-md ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </header>
  );
};

export default HeroHeader;
