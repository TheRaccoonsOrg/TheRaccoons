import { InfoCardProps } from '@/types';
import Image from 'next/image';

const AboutUs = (props: InfoCardProps) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-x-10 md:flex-row">
      <div className="w-[350px] md:w-[400px]">
        <Image src={props.imagePath} alt="Image" width={1000} height={1000} />
      </div>
      <p className="mt-4 w-[350px] md:w-[500px] ">{props.text}</p>
    </div>
  );
};
export default AboutUs;
