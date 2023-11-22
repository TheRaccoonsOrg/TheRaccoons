import Image from 'next/image';
import GreenButton from '@/components/green-button';
const SeeYouNextYear = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-raccoons text-3xl md:text-5xl  text-hotgreen my-10 ">
        See You next year!
      </h2>
      <Image
        src="/images/hackathon2023/hackathon2023.webp"
        width={632}
        height={421}
        alt="Photo from the event"
      />
      <p className="text-hotgreen my-5">YOU CAN FIND MORE PICTURES FROM THE EVENT BELOW</p>
      <GreenButton
        buttonStyles="min-w-[200px]"
        buttonHref="https://photos.app.goo.gl/4LfM9CetZzthEywJ6"
        buttonText="Photos from event"
      />
    </div>
  );
};

export default SeeYouNextYear;
