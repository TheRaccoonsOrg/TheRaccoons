'use client';
import GreenButton from '@/components/GreenButton';
import ImageWithSkeleton from './skeletons/ImageWithSkeleton';

const SeeYouNextYear = ({ buttonHref, imageSrc }: { buttonHref: string; imageSrc: string }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 font-raccoons text-3xl  text-hotgreen md:text-5xl ">
        See You next year!
      </h2>
      <div
        className="relative w-[345] h-[220px] md:w-[632px] md:h-[421px] rounded-md"
        data-testid="image-parent-div">
        <ImageWithSkeleton
          green={false}
          src={imageSrc}
          alt="Photo from the event"
          width={632}
          height={421}
        />
      </div>
      <p className="text-hotgreen my-5">YOU CAN FIND MORE PICTURES FROM THE EVENT BELOW</p>
      <GreenButton
        buttonStyles="min-w-[200px]"
        buttonHref={buttonHref}
        buttonText="Photos from event"
      />
    </div>
  );
};

export default SeeYouNextYear;
