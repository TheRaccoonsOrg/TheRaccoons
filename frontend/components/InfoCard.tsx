import { InfoCardProps } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { RobotoFont } from "@/lib/fonts";

const InfoCard = (props: InfoCardProps) => {
  return (
    <div className="w-[350px] md:w-[300px] flex flex-col justify-center items-start mb-3">
      <Image
        src={props.imagePath}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
      <p className={`text-lg my-5 ${RobotoFont.className}`}>{props.text}</p>
      {props.buttonText && props.buttonHref ? (
        <Button
          className="bg-[#36f8a7] rounded-full text-background font-bold min-w-[100px]"
          asChild
        >
          <Link href={props.buttonHref} className="font-bold">
            {props.buttonText}
          </Link>
        </Button>
      ) : null}
      {props.linkText && props.linkHref ? (
        <Link
          href={props.linkHref}
          className="text-[#36f8a7] hover:underline mt-2"
        >
          {props.linkText}
        </Link>
      ) : null}
    </div>
  );
};

export default InfoCard;
