'use client';
import { useRouter } from 'next/navigation';
import GreenButton from '@/components/GreenButton';
import Link from 'next/link';
import ContactSection from '@/components/layout/ContactSection';
import ImageWithSkeleton from '@/components/hackathon/skeletons/ImageWithSkeleton';
import { findWorkshopBySlug } from '@/actions/events';

const Workshop = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const workshop = findWorkshopBySlug(params.slug);
  if (!workshop) {
    return router.push('/404');
  }

  return (
    <div className="flex flex-col mx-10 lg:mx-auto max-w-[900px] h-[91vh]">
      <h1 className="text-5xl md:text-6xl font-raccoons text-hotgreen text-center pt-10">
        {workshop.title}
      </h1>
      <p className="text-sm font-bold text-hotgreen pt-10">{workshop.dateWithText}</p>
      <p className="text-sm font-bold text-hotgreen ">{workshop.place}</p>
      <p className="text-sm">{workshop.eventShortDescription}</p>
      <div className="flex flex-col items-center mt-10">
        <div className="bg-hotgreen rounded-lg w-[390px] h-[220px] md:w-[629px] md:h-[349px] bg-opacity-40 flex p-4 items-center justify-center border-hotgreen border-2">
          <ImageWithSkeleton
            priority={true}
            green={true}
            src={workshop.image.src}
            alt={workshop.image.alt}
            width={workshop.image.width}
            height={workshop.image.height}
            imageStyles="object-fit w-[354px] h-[186px] md:w-[593px] md:h-[312px]"
          />
        </div>
        {workshop.registerLink ? (
          <GreenButton
            buttonHref={workshop.registerLink}
            buttonText="Piesakies"
            buttonStyles="w-[150px] mt-5"
          />
        ) : null}
      </div>
      <p className="text-sm mt-10">{workshop.description}</p>
      <div className="flex flex-row mt-1 ">
        <p className="text-sm mr-1">{workshop.moreInfo} </p>
        {workshop.moreInfoLink ? (
          <Link
            className="text-sm underline"
            href={workshop.moreInfoLink}
            rel="noopener noreferrer"
            target="_blank">
            {workshop.moreInfoLink}
          </Link>
        ) : null}
      </div>
      {workshop.description2nd ? (
        <>
          <p className="text-sm mt-5 font-bold">{workshop.description2nd}</p>
          <div className="flex flex-col md:flex-row mt-5 ">
            <p className="text-sm font-bold text-hotgreen mr-1">Kad?</p>
            <p className="text-sm">{workshop.when}</p>
          </div>
        </>
      ) : null}
      {workshop.description2nd ? (
        <>
          <div className="flex flex-col md:flex-row mt-2">
            <p className="text-sm font-bold text-hotgreen mr-1">Kur?</p>
            <p className="text-sm">{workshop.where}</p>
          </div>
          <div className="flex flex-col md:flex-row mt-2 ">
            <p className="text-sm font-bold text-hotgreen mr-1">Kas jāņem līdzi?</p>
            <p className="text-sm">{workshop.necessary}</p>
          </div>
          {workshop.slidesLink ? (
            <div className="flex flex-col md:flex-row mt-2 ">
              <p className="text-sm font-bold text-hotgreen mr-1">Prezentācija</p>
              <Link
                className="text-sm underline text-purple-br"
                href={workshop.slidesLink}
                rel="noopener noreferrer"
                target="_blank">
                {workshop.slidesLink}
              </Link>
            </div>
          ) : null}
          <div className="flex flex-col md:flex-row mt-2 ">
            <p className="text-sm font-bold text-hotgreen mr-1">Reģistrējies darbnīcai te:</p>
            <Link
              className="text-sm underline text-purple-br"
              href={workshop.registerLink}
              rel="noopener noreferrer"
              target="_blank">
              {workshop.registerLink}
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-hotgreen">Ko vari sagaidīt no darbnīcas?</p>
            {(workshop.timeFrames ?? []).map((timeFrame, index) => (
              <div key={index} className="flex flex-col mt-1">
                <p className="text-sm  text-hotgreen mr-1">{timeFrame.timeFrame}</p>
                <ul>
                  {timeFrame.descriptionOfTimeFrame?.map((item, index) => (
                    <li key={index} className="text-sm list-disc ml-5">
                      {item.shortDescription}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10">
            {workshop.subInfoSection.map((item, index) => (
              <p className="text-sm" key={index}>
                {item.shortDescription}
              </p>
            ))}
          </div>
        </>
      ) : null}

      <div className=" flex flex-col items-center justify-end h-full">
        <ContactSection />
      </div>
    </div>
  );
};

export default Workshop;
