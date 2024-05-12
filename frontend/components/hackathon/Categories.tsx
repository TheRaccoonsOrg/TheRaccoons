import { CategoriesProps } from '@/types';

const Categories = ({ props }: { props: CategoriesProps[] }) => {
  return (
    <div className="mt-10 grid max-w-[900px] grid-cols-1 gap-10 md:grid-cols-2 tss">
      {props.map((item, index) => (
        <div key={index}>
          <h2 className="font-raccoons text-hotgreen text-2xl">{item.categorieName}</h2>
          {item.position.map((item, index) => (
            <div key={index}>
              <h3 className="mt-2 text-purple-br">{item.title}</h3>
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
