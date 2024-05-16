'use client';
import ImageWithSkeleton from '@/components/hackathon/skeletons/ImageWithSkeleton';

const HeroImage = ({ pathToImage }: { pathToImage: string }) => {
  return (
    <div
      className="pr-5 md:pr-0 w-[345px] h-[287px] sm:w-[400px] sm:h-[347px]"
      data-testid="image-parent-div">
      <ImageWithSkeleton
        green={false}
        src={pathToImage}
        alt="Stories Header"
        width={994}
        height={864}
      />
    </div>
  );
};
export default HeroImage;
