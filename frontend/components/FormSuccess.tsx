import { CheckCircleIcon } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-green-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircleIcon className="w-4 h-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
};
