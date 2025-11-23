import { Star } from 'lucide-react';
import { AMENITY_ICONS, AMENITY_LABELS } from '@constants';

interface AmenitiesGridProps {
  amenities: string[];
  columns?: number;
}

export default function AmenitiesGrid({ amenities, columns = 4 }: AmenitiesGridProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {amenities.map((amenity) => {
        const Icon = AMENITY_ICONS[amenity] || Star;
        const label = AMENITY_LABELS[amenity] || amenity;
        return (
          <div key={amenity} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <Icon className="w-6 h-6 text-[#0E64D2]" />
            <span className="text-xs text-gray-700 text-center">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
