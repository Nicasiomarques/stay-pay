import { useNavigate } from "react-router-dom";
import { MobileScreen, Button, HeaderWithBack } from "@components";
import BookingDetailItem from "./components/BookingDetailItem";
import PriceBreakdown from "./components/PriceBreakdown";
import { MapPin, Calendar, Users, Info } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useBooking } from "@context";
import { formatFullDate } from "@/utils";
import { formatCurrency, formatGuestCount, formatNightCount } from "@/utils/formatters";
import { PRICING } from "@constants";

export default function BookingReview() {
  const navigate = useNavigate();
  const { booking, setGuests, getNights, calculateTotal } = useBooking();

  if (!booking.hotel) {
    navigate("/home");
    return null;
  }

  const nights = getNights();
  const roomPrice = booking.hotel.rooms[booking.selectedRoom]?.price || 0;
  const subtotal = nights * roomPrice;
  const serviceFee = PRICING.SERVICE_FEE;
  const tax = Math.round(subtotal * PRICING.TAX_RATE);
  const total = calculateTotal();

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <HeaderWithBack title="Rever Reserva" />

      <div className="p-6 space-y-4 pb-32">
        {/* Hotel Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={booking.hotel.image}
                alt={booking.hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">{booking.hotel.name}</h2>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{booking.hotel.location}</span>
              </div>
              <p className="text-sm text-gray-600">
                {booking.hotel.rooms[booking.selectedRoom].type}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-gray-900 mb-4">Detalhes da Reserva</h2>

          <div className="space-y-4">
            <BookingDetailItem
              icon={Calendar}
              label="Check-in"
              value={formatFullDate(booking.checkIn)}
            />

            <BookingDetailItem
              icon={Calendar}
              label="Check-out"
              value={formatFullDate(booking.checkOut)}
            />

            <BookingDetailItem
              icon={Users}
              label="Hóspedes"
              value={formatGuestCount(booking.guests)}
              actions={
                <>
                  <button
                    onClick={() => setGuests(Math.max(1, booking.guests - 1))}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setGuests(booking.guests + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </>
              }
            />
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-gray-900 mb-4">Discriminação de Preços</h2>
          <PriceBreakdown
            items={[
              { label: `${formatCurrency(roomPrice)} × ${formatNightCount(nights)}`, amount: subtotal },
              { label: "Taxa de serviço", amount: serviceFee },
              { label: "Impostos", amount: tax },
            ]}
            total={total}
          />
        </div>

        {/* Cancellation Policy */}
        <div className="bg-[#0E64D2]/5 rounded-2xl p-5 border border-[#0E64D2]/10">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-[#0E64D2] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-gray-900 mb-2">Política de Cancelamento</h3>
              <p className="text-sm text-gray-600">
                Cancelamento gratuito até{" "}
                {booking.checkIn &&
                  formatFullDate(
                    new Date(booking.checkIn.getTime() - 7 * 24 * 60 * 60 * 1000)
                  )}
                . Cancele antes do check-in para reembolso parcial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto shadow-lg">
        <Button fullWidth onClick={() => navigate("/payment")}>
          Continuar para Pagamento
        </Button>
      </div>
    </MobileScreen>
  );
}
