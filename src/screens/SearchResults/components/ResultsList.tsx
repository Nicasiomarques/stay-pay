import { HotelCard } from "@components";
import { Hotel } from '@types';

interface ResultsListProps {
  hotels: Hotel[];
}

export function ResultsList({ hotels }: ResultsListProps) {
  return (
    <div className="px-6 py-6">
      <p className="text-gray-500 mb-4">{hotels.length} {hotels.length === 1 ? 'propriedade encontrada' : 'propriedades encontradas'}</p>
      <div className="space-y-4 pb-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} {...hotel} hotelData={hotel} />
        ))}
      </div>
    </div>
  );
}
