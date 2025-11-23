import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface HeaderWithBackProps {
  title?: string;
  onBack?: () => void;
  children?: ReactNode;
  rightActions?: ReactNode;
}

export default function HeaderWithBack({ title, onBack, children, rightActions }: HeaderWithBackProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        {title && <h1 className="text-gray-900">{title}</h1>}
        {children}
        {rightActions && <div className="ml-auto">{rightActions}</div>}
      </div>
    </div>
  );
}
