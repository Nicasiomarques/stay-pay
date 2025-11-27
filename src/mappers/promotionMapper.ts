/**
 * Promotion Mapper
 * Transforms API DTOs to domain models used in components
 */

import { Deal, TrendingDestination, LastMinuteDeal } from '@/types';
import { DealDTO, TrendingDestinationDTO, LastMinuteDealDTO } from '@/types/dto';

/**
 * Maps a DealDTO from API to domain Deal model
 */
export const mapDealDTOToDeal = (dealDTO: DealDTO): Deal => {
  return {
    id: dealDTO.id,
    title: dealDTO.title,
    subtitle: dealDTO.subtitle,
    discount: dealDTO.discount,
    image: dealDTO.image,
    backgroundColor: dealDTO.backgroundColor,
    validUntil: dealDTO.validUntil ? new Date(dealDTO.validUntil) : undefined,
  };
};

/**
 * Maps an array of DealDTOs to domain Deal models
 */
export const mapDealDTOsToDeals = (dealDTOs: DealDTO[]): Deal[] => {
  return dealDTOs.map(mapDealDTOToDeal);
};

/**
 * Maps a TrendingDestinationDTO from API to domain TrendingDestination model
 */
export const mapTrendingDestinationDTOToTrendingDestination = (
  destinationDTO: TrendingDestinationDTO
): TrendingDestination => {
  return {
    id: destinationDTO.id,
    name: destinationDTO.name,
    province: destinationDTO.province,
    image: destinationDTO.image,
    hotelsCount: destinationDTO.hotelsCount,
    trending: destinationDTO.trending,
  };
};

/**
 * Maps an array of TrendingDestinationDTOs
 */
export const mapTrendingDestinationDTOsToTrendingDestinations = (
  destinationDTOs: TrendingDestinationDTO[]
): TrendingDestination[] => {
  return destinationDTOs.map(mapTrendingDestinationDTOToTrendingDestination);
};

/**
 * Maps a LastMinuteDealDTO from API to domain LastMinuteDeal model
 */
export const mapLastMinuteDealDTOToLastMinuteDeal = (
  dealDTO: LastMinuteDealDTO
): LastMinuteDeal => {
  return {
    id: dealDTO.id,
    hotelId: dealDTO.hotelId,
    name: dealDTO.name,
    location: dealDTO.location,
    image: dealDTO.image,
    rating: dealDTO.rating,
    originalPrice: dealDTO.originalPrice,
    discountedPrice: dealDTO.discountedPrice,
    expiresIn: dealDTO.expiresIn,
  };
};

/**
 * Maps an array of LastMinuteDealDTOs
 */
export const mapLastMinuteDealDTOsToLastMinuteDeals = (
  dealDTOs: LastMinuteDealDTO[]
): LastMinuteDeal[] => {
  return dealDTOs.map(mapLastMinuteDealDTOToLastMinuteDeal);
};
