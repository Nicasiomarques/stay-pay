/**
 * Hotel Mapper
 * Transforms API DTOs to domain models used in components
 */

import { Hotel, Room } from '@/types';
import { HotelDTO, RoomDTO, DestinationDTO } from '@/types/dto';

/**
 * Maps a RoomDTO from API to domain Room model
 */
export const mapRoomDTOToRoom = (roomDTO: RoomDTO): Room => {
  return {
    id: roomDTO.id,
    type: roomDTO.type,
    price: roomDTO.price,
    capacity: roomDTO.capacity,
  };
};

/**
 * Maps a HotelDTO from API to domain Hotel model
 */
export const mapHotelDTOToHotel = (hotelDTO: HotelDTO): Hotel => {
  return {
    id: hotelDTO.id,
    name: hotelDTO.name,
    location: hotelDTO.location,
    rating: hotelDTO.rating,
    reviews: hotelDTO.reviews,
    price: hotelDTO.price,
    distance: hotelDTO.distance,
    image: hotelDTO.image,
    description: hotelDTO.description,
    amenities: hotelDTO.amenities,
    images: hotelDTO.images,
    rooms: hotelDTO.rooms.map(mapRoomDTOToRoom),
  };
};

/**
 * Maps an array of HotelDTOs to domain Hotel models
 */
export const mapHotelDTOsToHotels = (hotelDTOs: HotelDTO[]): Hotel[] => {
  return hotelDTOs.map(mapHotelDTOToHotel);
};

/**
 * Maps a DestinationDTO to a simpler structure for components
 */
export interface Destination {
  name: string;
  hotelCount: number;
  image: string;
}

export const mapDestinationDTOToDestination = (destinationDTO: DestinationDTO): Destination => {
  return {
    name: destinationDTO.name,
    hotelCount: destinationDTO.hotelCount,
    image: destinationDTO.image,
  };
};

/**
 * Maps an array of DestinationDTOs
 */
export const mapDestinationDTOsToDestinations = (
  destinationDTOs: DestinationDTO[]
): Destination[] => {
  return destinationDTOs.map(mapDestinationDTOToDestination);
};
