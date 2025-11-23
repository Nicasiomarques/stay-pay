import { MapPin, Calendar, Users } from 'lucide-react';

interface SearchBarProps {
  location: string;
  onLocationChange: (value: string) => void;
  checkIn?: Date | null;
  checkOut?: Date | null;
  guests: number;
  onClick?: () => void;
}

export default function SearchBar({
  location,
  onLocationChange,
  checkIn,
  checkOut,
  guests,
  onClick
}: SearchBarProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm cursor-pointer active:scale-98 transition-transform"
    >
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
        <MapPin className="w-5 h-5 text-[#0E64D2]" />
        <input
          type="text"
          placeholder="Para onde vai?"
          className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
        <Calendar className="w-5 h-5 text-[#0E64D2]" />
        <span className="text-gray-400">
          {checkIn && checkOut
            ? `${checkIn.toLocaleDateString('pt-AO', { month: 'short', day: 'numeric' })} - ${checkOut.toLocaleDateString('pt-AO', { month: 'short', day: 'numeric' })}`
            : 'Entrada • Saída'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Users className="w-5 h-5 text-[#0E64D2]" />
        <span className="text-gray-400">
          {guests} {guests === 1 ? 'hóspede' : 'hóspedes'}
        </span>
      </div>
    </div>
  );
}
