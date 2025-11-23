import { Star, Wifi, Dumbbell, Car, UtensilsCrossed, Wine, Waves, Sparkles } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const amenityIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  pool: Waves,
  gym: Dumbbell,
  parking: Car,
  restaurant: UtensilsCrossed,
  bar: Wine,
  spa: Sparkles,
  concierge: Star,
};

interface AmenitiesGridProps {
  amenities: string[];
  columns?: number;
}

export default function AmenitiesGrid({ amenities, columns = 4 }: AmenitiesGridProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {amenities.map((amenity) => {
        const Icon = amenityIcons[amenity] || Star;
        return (
          <div key={amenity} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <Icon className="w-6 h-6 text-[#0E64D2]" />
            <span className="text-xs text-gray-700 capitalize text-center">{amenity}</span>
          </div>
        );
      })}
    </div>
  );
}
