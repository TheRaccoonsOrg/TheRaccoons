import { useTranslations } from "next-intl";
import HeroHeader from "@/components/layout/hero";
import FriendsSection from "@/components/layout/friends";
import ContactSection from "@/components/layout/contact-info";
import AboutUs from "@/components/layout/about-us";
import InfoSection from "@/components/layout/info-section";

export default function Main() {
  const t = useTranslations("Index");
  const tImage = useTranslations("Image");

  return (
    <div className="mx-10">
      <HeroHeader
        firstDesc={t("firstDesc")}
        secondDesc={t("secondDesc")}
        imageSrc={"/images/main.gif"}
        imageAlt="Raccoons main picture"
      />
      <AboutUs
        text={t("aboutUs")}
        imagePath={tImage("aboutUs")}
        alt={"About us"}
        width={500}
        height={500}
      />
      <InfoSection />
      <FriendsSection />
      <ContactSection />
    </div>
  );
}
