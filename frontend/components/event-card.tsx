import { EventCardProps } from '@/types';
import GreenButton from './green-button';
import Image from 'next/image';

const EventCard = (props: EventCardProps) => {
  return props.show ? (
    <div className="m-3 flex min-h-[300px]  w-[400px] h-[352px] flex-col items-center justify-center rounded-lg border-2 border-purple-br bg-purple-md p-5">
      <h2 className="font-raccoons text-4xl">{props.title}</h2>

      {props.cardImage ? (
        <Image
          priority
          src={props.cardImage}
          width={300}
          height={200}
          alt="Image from event"
          className="w-[300px]"
        />
      ) : null}
      <GreenButton
        buttonStyles="rounded-lg mt-7"
        buttonHref={props.buttonLink}
        buttonText={props.buttonText}
      />
    </div>
  ) : null;
};

export default EventCard;
