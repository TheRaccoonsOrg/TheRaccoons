import { useTranslations } from 'next-intl';
import React from 'react';

const ColumnSection = () => {
  const t = useTranslations('Stories.columnSection');
  const keys = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

  return (
    <div className="md:max-w-[940px] w-full mt-20">
      {keys.map((key) => (
        <div key={key} className="flex flex-col md:flex-row md:justify-between mx-10 md:mx-0">
          <p>{t(`${key}.left`)}</p>
          <p>{t(`${key}.right`)}</p>
        </div>
      ))}
    </div>
  );
};

export default ColumnSection;
