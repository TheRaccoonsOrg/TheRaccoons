'use client';
import Image from 'next/image';
import GreenButton from '@/components/green-button';
import { SkeletonLoader } from './skeletons/skeleton-loader';
import { useState } from 'react';

const SeeYouNextYear = ({ buttonHref, imageSrc }: { buttonHref: string; imageSrc: string }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 font-raccoons text-3xl  text-hotgreen md:text-5xl ">
        See You next year!
      </h2>
      <div className="relative w-[345] h-[220px] md:w-[632px] md:h-[421px] rounded-md">
        {loading && <SkeletonLoader green={false} />}
        <Image
          src={imageSrc}
          width={632}
          height={421}
          alt="Photo from the event"
          onLoadingComplete={() => setLoading(false)}
          className={` transition-opacity duration-500 rounded-md ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
      <p className="text-hotgreen my-5">YOU CAN FIND MORE PICTURES FROM THE EVENT BELOW</p>
      <GreenButton
        buttonStyles="min-w-[200px]"
        // buttonHref="https://photos.app.goo.gl/4LfM9CetZzthEywJ6"
        buttonHref={buttonHref}
        buttonText="Photos from event"
      />
    </div>
  );
};

export default SeeYouNextYear;
