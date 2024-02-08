import { CombinedImageProps } from '@/types';
import Image from 'next/image';
const CombineImage = (props: CombinedImageProps) => {
  return (
    <div className={props.imageStyles + ' relative'}>
      <Image
        src={props.src}
        alt={props.alt}
        width={props.imageWidth}
        height={props.imageHeight}
        className={props.imageStyles}
      />
      <div className="absolute left-[4.7em] md:left-[8.7em] lg:left-[12em] bottom-[0.3em] md:bottom-[0.7em] lg:bottom-[0.9em]">
        <p className="text-sm md:text-md lg:text-lg">{props.date}</p>
        <p className="text-sm md:text-md lg:text-lg">{props.place}</p>
      </div>
    </div>
  );
};
const HeaderImage = ({ props }: { props: CombinedImageProps[] }) => {
  return (
    <div>
      <CombineImage
        imageStyles={props[0].imageStyles}
        src={props[0].src}
        alt={props[0].alt}
        imageWidth={props[0].imageWidth}
        imageHeight={props[0].imageHeight}
        isPriority={props[0].isPriority}
        date={props[0].date}
        place={props[0].place}
      />
      <CombineImage
        imageStyles={props[1].imageStyles}
        src={props[1].src}
        alt={props[1].alt}
        imageWidth={props[1].imageWidth}
        imageHeight={props[1].imageHeight}
        isPriority={props[1].isPriority}
        date={props[1].date}
        place={props[1].place}
      />
    </div>
  );
};

export default HeaderImage;

{
  /* <Image
  className="hidden w-full md:block md:w-[971px]"
  src="/images/hackathon2023/raccoons_apply_2023.webp"
  alt="Hackathon2023"
  width={971}
  height={492}
  priority
/>
<Image
  className="block w-full md:hidden"
  src="/images/hackathon2023/raccoons_apply_2023-sm.webp"
  alt="Hackathon2023"
  width={560}
  height={436}
/> */
}
