import Image from 'next/image';

const VideoPlayer = () => {
  return (
    <div>
      <div className="block md:hidden mt-20">
        <iframe
          width="400"
          height="225"
          src="https://www.youtube.com/embed/4Zol3FpfkU4?si=aGZNLuws-vAc-FiQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>
      <div className="hidden md:block lg:hidden mt-20">
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
          width="728"
          height="409"
          src="https://www.youtube.com/embed/4Zol3FpfkU4?si=aGZNLuws-vAc-FiQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
