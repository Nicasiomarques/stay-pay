import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface BookingDetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  actions?: ReactNode;
}

export default function BookingDetailItem({ icon: Icon, label, value, actions }: BookingDetailItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0E64D2]/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#0E64D2]" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-gray-900">{value}</p>
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
