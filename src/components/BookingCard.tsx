import { memo } from 'react';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingCardProps {
  hotel: string;
  location: string;
  dates: string;
  status: string;
  bookingNumber: string;
  image: string;
  onClick?: () => void;
}

function BookingCard({
  hotel,
  location,
  dates,
  status,
  bookingNumber,
  image,
  onClick
}: BookingCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4 mb-4">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={image}
            alt={hotel}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-gray-900">{hotel}</h3>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{dates}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-500">Booking #{bookingNumber}</span>
        <span
          className={`px-3 py-1 rounded-lg text-sm ${
            status === 'Confirmed'
              ? 'bg-blue-50 text-blue-700'
              : 'bg-green-50 text-green-700'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default memo(BookingCard);
