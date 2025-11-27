import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { Hotel } from '@types';
import { PRICING } from '@/utils/pricing';

export type PaymentMethod = 'card' | 'mobile' | 'property';
export type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';

export interface GuestsCount {
  adults: number;
  children: number;
}

interface BookingState {
  hotel: Hotel | null;
  selectedRoom: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestsCount;
  searchLocation: string;
  paymentMethod: PaymentMethod;
  quickFilter: string;
}

interface BookingContextType {
  booking: BookingState;
  setHotel: (hotel: Hotel) => void;
  setSelectedRoom: (roomIndex: number) => void;
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setGuests: (guests: GuestsCount) => void;
  setSearchLocation: (location: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setQuickFilter: (filter: string) => void;
  resetBooking: () => void;
  calculateTotal: () => number;
  getNights: () => number;
  getTotalGuests: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  hotel: null,
  selectedRoom: 0,
  checkIn: null,
  checkOut: null,
  guests: { adults: 2, children: 0 },
  searchLocation: '',
  paymentMethod: 'card',
  quickFilter: '',
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

  const setGuests = useCallback((guests: GuestsCount) => {
    setBooking(prev => ({ ...prev, guests }));
  }, []);

  const getTotalGuests = useCallback(() => {
    return booking.guests.adults + booking.guests.children;
  }, [booking.guests]);

  const setSearchLocation = useCallback((location: string) => {
    setBooking(prev => ({ ...prev, searchLocation: location }));
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setBooking(prev => ({ ...prev, paymentMethod: method }));
  }, []);

  const setQuickFilter = useCallback((filter: string) => {
    setBooking(prev => ({ ...prev, quickFilter: filter }));
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
      setQuickFilter,
      resetBooking,
      calculateTotal,
      getNights,
      getTotalGuests,
    }),
    [
      booking,
      setHotel,
      setSelectedRoom,
      setDates,
      setGuests,
      setSearchLocation,
      setPaymentMethod,
      setQuickFilter,
      resetBooking,
      calculateTotal,
      getNights,
      getTotalGuests,
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
