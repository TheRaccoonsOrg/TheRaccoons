interface InformationProps {
  title?: string;
  description?: string;
}

const Information = ({ data }: { data: InformationProps[] }) => {
  return (
    <div className="flex flex-col gap-4 max-w-[56.25rem] pb-10">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col mt-2  gap-y-2">
          <h2 className="text-sm font-bold text-hotgreen mr-1">{item.title}</h2>
          <p className="text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Information;
