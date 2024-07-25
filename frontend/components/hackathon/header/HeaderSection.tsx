import GreenButton from '@/components/GreenButton';
import { CombinedImageProps } from '@/types';
import HeaderImage from './HeaderImage';

const HeaderSection = ({
  props,
  submissionsLink,
  buttonText,
  eventEnded,
}: {
  props: CombinedImageProps[];
  submissionsLink: string;
  buttonText: string;
  eventEnded: boolean;
}) => {
  return (
    <div className="mt-20 flex flex-col items-center">
      <HeaderImage props={props} />
      <GreenButton
        buttonStyles="mt-10 min-w-[200px]"
        buttonHref={submissionsLink}
        buttonText={buttonText}
      />
      {eventEnded && (
        <div className="mt-4 flex flex-col items-center text-center">
          <h2>The event has ended!</h2>
          <h3 className="text-hotgreen">
            Thank you to everyone who participated and to all the partners!
          </h3>
          <h3>You can check out the winners and the hackathon details below. </h3>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;
