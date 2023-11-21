import React from 'react';

const Winners = () => {
  return (
    <div className="mt-20 flex max-w-[1000px] flex-col items-center">
      <h2 className="font-raccoons text-4xl text-purple-br md:text-5xl ">Winners</h2>
      <p>
        Together with the help of mentors and organizers, 32 teams managed to build real solutions
        in 48 hours under one of the chosen challenges:{' '}
        <span className="text-hotgreen">
          Sustainability & Data, Deep Science, GameDev and Your Challenge.
        </span>{' '}
        After an intensive pitching session, the decisions of the jury were announced at the
        Awarding Ceremony, and the best-performing teams received valuable prizes.{' '}
      </p>
    </div>
  );
};

export default Winners;
