/**
 * Booking Mapper
 * Transforms API DTOs to domain models used in components
 */

import { BookingDTO, BookingListDTO, CreateBookingRequestDTO } from '@/types/dto';

/**
 * Extended Booking model with all API fields
 */
export interface BookingDetail {
  id: string;
  userId: string;
  hotelId: number;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestDetails: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: 'card' | 'mobile-money';
  paymentDetails?: {
    cardNumber?: string;
    cardHolder?: string;
  };
  pricing: {
    subtotal: number;
    serviceFee: number;
    tax: number;
    total: number;
  };
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  confirmationCode: string;
  qrCode: string;
  createdAt: string;
}

/**
 * Simplified booking model for list views
 */
export interface BookingListItem {
  id: string;
  hotel: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  total: number;
  createdAt: string;
}

/**
 * Maps BookingDTO from API to BookingDetail model
 */
export const mapBookingDTOToBookingDetail = (bookingDTO: BookingDTO): BookingDetail => {
  return {
    id: bookingDTO.id,
    userId: bookingDTO.userId,
    hotelId: bookingDTO.hotelId,
    roomId: bookingDTO.roomId,
    checkIn: bookingDTO.checkIn,
    checkOut: bookingDTO.checkOut,
    guests: bookingDTO.guests,
    guestDetails: bookingDTO.guestDetails,
    paymentMethod: bookingDTO.paymentMethod,
    paymentDetails: bookingDTO.paymentDetails,
    pricing: bookingDTO.pricing,
    status: bookingDTO.status,
    confirmationCode: bookingDTO.confirmationCode,
    qrCode: bookingDTO.qrCode,
    createdAt: bookingDTO.createdAt,
  };
};

/**
 * Maps an array of BookingDTOs to BookingDetail models
 */
export const mapBookingDTOsToBookingDetails = (bookingDTOs: BookingDTO[]): BookingDetail[] => {
  return bookingDTOs.map(mapBookingDTOToBookingDetail);
};

/**
 * Maps BookingListDTO from API to BookingListItem model
 */
export const mapBookingListDTOToBookingListItem = (dto: BookingListDTO): BookingListItem => {
  return {
    id: dto.id,
    hotel: dto.hotel,
    location: dto.location,
    image: dto.image,
    checkIn: dto.checkIn,
    checkOut: dto.checkOut,
    guests: dto.guests,
    status: dto.status,
    total: dto.total,
    createdAt: dto.createdAt,
  };
};

/**
 * Maps an array of BookingListDTOs to BookingListItem models
 */
export const mapBookingListDTOsToBookingListItems = (dtos: BookingListDTO[]): BookingListItem[] => {
  return dtos.map(mapBookingListDTOToBookingListItem);
};

/**
 * Maps booking data from context to CreateBookingRequest
 */
export interface CreateBookingParams {
  hotelId: number;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: 'card' | 'mobile-money';
  cardNumber?: string;
  cardHolder?: string;
}

export const mapCreateBookingParamsToDTO = (
  params: CreateBookingParams
): CreateBookingRequestDTO => {
  return {
    hotelId: params.hotelId,
    roomId: params.roomId,
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    guests: params.guests,
    guestDetails: {
      name: params.guestName,
      email: params.guestEmail,
      phone: params.guestPhone,
    },
    paymentMethod: params.paymentMethod,
    paymentDetails:
      params.paymentMethod === 'card'
        ? {
            cardNumber: params.cardNumber,
            cardHolder: params.cardHolder,
          }
        : undefined,
  };
};
