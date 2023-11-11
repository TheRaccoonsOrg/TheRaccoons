import Image from "next/image";
import { communityPartners, partnerImages } from "../_data/partner-images";
import Link from "next/link";

const Partners = () => {
  return (
    <div className="flex flex-col items-center my-10">
      <Image
        src="/images/en/main-org-LUSP.webp"
        width={780}
        height={152}
        alt="Main Organizer"
      />
      <Image
        className="mt-6"
        src="/images/hackathon2023/dots.webp"
        width={20}
        height={91}
        alt="Dots"
      />
      <Image
        className="mt-6"
        src="/images/en/partners.webp"
        width={384}
        height={141}
        alt="Partners"
      />
      <div className="max-w-[750px] flex flex-wrap  justify-center items-center gap-5">
        {partnerImages.map((item, index) => (
          <Link
            key={index}
            href={item.linkHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              className="mt-6"
              src={item.imagePath}
              width={item.width}
              height={item.height}
              alt={item.alt}
            />
          </Link>
        ))}
      </div>
      <Image
        className="mt-6"
        src="/images/en/comminity_partners.webp"
        width={464}
        height={103}
        alt="Community Partners"
      />
      <div className="flex flex-wrap  justify-center items-center gap-5">
        {communityPartners.map((item, index) => (
          <Link
            key={index}
            href={item.linkHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              className="mt-6 w-auto h-[50px]"
              src={item.imagePath}
              width={item.width}
              height={item.height}
              alt={item.alt}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Partners;
