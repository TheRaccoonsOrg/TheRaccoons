import Image from "next/image";

interface HeroHeaderProps {
  firstDesc: string;
  secondDesc: string;
  imageSrc: string;
  imageAlt: string;
}
const HeroHeader = (props: HeroHeaderProps) => {
  return (
    <header
      className={`flex flex-col justify-center items-center md:flex-row gap-x-10 `}
    >
      <div className="w-[350px] sm:w-[400px] md:w-[400px] text-lg">
        <p>{props.firstDesc}</p>
        <br />
        <p>{props.secondDesc}</p>
      </div>
      <div className="w-[350px] lg:w-[500px]">
        <Image
          priority
          src={props.imageSrc}
          alt={props.imageAlt}
          width={1000}
          height={1000}
        />
      </div>
    </header>
  );
};

export default HeroHeader;
