import Image from 'next/image';

interface HeroHeaderProps {
  firstDesc: string;
  secondDesc: string;
  imageSrc: string;
  imageAlt: string;
}
const HeroHeader = (props: HeroHeaderProps) => {
  return (
    <header className={`flex flex-col items-center justify-center gap-x-10 md:flex-row `}>
      <div className="w-[350px] text-lg sm:w-[400px] md:w-[400px]">
        <p>{props.firstDesc}</p>
        <br />
        <p>{props.secondDesc}</p>
      </div>
      <div className="w-[350px] lg:w-[500px]">
        <Image priority src={props.imageSrc} alt={props.imageAlt} width={1000} height={1000} />
      </div>
    </header>
  );
};

export default HeroHeader;
