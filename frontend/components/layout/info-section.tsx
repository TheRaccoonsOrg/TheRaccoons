import InfoCard from "@/components/InfoCard";
import { infoSectionData } from "@/lib/content";
import { useTranslations } from "next-intl";

const InfoSection = () => {
  const t = useTranslations("Index");
  const tImage = useTranslations("Image");
  const tButton = useTranslations("Buttons");
  const tLinks = useTranslations("Links");
  return (
    <div className="flex flex-col items-center justify-center gap-x-5 md:flex-row md:items-start my-10">
      {infoSectionData.map((item, index) => (
        <InfoCard
          imagePath={tImage(item.title)}
          key={index}
          alt={item.title || ""}
          width={500}
          height={500}
          text={t(item.title)}
          buttonText={item.buttonText ? tButton(item.buttonText) : undefined}
          buttonHref={item.buttonHref || ""}
          linkText={item.linkText ? tLinks(item.linkText) : undefined}
          linkHref={item.linkHref || ""}
        />
      ))}
    </div>
  );
};

export default InfoSection;
