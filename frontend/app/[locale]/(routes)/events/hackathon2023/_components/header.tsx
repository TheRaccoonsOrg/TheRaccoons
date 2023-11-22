import Image from 'next/image';
import GreenButton from '@/components/green-button';

const Header = () => {
  return (
    <div className="mt-20 flex flex-col items-center">
      <div>
        <Image
          className="hidden w-full md:block md:w-[1100px]"
          src="/images/hackathon2023/raccoons_apply_2023.webp"
          alt="Hackathon2023"
          width={971}
          height={492}
          priority
        />
        <Image
          className="block w-full md:hidden"
          src="/images/hackathon2023/raccoons_apply_2023-sm.webp"
          alt="Hackathon2023"
          width={560}
          height={436}
        />
      </div>
      <GreenButton
        buttonStyles="mt-10 min-w-[200px]"
        buttonHref="https://raccoons-2023.devpost.com/project-gallery"
        buttonText="All submissions"
      />
      <div className="mt-4 flex flex-col items-center text-center">
        <p>The event has ended!</p>
        <p className="text-hotgreen">
          Thank you to everyone who participated and to all the partners!
        </p>
        <p>You can check out the winners and the hackathon details below. </p>
      </div>
    </div>
  );
};

export default Header;
