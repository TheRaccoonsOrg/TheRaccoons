import { RobotoFont } from "@/lib/fonts";
import { InfoCardProps } from "@/types";
import Image from "next/image";

const AboutUs = (props: InfoCardProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-x-10 mt-8">
      <div className="w-[350px] md:w-[400px]">
        <Image src={props.imagePath} alt="Image" width={1000} height={1000} />
      </div>
      <p
        className={`w-[350px] md:w-[500px] mt-4 text-lg ${RobotoFont.className}`}
      >
        {props.text}
      </p>
    </div>
  );
};
export default AboutUs;
