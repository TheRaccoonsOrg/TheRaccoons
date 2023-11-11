import { friendsImagePaths } from "@/lib/friends-pics";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const FriendsSection = () => {
  const tImage = useTranslations("Image");

  return (
    <div className="flex flex-col justify-center items-center my-10 ">
      <div className="w-[200px] mb-2">
        <Image
          src={tImage("friends")}
          width={500}
          height={500}
          alt="Friends / Draugi"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {friendsImagePaths.map((item, index) =>
          item.show ? (
            <div
              className="w-1/2 sm:w-1/4 md:w-1/4 py-2 flex items-center justify-center"
              key={index}
            >
              <Link href={item.link} rel="noopener noreferrer" target="_blank">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default FriendsSection;
