'use client';
import { CombinedImageProps } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { SkeletonLoader } from '../skeletons/SkeletonLoader';

const CombineImage = (props: CombinedImageProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={props.imageStyles + ' relative w-full h-full'}>
      {loading && <SkeletonLoader green={false} />}
      <Image
        src={props.src}
        alt={props.alt}
        width={props.imageWidth}
        height={props.imageHeight}
        onLoad={() => setLoading(false)}
        className={` transition-opacity duration-500 rounded-md ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={props.isPriority}
      />
      {!loading && (
        <div
          className={`absolute left-[5.7em] md:left-[8.7em] lg:left-[12em] bottom-[0.6em] md:bottom-[0.7em] lg:bottom-[0.9em]transition-opacity duration-500 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}>
          <p className="text-sm md:text-md lg:text-lg">{props.date}</p>
          <p className="text-sm md:text-md lg:text-lg">{props.place}</p>
        </div>
      )}
    </div>
  );
};
const HeaderImage = ({ props }: { props: CombinedImageProps[] }) => {
  return (
    <div className="h-[269px] w-[345px] md:h-[355px] md:w-[700px] lg:h-[492px] lg:w-[971px]">
      <CombineImage
        imageStyles={props[0].imageStyles}
        src={props[0].src}
        alt={props[0].alt}
        imageWidth={props[0].imageWidth}
        imageHeight={props[0].imageHeight}
        isPriority={props[0].isPriority}
        date={props[0].date}
        place={props[0].place}
      />
      <CombineImage
        imageStyles={props[1].imageStyles}
        src={props[1].src}
        alt={props[1].alt}
        imageWidth={props[1].imageWidth}
        imageHeight={props[1].imageHeight}
        isPriority={props[1].isPriority}
        date={props[1].date}
        place={props[1].place}
      />
    </div>
  );
};

export default HeaderImage;
