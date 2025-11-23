import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileScreen } from '@components';
import ImageCarousel from './components/ImageCarousel';
import AmenitiesGrid from './components/AmenitiesGrid';
import ReviewCard from './components/ReviewCard';
import RoomSelector from './components/RoomSelector';
import BottomPriceBar from './components/BottomPriceBar';
import { ArrowLeft, Star, MapPin, Share2, Heart } from 'lucide-react';
import { hotels, reviews } from '@data';
import { useBooking } from '@context';

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, setHotel, setSelectedRoom } = useBooking();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(booking.selectedRoom);

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
        <ImageCarousel images={hotel.images} alt={hotel.name} />

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
          <AmenitiesGrid amenities={hotel.amenities} />
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
              <ReviewCard
                key={review.id}
                author={review.author}
                rating={review.rating}
                date={review.date}
                comment={review.comment}
              />
            ))}
          </div>
        </div>

        {/* Room Selection */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">Select Room</h2>
          <RoomSelector
            rooms={hotel.rooms}
            selectedRoomIndex={selectedRoomIndex}
            onSelectRoom={setSelectedRoomIndex}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomPriceBar
        price={hotel.rooms[selectedRoomIndex].price}
        buttonText="Book Now"
        onButtonClick={handleBookNow}
      />
    </MobileScreen>
  );
}