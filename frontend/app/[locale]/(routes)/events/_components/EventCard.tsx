'use client';
import GreenButton from '@/components/GreenButton';
import ImageWithSkeleton from '@/components/hackathon/skeletons/ImageWithSkeleton';
import { EventCardProps } from '@/types';

const EventCard = (props: EventCardProps) => {
  return props.show ? (
    <div className="m-3 flex min-h-[300px] w-[340px] sm:w-[350px] h-[352px] flex-col items-center justify-around rounded-lg border-2 border-purple-br bg-purple-md py-3">
      <h2 className="font-raccoons text-3xl md:text-4xl">{props.cardTitle}</h2>
      {props.cardImage ? (
        <div className="w-[300px] h-[200px]">
          <ImageWithSkeleton
            priority={true}
            imageStyles="object-cover w-[300px] h-[200px]"
            green={false}
            src={props.cardImage}
            width={300}
            height={200}
            alt="Image from event"
          />
        </div>
      ) : null}
      <GreenButton
        buttonStyles="rounded-lg"
        buttonHref={props.buttonLink}
        buttonText={props.buttonText}
      />
    </div>
  ) : null;
};

export default EventCard;
