import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileScreen from '../components/MobileScreen';
import Button from '../components/Button';
import { ArrowLeft, Star, Wifi, Dumbbell, Car, UtensilsCrossed, Wine, Waves, Sparkles, MapPin, Share2, Heart } from 'lucide-react';
import { hotels, reviews } from '../data/hotels';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useBooking } from '../context/BookingContext';

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  pool: Waves,
  gym: Dumbbell,
  parking: Car,
  restaurant: UtensilsCrossed,
  bar: Wine,
  spa: Sparkles,
  concierge: Star,
};

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, setHotel, setSelectedRoom } = useBooking();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(booking.selectedRoom);
  const [currentImage, setCurrentImage] = useState(0);

  const hotel = hotels.find(h => h.id === Number(id));

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const handleBookNow = () => {
    setHotel(hotel);
    setSelectedRoom(selectedRoomIndex);
    navigate('/calendar');
  };

  return (
    <MobileScreen className="bg-white pb-24">
      {/* Image Carousel */}
      <div className="relative">
        <div className="relative h-80 overflow-hidden">
          <ImageWithFallback
            src={hotel.images[currentImage]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {hotel.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentImage ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Header Buttons */}
        <div className="absolute top-6 left-0 right-0 px-6 flex justify-between">
          <button 
            onClick={() => navigate('/search')}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
              <Share2 className="w-5 h-5 text-gray-900" />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Hotel Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-gray-900 flex-1">{hotel.name}</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{hotel.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-gray-900">{hotel.rating}</span>
              <span className="text-gray-500">({hotel.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">Amenities</h2>
          <div className="grid grid-cols-4 gap-4">
            {hotel.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity] || Star;
              return (
                <div key={amenity} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <Icon className="w-6 h-6 text-[#0E64D2]" />
                  <span className="text-xs text-gray-700 capitalize text-center">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Reviews</h2>
            <button className="text-[#0E64D2]">See all</button>
          </div>
          <div className="space-y-4">
            {reviews.slice(0, 2).map((review) => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900">{review.author}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-gray-900">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">{review.date}</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Room Selection */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">Select Room</h2>
          <div className="space-y-3">
            {hotel.rooms.map((room, index) => (
              <button
                key={index}
                onClick={() => setSelectedRoomIndex(index)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedRoomIndex === index
                    ? 'border-[#0E64D2] bg-[#0E64D2]/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-1">{room.type}</h3>
                    <p className="text-sm text-gray-500">Up to {room.capacity} guests</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">${room.price}</p>
                    <p className="text-sm text-gray-500">per night</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-500 text-sm">Total price</p>
            <p className="text-gray-900">${hotel.rooms[selectedRoomIndex].price} <span className="text-gray-500">/ night</span></p>
          </div>
          <Button onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </div>
    </MobileScreen>
  );
}