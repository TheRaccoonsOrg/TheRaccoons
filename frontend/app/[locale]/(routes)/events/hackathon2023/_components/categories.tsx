import React from 'react';
import { challengeCategories } from '../_data/categories';

const Categories = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-10 max-w-[1000px] md:grid-cols-2">
      {challengeCategories.map((item, index) => (
        <div key={index}>
          <h2 className="font-raccoons text-hotgreen text-2xl">{item.categorieName}</h2>
          {item.position.map((item, index) => (
            <div key={index}>
              <h3 className="text-purple-br mt-2">{item.title}</h3>
              <h3 className="text-hotgreen">{item.projectName}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Categories;
