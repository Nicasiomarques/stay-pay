import { ArrowLeft, SlidersHorizontal, MapPin } from 'lucide-react';

interface SearchHeaderProps {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  onBack: () => void;
  onFilterClick: () => void;
}

export function SearchHeader({
  location,
  checkIn,
  checkOut,
  guests,
  onBack,
  onFilterClick,
}: SearchHeaderProps) {
  return (
    <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{location}</span>
          </div>
          <p className="text-sm text-gray-500">
            {checkIn && checkOut
              ? `${checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              : 'Select dates'} • {guests} {guests === 1 ? 'guest' : 'guests'}
          </p>
        </div>
        <button
          onClick={onFilterClick}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <SlidersHorizontal className="w-6 h-6 text-gray-900" />
        </button>
      </div>
    </div>
  );
}
