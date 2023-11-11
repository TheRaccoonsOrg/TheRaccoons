import Image from "next/image";
import Link from "next/link";

const HowDidItGo = () => {
  return (
    <div className="flex flex-col items-center max-w-[1000px]">
      <h2 className="font-raccoons text-purple-br text-4xl md:text-5xl mt-10">
        How did it go?
      </h2>
      <div className="flex flex-col items-center md:flex-row">
        <div className=" gap-y-5 ">
          <div>
            <h3 className="text-hotgreen">Who Joined?</h3>
            <p>
              More than a hundred participants with a median age of 19 years.
              Any high school or university student was welcome to participate
              regardless of skills and background.
            </p>
          </div>
          <div>
            <h3 className="text-hotgreen">Date</h3>
            <p>20th - 22nd of October, 2023</p>
          </div>
          <div>
            <h3 className="text-hotgreen">Place</h3>
            <p>
              House of Nature, Jelgavas Street 1, Riga, University of Latvia
            </p>
          </div>
          <div>
            <h3 className="text-hotgreen">Who Organized the Event?</h3>
            <p>
              We, The Raccoons, together with the University of Latvia Student
              Council
            </p>
          </div>
          <div>
            <h3 className="text-hotgreen">Workshops</h3>
            <p>We organized a series of workshops before the event.</p>
            <Link
              href="/events/workshop2023"
              className="text-hotgreen underline"
            >
              Check them out!
            </Link>
          </div>
        </div>
        <Image
          src="/images/hackathon2023/raccoon2.webp"
          alt="Raccoon"
          width={406}
          height={382}
        />
      </div>
    </div>
  );
};

export default HowDidItGo;
