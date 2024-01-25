import GreenButton from '@/components/green-button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const VideoPlayer = () => {
  const t = useTranslations('Stories.videoPlayer');
  return (
    <div>
      <div className="flex flex-col  md:hidden mt-20 items-center">
        <iframe
          width="400"
          height="225"
          src="https://www.youtube.com/embed/4Zol3FpfkU4?si=aGZNLuws-vAc-FiQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>
      <div className="hidden flex-col  md:flex lg:hidden mt-20 items-center">
        <iframe
          width="700"
          height="393"
          src="https://www.youtube.com/embed/4Zol3FpfkU4?si=aGZNLuws-vAc-FiQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>
      <div className="hidden lg:flex flex-col mt-40 items-center">
        <Image
          className=" absolute w-[1050px] mt-[-90px]   "
          alt="Stories Video"
          width={1958}
          height={1014}
          src={'/images/stories/videoFrame.webp'}
        />
        <iframe
          className="z-40"
          width="728"
          height="409"
          src="https://www.youtube.com/embed/4Zol3FpfkU4?si=aGZNLuws-vAc-FiQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>
      <div className="mt-8 lg:mt-16 flex flex-col items-center gap-y-5 mx-10">
        <p className="text-hotgreen text-sm">{t('text')}</p>
        <GreenButton buttonText={t('button')} buttonHref="https://youtu.be/4Zol3FpfkU4" />
      </div>
    </div>
  );
};

export default VideoPlayer;
