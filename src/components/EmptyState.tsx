import { LucideIcon } from 'lucide-react';
import { ReactNode, memo } from 'react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 text-center mb-6">{description}</p>
      {action}
    </div>
  );
}

export default memo(EmptyState);
