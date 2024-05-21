import { FaExclamationTriangle } from 'react-icons/fa';

import { CardWrapper } from '@/components/auth/CardWrapper';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login">
      <div className="w-full flex justify-center items-center">
        <FaExclamationTriangle className="w-4 h-4 text-destructive" />
      </div>
    </CardWrapper>
  );
};
