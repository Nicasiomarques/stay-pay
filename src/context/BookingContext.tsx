import { createContext, useContext, useState, ReactNode } from 'react';
import { Hotel } from '@types';
import { PRICING } from '@constants';

interface BookingState {
  hotel: Hotel | null;
  selectedRoom: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  searchLocation: string;
  paymentMethod: string;
}

interface BookingContextType {
  booking: BookingState;
  setHotel: (hotel: Hotel) => void;
  setSelectedRoom: (roomIndex: number) => void;
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setGuests: (guests: number) => void;
  setSearchLocation: (location: string) => void;
  setPaymentMethod: (method: string) => void;
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

  const setHotel = (hotel: Hotel) => {
    setBooking(prev => ({ ...prev, hotel }));
  };

  const setSelectedRoom = (roomIndex: number) => {
    setBooking(prev => ({ ...prev, selectedRoom: roomIndex }));
  };

  const setDates = (checkIn: Date | null, checkOut: Date | null) => {
    setBooking(prev => ({ ...prev, checkIn, checkOut }));
  };

  const setGuests = (guests: number) => {
    setBooking(prev => ({ ...prev, guests }));
  };

  const setSearchLocation = (location: string) => {
    setBooking(prev => ({ ...prev, searchLocation: location }));
  };

  const setPaymentMethod = (method: string) => {
    setBooking(prev => ({ ...prev, paymentMethod: method }));
  };

  const resetBooking = () => {
    setBooking(initialState);
  };

  const getNights = () => {
    if (!booking.checkIn || !booking.checkOut) return 0;
    const diffTime = Math.abs(booking.checkOut.getTime() - booking.checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    if (!booking.hotel) return 0;
    const nights = getNights();
    const roomPrice = booking.hotel.rooms[booking.selectedRoom]?.price || 0;
    const subtotal = nights * roomPrice;
    const tax = Math.round(subtotal * PRICING.TAX_RATE);
    return subtotal + PRICING.SERVICE_FEE + tax;
  };

  return (
    <BookingContext.Provider
      value={{
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
      }}
    >
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
