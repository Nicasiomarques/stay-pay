import { memo } from "react";
import { Star, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@context";
import { Hotel } from "@types";

interface HotelCardProps {
  id: number;
  image: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  distance?: string;
  hotelData?: Hotel;
}

function HotelCard({
  id,
  image,
  name,
  location,
  rating,
  reviews,
  price,
  distance,
  hotelData,
}: HotelCardProps) {
  const navigate = useNavigate();
  const { setHotel } = useBooking();

  const handleClick = () => {
    if (hotelData) {
      setHotel(hotelData);
    }
    navigate(`/hotel/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-98 transition-transform"
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">{name}</h3>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-sm">{location}</span>
              {distance && <span className="text-sm">• {distance}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-gray-900">{rating}</span>
            <span className="text-gray-400 text-sm">({reviews})</span>
          </div>
          <div className="text-right">
            <span className="text-gray-900">${price}</span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HotelCard);
