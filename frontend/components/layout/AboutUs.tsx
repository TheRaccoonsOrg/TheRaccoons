'use client';
import { InfoCardProps } from '@/types';
import ImageWithSkeleton from '../hackathon/skeletons/ImageWithSkeleton';

const AboutUs = (props: InfoCardProps) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-x-10 md:flex-row">
      <div className="w-[345px] h-[161px] md:w-[400px] md:h-[184px]" data-testid="image-parent-div">
        <ImageWithSkeleton
          green={false}
          src={props.imagePath}
          alt="Image"
          width={1000}
          height={1000}
        />
      </div>
      <p className="mt-4 w-[345px] md:w-[500px] ">{props.text}</p>
    </div>
  );
};
export default AboutUs;
