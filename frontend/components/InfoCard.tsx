'use client';
import { InfoCardProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import GreenButton from './green-button';
import { useState } from 'react';
import { SkeletonLoader } from './hackathon/skeletons/skeleton-loader';

const InfoCard = (props: InfoCardProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-[350px] md:w-[300px] flex flex-col justify-center items-start mb-3">
      <div className="w-full h-[136px]">
        {loading && <SkeletonLoader green={false} />}
        <Image
          src={props.imagePath}
          alt={props.alt}
          width={props.width}
          height={props.height}
          onLoadingComplete={() => setLoading(false)}
          className={` transition-opacity duration-500 rounded-md ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
      <p className="text-lg my-5">{props.text}</p>
      <div className="mx-auto md:mx-0 flex flex-col justify-center items-center md:items-start">
        {props.buttonText && props.buttonHref ? (
          <GreenButton buttonText={props.buttonText} buttonHref={props.buttonHref} />
        ) : null}
        {props.linkText && props.linkHref ? (
          <Link href={props.linkHref} className="text-[#36f8a7] hover:underline mt-2">
            {props.linkText}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default InfoCard;
