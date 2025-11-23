import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, HotelCard, BottomNav, EmptyState } from '@components';
import { Heart } from 'lucide-react';
import { hotels } from '@data';

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites] = useState(hotels.slice(0, 2)); // Mock favorites

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-[#0E64D2]" />
          <h1 className="text-gray-900">Favorites</h1>
        </div>
        <p className="text-gray-500">Your saved properties</p>
      </div>

      {/* Favorites List */}
      <div className="px-6 py-6 pb-24">
        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} hotelData={hotel} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="Start adding hotels to your favorites"
          />
        )}
      </div>

      <BottomNav />
    </MobileScreen>
  );
}
