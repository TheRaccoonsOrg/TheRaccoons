import { FaExclamationTriangle } from 'react-icons/fa';

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-red-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FaExclamationTriangle className="w-4 h-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
};
