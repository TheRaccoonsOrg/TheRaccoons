import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const GreenButton = ({
  buttonHref,
  buttonText,
  buttonStyles,
}: {
  buttonHref: string;
  buttonText: string;
  buttonStyles?: string;
}) => {
  return (
    <Button
      className={`min-w-[100px] rounded-full bg-hotgreen font-bold text-background ${buttonStyles}`}
      asChild>
      <Link href={buttonHref} className="font-bold">
        {buttonText}
      </Link>
    </Button>
  );
};

export default GreenButton;
