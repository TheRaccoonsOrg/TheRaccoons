interface headerProps {
  label: string;
}

export const Header = ({ label }: headerProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-2xl font-bold">The Raccoons</h1>
      <p className="text-sm"> {label}</p>
    </div>
  );
};
