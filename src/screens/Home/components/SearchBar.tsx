import { MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GuestSelector } from '@components';
import { useState, useEffect, useRef } from 'react';
import { hotels } from '@data';

interface SearchBarProps {
  location: string;
  onLocationChange: (value: string) => void;
  checkIn?: Date | null;
  checkOut?: Date | null;
  guests: number;
  onGuestsChange: (guests: number) => void;
}

export default function SearchBar({
  location,
  onLocationChange,
  checkIn,
  checkOut,
  guests,
  onGuestsChange,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Extract unique locations from hotels
  const allLocations = Array.from(new Set(hotels.map(h => h.location)));

  useEffect(() => {
    if (location && location.length > 0) {
      const filtered = allLocations.filter(loc =>
        loc.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowLocationSuggestions(filtered.length > 0 && location !== filtered[0]);
    } else {
      setFilteredLocations(allLocations);
      setShowLocationSuggestions(false);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !locationInputRef.current?.contains(event.target as Node)
      ) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (selectedLocation: string) => {
    onLocationChange(selectedLocation);
    setShowLocationSuggestions(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="relative mb-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[#0E64D2]" />
          <input
            ref={locationInputRef}
            type="text"
            placeholder="Para onde vai?"
            className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            onFocus={() => {
              if (filteredLocations.length > 0) {
                setShowLocationSuggestions(true);
              }
            }}
          />
        </div>
        {showLocationSuggestions && filteredLocations.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-50 animate-fade-in"
          >
            {filteredLocations.map((loc, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(loc)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
              >
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{loc}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => navigate('/calendar')}
        className="w-full flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 text-left hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors"
      >
        <Calendar className="w-5 h-5 text-[#0E64D2]" />
        <span className="text-gray-400">
          {checkIn && checkOut
            ? `${checkIn.toLocaleDateString('pt-AO', { month: 'short', day: 'numeric' })} - ${checkOut.toLocaleDateString('pt-AO', { month: 'short', day: 'numeric' })}`
            : 'Entrada • Saída'}
        </span>
      </button>
      <div className="relative">
        <button
          onClick={() => setShowGuestSelector(!showGuestSelector)}
          className="w-full flex items-center gap-3 text-left hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors"
        >
          <Users className="w-5 h-5 text-[#0E64D2]" />
          <span className="text-gray-400">
            {guests} {guests === 1 ? 'hóspede' : 'hóspedes'}
          </span>
        </button>
        <GuestSelector
          isOpen={showGuestSelector}
          onClose={() => setShowGuestSelector(false)}
          initialGuests={guests}
          onConfirm={(newGuests) => {
            onGuestsChange(newGuests);
            setShowGuestSelector(false);
          }}
        />
      </div>
    </div>
  );
}
