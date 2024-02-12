import GreenButton from '@/components/green-button';
import { CombinedImageProps } from '@/types';
import HeaderImage from './header/header-image';

const Header = ({
  props,
  submissionsLink,
}: {
  props: CombinedImageProps[];
  submissionsLink: string;
}) => {
  return (
    <div className="mt-20 flex flex-col items-center">
      <HeaderImage props={props} />
      <GreenButton
        buttonStyles="mt-10 min-w-[200px]"
        buttonHref={submissionsLink}
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
