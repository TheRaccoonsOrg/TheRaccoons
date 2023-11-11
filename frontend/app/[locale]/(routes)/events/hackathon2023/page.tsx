import GreenButton from "@/components/green-button";
import Header from "./_components/header";
import HowDidItGo from "./_components/how-did-it-go";
import Winners from "./_components/winners";
import Categories from "./_components/categories";
import Image from "next/image";
import SeeYouNextYear from "./_components/see-you-next-year";
import Partners from "./_components/partners";
import ContactSection from "@/components/layout/contact-info";

const Hackathon2022 = () => {
  return (
    <div className="mx-10 flex flex-col items-center ">
      <Header />
      <GreenButton
        buttonStyles="mt-10"
        buttonText="Watch Awards Ceremony"
        buttonHref="https://www.youtube.com/live/-RU_4tzY0Bw"
      />
      <HowDidItGo />
      <Winners />
      <Categories />
      <GreenButton
        buttonStyles="mt-10 min-w-[200px]"
        buttonHref="https://raccoons-2023.devpost.com/project-gallery"
        buttonText="All submissions"
      />
      <SeeYouNextYear />
      <Partners />
      <ContactSection />
    </div>
  );
};

export default Hackathon2022;
