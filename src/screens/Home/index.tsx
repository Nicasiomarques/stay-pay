import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MobileScreen, Button, HotelCard, BottomNav, PageTransition } from '@components';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import { Search, Sparkles, Building2, Palmtree, DollarSign, TrendingUp, MapPin, Star, Loader2 } from 'lucide-react';
import { useBooking } from '@context';
import { listContainerVariants, slideUpVariants } from '@/config/animations';
import { useFeaturedHotels, usePopularHotels, useHotels, useDestinations } from '@/hooks/queries';

export default function Home() {
  const navigate = useNavigate();
  const { booking, setSearchLocation, setQuickFilter, setGuests } = useBooking();
  const [location, setLocation] = useState(booking.searchLocation);
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>();

  // Fetch data using React Query
  const { data: featuredHotelsData, isLoading: isFeaturedLoading } = useFeaturedHotels();
  const { data: popularHotelsData, isLoading: isPopularLoading } = usePopularHotels();
  const { data: allHotelsData, isLoading: isAllHotelsLoading } = useHotels();
  const { data: destinationsData } = useDestinations();

  const featuredHotels = featuredHotelsData ?? [];
  const popularHotels = popularHotelsData ?? [];
  const allHotels = allHotelsData?.hotels ?? [];

  const filters = useMemo(
    () => [
      { icon: Sparkles, label: 'Destaque' },
      { icon: Building2, label: 'Luxo' },
      { icon: Palmtree, label: 'Resort' },
      { icon: DollarSign, label: 'Económico' },
    ],
    []
  );

  const destinations = useMemo(() => {
    if (!destinationsData) return [];
    return destinationsData.map((dest) => ({
      name: dest.name,
      hotels: dest.hotelCount,
      icon: MapPin,
    }));
  }, [destinationsData]);

  const handleSearch = useCallback(() => {
    setSearchLocation(location);
    navigate('/search');
  }, [location, setSearchLocation, navigate]);

  const handleFilterSelect = useCallback((filter: string) => {
    setSelectedFilter(filter);
    setQuickFilter(filter);
    navigate('/search');
  }, [setQuickFilter, navigate]);

  return (
    <PageTransition>
      <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <h1 className="text-gray-900 mb-6">Encontre a sua estadia perfeita</h1>

        {/* Search Bar */}
        <SearchBar
          location={location}
          onLocationChange={setLocation}
          checkIn={booking.checkIn}
          checkOut={booking.checkOut}
          guests={booking.guests}
          onGuestsChange={setGuests}
        />

        <Button
          fullWidth
          className="mt-4"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5 mr-2 inline-block" />
          Pesquisar
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="px-6 py-6 bg-white mt-2">
        <h2 className="text-gray-900 mb-4">Filtros Rápidos</h2>
        <FilterChips
          options={filters}
          selectedOption={selectedFilter}
          onSelect={handleFilterSelect}
        />
      </div>

      {/* Featured Hotels Carousel */}
      <div className="px-6 py-6 bg-white mt-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Hotéis em Destaque</h2>
          <button
            onClick={() => navigate('/search')}
            className="text-[#0E64D2] text-sm font-medium"
          >
            Ver todos
          </button>
        </div>
        {isFeaturedLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-[#0E64D2] animate-spin" />
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mr-6">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="flex-shrink-0 w-72">
                <HotelCard {...hotel} hotelData={hotel} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Destinations */}
      <div className="px-6 py-6 bg-white mt-2">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#0E64D2]" />
          <h2 className="text-gray-900">Destinos Populares</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {destinations.map((dest, index) => {
            const Icon = dest.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  setLocation(dest.name);
                  setSearchLocation(dest.name);
                  navigate('/search');
                }}
                className="bg-gradient-to-br from-[#0E64D2]/10 to-[#0E64D2]/5 rounded-xl p-4 text-left active:scale-98 transition-transform border border-[#0E64D2]/20"
              >
                <Icon className="w-5 h-5 text-[#0E64D2] mb-2" />
                <h3 className="text-gray-900 font-medium text-sm mb-1">{dest.name}</h3>
                <p className="text-gray-500 text-xs">{dest.hotels} {dest.hotels === 1 ? 'hotel' : 'hotéis'}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Hotels */}
      <div className="px-6 py-6 bg-white mt-2">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <h2 className="text-gray-900">Mais Populares</h2>
        </div>
        {isPopularLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-[#0E64D2] animate-spin" />
          </div>
        ) : (
          <motion.div
            className="space-y-3"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {popularHotels.map((hotel, _) => (
              <motion.div key={hotel.id} variants={slideUpVariants}>
                <HotelCard {...hotel} hotelData={hotel} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* All Hotels */}
      <div className="px-6 py-6 pb-24 bg-white mt-2">
        <h2 className="text-gray-900 mb-4">Todos os Hotéis</h2>
        {isAllHotelsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-[#0E64D2] animate-spin" />
          </div>
        ) : (
          <motion.div
            className="space-y-3"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {allHotels.map((hotel, _i) => (
              <motion.div key={hotel.id} variants={slideUpVariants}>
                <HotelCard {...hotel} hotelData={hotel} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

        <BottomNav />
      </MobileScreen>
    </PageTransition>
  );
}