import { InfoCardProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import GreenButton from './green-button';

const InfoCard = (props: InfoCardProps) => {
  return (
    <div className="mb-3 flex w-[350px] flex-col items-start justify-center md:w-[300px]">
      <Image src={props.imagePath} alt={props.alt} width={props.width} height={props.height} />
      <p className="my-5 text-lg">{props.text}</p>
      {props.buttonText && props.buttonHref ? (
        <GreenButton buttonText={props.buttonText} buttonHref={props.buttonHref} />
      ) : null}
      {props.linkText && props.linkHref ? (
        <Link href={props.linkHref} className="mt-2 text-[#36f8a7] hover:underline">
          {props.linkText}
        </Link>
      ) : null}
    </div>
  );
};

export default InfoCard;
