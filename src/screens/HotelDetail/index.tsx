import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileScreen, Button, EmptyState } from '@components';
import ImageCarousel from './components/ImageCarousel';
import AmenitiesGrid from './components/AmenitiesGrid';
import ReviewCard from './components/ReviewCard';
import RoomSelector from './components/RoomSelector';
import BottomPriceBar from './components/BottomPriceBar';
import { ArrowLeft, Star, MapPin, Share2, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { useHotel } from '@/hooks/queries';
import { useBooking } from '@context';

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { booking, setHotel, setSelectedRoom } = useBooking();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(booking.selectedRoom);

  // Fetch hotel from API
  const { data: hotel, isLoading, isError } = useHotel(Number(id) || 0);

  // Mock reviews (TODO: move to API)
  const reviews = [
    {
      id: 1,
      author: 'Maria Silva',
      rating: 5,
      date: '2 dias atrás',
      comment: 'Experiência incrível! O hotel superou todas as expectativas.',
    },
    {
      id: 2,
      author: 'João Santos',
      rating: 4,
      date: '1 semana atrás',
      comment: 'Muito bom, apenas o WiFi poderia ser mais rápido.',
    }
  ];

  const handleBookNow = useCallback(() => {
    if (!hotel) return;
    setHotel(hotel);
    setSelectedRoom(selectedRoomIndex);
    navigate('/calendar');
  }, [hotel, selectedRoomIndex, setHotel, setSelectedRoom, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <MobileScreen className="bg-neutral-50">
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-12 h-12 text-[#0E64D2] animate-spin" />
        </div>
      </MobileScreen>
    );
  }

  // Error or not found state
  if (isError || !hotel) {
    return (
      <MobileScreen className="bg-neutral-50">
        <div className="px-6 pt-12">
          <button
            onClick={() => navigate('/home')}
            type="button"
            aria-label="Voltar para a página inicial"
            className="mb-6 text-[#0E64D2] flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para Início</span>
          </button>
          <EmptyState
            icon={AlertCircle}
            title="Hotel Não Encontrado"
            description="Não foi possível encontrar o hotel que procura. Pode ter sido removido ou o link está incorreto."
            action={
              <Button onClick={() => navigate('/home')}>
                Explorar Hotéis
              </Button>
            }
          />
        </div>
      </MobileScreen>
    );
  }

  return (
    <MobileScreen className="bg-white pb-24">
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={hotel.images} alt={hotel.name} />

        {/* Header Buttons */}
        <div className="absolute top-6 left-0 right-0 px-6 flex justify-between">
          <button
            onClick={() => navigate('/search')}
            type="button"
            aria-label="Voltar aos resultados de pesquisa"
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" aria-hidden="true" />
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Partilhar este hotel"
              className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
            >
              <Share2 className="w-5 h-5 text-gray-900" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Adicionar aos favoritos"
              className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
            >
              <Heart className="w-5 h-5 text-gray-900" aria-hidden="true" />
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
              <span className="text-gray-500">({hotel.reviews} {hotel.reviews === 1 ? 'avaliação' : 'avaliações'})</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">Comodidades</h2>
          <AmenitiesGrid amenities={hotel.amenities} />
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3">Sobre</h2>
          <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Avaliações</h2>
            <button className="text-[#0E64D2]">Ver todas</button>
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
          <h2 className="text-gray-900 mb-4">Selecionar Quarto</h2>
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
        buttonText="Reservar Agora"
        onButtonClick={handleBookNow}
      />
    </MobileScreen>
  );
}