'use client';
import { useRouter } from 'next/navigation';
import { workshopsData } from '../_data/workshopsData';
import Image from 'next/image';
import GreenButton from '@/components/green-button';
import Link from 'next/link';
import ContactSection from '@/components/layout/contact-info';

const Workshop2023 = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  function findWorkshopBySlug(slug: string) {
    return workshopsData.find((workshop) => workshop.slug === slug);
  }
  const filteredWorkshops = findWorkshopBySlug(params.slug);
  if (!filteredWorkshops) {
    return router.push('/404');
  }

  return (
    <div className="mx-10 lg:mx-auto max-w-[900px]">
      <h1 className="text-5xl md:text-6xl font-raccoons text-hotgreen text-center pt-10">
        {filteredWorkshops.title}
      </h1>
      <p className="text-sm font-bold text-hotgreen pt-10">{filteredWorkshops.date}</p>
      <p className="text-sm font-bold text-hotgreen ">{filteredWorkshops.place}</p>
      <p className="text-sm">{filteredWorkshops.eventShortDescription}</p>
      <div className="flex flex-col items-center mt-10">
        <div className="bg-hotgreen rounded-lg w-[390px] h-[210px] md:w-[629px] md:h-[349px] bg-opacity-40 flex items-center justify-center border-hotgreen border-2">
          <Image
            className="flex items-center justify-center w-[360px] h-[190]px md:w-[594px] md:h-[312px]"
            src={filteredWorkshops.image.src}
            alt={filteredWorkshops.image.alt}
            width={filteredWorkshops.image.width}
            height={filteredWorkshops.image.height}
          />
        </div>
        <GreenButton
          buttonHref={filteredWorkshops.registerLink}
          buttonText="Piesakies"
          buttonStyles="w-[150px] mt-5"
        />
      </div>
      <p className="text-sm mt-10">{filteredWorkshops.description}</p>
      <div className="flex flex-row mt-1 ">
        <p className="text-sm mr-1">{filteredWorkshops.moreInfo} </p>
        {filteredWorkshops.moreInfoLink ? (
          <Link
            className="text-sm underline"
            href={filteredWorkshops.moreInfoLink}
            rel="noopener noreferrer"
            target="_blank">
            {filteredWorkshops.moreInfoLink}
          </Link>
        ) : null}
      </div>
      <p className="text-sm mt-5 font-bold">{filteredWorkshops.description2nd}</p>
      <div className="flex flex-col md:flex-row mt-5 ">
        <p className="text-sm font-bold text-hotgreen mr-1">Kad?</p>
        <p className="text-sm">{filteredWorkshops.when}</p>
      </div>
      <div className="flex flex-col md:flex-row mt-2">
        <p className="text-sm font-bold text-hotgreen mr-1">Kur?</p>
        <p className="text-sm">{filteredWorkshops.where}</p>
      </div>
      <div className="flex flex-col md:flex-row mt-2 ">
        <p className="text-sm font-bold text-hotgreen mr-1">Kas jāņem līdzi?</p>
        <p className="text-sm">{filteredWorkshops.necessary}</p>
      </div>
      <div className="flex flex-col md:flex-row mt-2 ">
        <p className="text-sm font-bold text-hotgreen mr-1">Reģistrējies darbnīcai te:</p>
        <Link
          className="text-sm underline text-purple-br"
          href={filteredWorkshops.registerLink}
          rel="noopener noreferrer"
          target="_blank">
          {filteredWorkshops.registerLink}
        </Link>
      </div>
      <div className="mt-4">
        <p className="text-sm font-bold text-hotgreen">Ko vari sagaidīt no darbnīcas?</p>
        {filteredWorkshops.timeFrames.map((timeFrame, index) => (
          <div key={index} className="flex flex-col mt-1">
            <p className="text-sm  text-hotgreen mr-1">{timeFrame.timeFrame}</p>
            <ul>
              {timeFrame.descriptionOfTimeFrame.map((item, index) => (
                <li key={index} className="text-sm list-disc ml-5">
                  {item.shortDescription}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10">
        {filteredWorkshops.subInfoSection.map((item, index) => (
          <p className="text-sm" key={index}>
            {item.shortDescription}
          </p>
        ))}
      </div>
      <ContactSection />
    </div>
  );
};

export default Workshop2023;
