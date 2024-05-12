'use client';
import { SkeletonLoader } from '@/components/hackathon/skeletons/SkeletonLoader';
import Image from 'next/image';
import { useState } from 'react';

const VideoFrameImage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative hidden lg:flex flex-col pt-20 items-center w-full h-full ">
      {loading && <SkeletonLoader green={false} />}

      <Image
        alt="Stories Video"
        width={1958}
        height={1014}
        src={'/images/stories/videoFrame.webp'}
        onLoad={() => setLoading(false)}
        className={`absolute mt-[-90px] w-[900px] h-[544px] transition-opacity duration-500 rounded-md ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {!loading ? (
        <iframe
          className="z-10"
          width="728"
          height="409"
          src="https://www.youtube.com/embed/4Zol3FpfkU4?si=aGZNLuws-vAc-FiQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      ) : null}
    </div>
  );
};

export default VideoFrameImage;
