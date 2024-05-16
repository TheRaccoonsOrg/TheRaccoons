'use client';
import ImageWithSkeleton from '@/components/hackathon/skeletons/ImageWithSkeleton';
const FinalPresentations = () => {
  return (
    <div className="flex flex-col items-center max-w-[900px] ">
      <h2 className="font-raccoons text-purple-br text-4xl md:text-5xl mt-10 text-center">
        Final Presentations
      </h2>
      <div className="flex flex-col items-center lg:flex-row mt-10">
        <div className="flex flex-col gap-y-5 max-w-[500px] mr-5">
          <p>
            The hackathon took place between the
            <span className="text-hotgreen mx-1">25th and 27th of November</span>in the University
            of Latvia House of Science in Riga, Latvia. It was organized by the student community
            The Raccoons together with the University of Latvia Student Council.
          </p>
          <p>
            The event gathered high school and university students to develop their ideas and build
            real prototypes using the skills they had gained during the event. During the event with
            the support of partners and community organizations mentors and workshops took place, to
            help those participants with no knowledge in programming, to learn new skills that could
            then be applied to build their ideas.
          </p>
        </div>
        <div className="relative w-[357px] h-[357px]" data-testid="image-parent-div">
          <ImageWithSkeleton
            green={false}
            src="/images/hackathon2023/raccoon2.webp"
            alt="Raccoon"
            width={406}
            height={382}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalPresentations;
