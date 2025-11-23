import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileScreen from '../components/MobileScreen';
import Button from '../components/Button';
import HotelCard from '../components/HotelCard';
import BottomNav from '../components/BottomNav';
import { Search, MapPin, Calendar, Users, Sparkles, Building2, Palmtree, DollarSign } from 'lucide-react';
import { hotels } from '../data/hotels';
import { useBooking } from '../context/BookingContext';

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
        <div 
          onClick={handleSearch}
          className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm cursor-pointer active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
            <MapPin className="w-5 h-5 text-[#0E64D2]" />
            <input 
              type="text" 
              placeholder="Where are you going?"
              className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
            <Calendar className="w-5 h-5 text-[#0E64D2]" />
            <span className="text-gray-400">
              {booking.checkIn && booking.checkOut 
                ? `${booking.checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${booking.checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                : 'Check-in • Check-out'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#0E64D2]" />
            <span className="text-gray-400">{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
          </div>
        </div>

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
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 whitespace-nowrap hover:bg-gray-100 transition-colors"
            >
              <filter.icon className="w-4 h-4 text-[#0E64D2]" />
              <span className="text-gray-700">{filter.label}</span>
            </button>
          ))}
        </div>
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