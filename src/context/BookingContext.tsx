import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { Hotel } from '@types';
import { PRICING } from '@constants';

export type PaymentMethod = 'card' | 'mobile' | 'property';
export type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';

interface BookingState {
  hotel: Hotel | null;
  selectedRoom: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  searchLocation: string;
  paymentMethod: PaymentMethod;
}

interface BookingContextType {
  booking: BookingState;
  setHotel: (hotel: Hotel) => void;
  setSelectedRoom: (roomIndex: number) => void;
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setGuests: (guests: number) => void;
  setSearchLocation: (location: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  resetBooking: () => void;
  calculateTotal: () => number;
  getNights: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  hotel: null,
  selectedRoom: 0,
  checkIn: null,
  checkOut: null,
  guests: 2,
  searchLocation: '',
  paymentMethod: 'card',
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialState);

  const setHotel = useCallback((hotel: Hotel) => {
    setBooking(prev => ({ ...prev, hotel }));
  }, []);

  const setSelectedRoom = useCallback((roomIndex: number) => {
    setBooking(prev => ({ ...prev, selectedRoom: roomIndex }));
  }, []);

  const setDates = useCallback((checkIn: Date | null, checkOut: Date | null) => {
    setBooking(prev => ({ ...prev, checkIn, checkOut }));
  }, []);

  const setGuests = useCallback((guests: number) => {
    setBooking(prev => ({ ...prev, guests }));
  }, []);

  const setSearchLocation = useCallback((location: string) => {
    setBooking(prev => ({ ...prev, searchLocation: location }));
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setBooking(prev => ({ ...prev, paymentMethod: method }));
  }, []);

  const resetBooking = useCallback(() => {
    setBooking(initialState);
  }, []);

  const getNights = useCallback(() => {
    if (!booking.checkIn || !booking.checkOut) return 0;
    const diffTime = Math.abs(booking.checkOut.getTime() - booking.checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [booking.checkIn, booking.checkOut]);

  const calculateTotal = useCallback(() => {
    if (!booking.hotel) return 0;
    const nights = getNights();
    const roomPrice = booking.hotel.rooms[booking.selectedRoom]?.price || 0;
    const subtotal = nights * roomPrice;
    const tax = Math.round(subtotal * PRICING.TAX_RATE);
    return subtotal + PRICING.SERVICE_FEE + tax;
  }, [booking.hotel, booking.selectedRoom, getNights]);

  const value = useMemo(
    () => ({
      booking,
      setHotel,
      setSelectedRoom,
      setDates,
      setGuests,
      setSearchLocation,
      setPaymentMethod,
      resetBooking,
      calculateTotal,
      getNights,
    }),
    [
      booking,
      setHotel,
      setSelectedRoom,
      setDates,
      setGuests,
      setSearchLocation,
      setPaymentMethod,
      resetBooking,
      calculateTotal,
      getNights,
    ]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
