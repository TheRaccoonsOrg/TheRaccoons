'use client';
import { SkeletonLoader } from '@/components/hackathon/skeletons/SkeletonLoader';
import Image from 'next/image';

import { useState } from 'react';

const AboutTheEvent = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-center max-w-[58.25rem] gap-y-5 py-5">
      <h2 className="font-raccoons text-purple-br text-4xl md:text-5xl mt-10">About the event</h2>
      <div className="flex flex-col items-center md:flex-row-reverse gap-y-5 md:gap-x-10">
        <div className="max-w-[500px]">
          <p>
            The Raccoons is an innovation and building marathon where participants build their ideas
            or develop solutions for proposed challenges within 48 hours. The event includes
            workshops on various technologies and coding, especially for beginners, to foster
            interest in these skills and promote new ideas and problem-solving among the next
            generations.
          </p>
        </div>
        <div className="relative w-[345px] h-[324px] rounded-md">
          {loading && <SkeletonLoader green={false} />}
          <Image
            src="/images/hackathon2023/raccoon2.webp"
            alt="Raccoon"
            width={406}
            height={382}
            onLoad={() => setLoading(false)}
            className={`transition-opacity duration-500 rounded-md ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutTheEvent;
