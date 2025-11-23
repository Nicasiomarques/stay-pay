import { ArrowLeft, SlidersHorizontal, MapPin } from "lucide-react";
import { formatDateRange } from "@/utils";
import { formatGuestCount } from "@/utils/formatters";

interface SearchHeaderProps {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  onBack: () => void;
  onFilterClick: () => void;
  onSearchClick?: () => void;
  activeFiltersCount?: number;
}

export function SearchHeader({
  location,
  checkIn,
  checkOut,
  guests,
  onBack,
  onFilterClick,
  onSearchClick,
  activeFiltersCount = 0,
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
        <button
          onClick={onSearchClick}
          className="flex-1 text-left hover:bg-gray-50 -mx-2 px-2 py-1 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{location}</span>
          </div>
          <p className="text-sm text-gray-500">
            {formatDateRange(checkIn, checkOut)} • {formatGuestCount(guests)}
          </p>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFilterClick();
          }}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95 relative"
        >
          <SlidersHorizontal className="w-6 h-6 text-gray-900" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#0E64D2] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
