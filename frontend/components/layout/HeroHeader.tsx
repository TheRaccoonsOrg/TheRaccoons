'use client';
import { HeroHeaderProps } from '@/types';
import ImageWithSkeleton from '../hackathon/skeletons/ImageWithSkeleton';

const HeroHeader = (props: HeroHeaderProps) => {
  return (
    <header className={`flex flex-col justify-center items-center md:flex-row gap-x-4 `}>
      <div className="w-[345px] sm:w-[400px] md:w-[450px]">
        <p>{props.firstDesc}</p>
        <br />
        <p>{props.secondDesc}</p>
      </div>
      <div className="w-[345px] h-[350px] lg:w-[450px] lg:h-[450px]" data-testid="image-parent-div">
        <ImageWithSkeleton
          green={false}
          src={props.imageSrc}
          alt={props.imageAlt}
          width={800}
          height={800}
        />
      </div>
    </header>
  );
};

export default HeroHeader;
