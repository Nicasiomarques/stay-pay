import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, Button, HotelCard, BottomNav } from '@components';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import { Search, Sparkles, Building2, Palmtree, DollarSign } from 'lucide-react';
import { hotels } from '@data';
import { useBooking } from '@context';

export default function Home() {
  const navigate = useNavigate();
  const { booking, setSearchLocation } = useBooking();
  const [location, setLocation] = useState(booking.searchLocation);

  const featuredHotels = hotels.slice(0, 3);

  const filters = [
    { icon: Sparkles, label: 'Featured' },
    { icon: Building2, label: 'Luxury' },
    { icon: Palmtree, label: 'Resort' },
    { icon: DollarSign, label: 'Budget' },
  ];

  const handleSearch = () => {
    setSearchLocation(location);
    navigate('/search');
  };

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <h1 className="text-gray-900 mb-6">Find your perfect stay</h1>

        {/* Search Bar */}
        <SearchBar
          location={location}
          onLocationChange={setLocation}
          checkIn={booking.checkIn}
          checkOut={booking.checkOut}
          guests={booking.guests}
          onClick={handleSearch}
        />

        <Button
          fullWidth
          className="mt-4"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5 mr-2 inline-block" />
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="px-6 py-6 bg-white mt-2">
        <h2 className="text-gray-900 mb-4">Quick Filters</h2>
        <FilterChips options={filters} />
      </div>

      {/* Featured Hotels Carousel */}
      <div className="px-6 py-6 pb-24">
        <h2 className="text-gray-900 mb-4">Featured Hotels</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mr-6">
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="flex-shrink-0 w-72">
              <HotelCard {...hotel} hotelData={hotel} />
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </MobileScreen>
  );
}