/**
 * useFilteredHotels Hook
 * Applies filters to hotel list
 */

import { useMemo } from 'react';
import { FilterState } from '@/types/filters';
import { Hotel } from '@/types/hotel';

export function useFilteredHotels(hotels: Hotel[], filters: FilterState) {
  return useMemo(() => {
    let result = [...hotels];

    // Apply price range filter
    result = result.filter(hotel => {
      return hotel.price >= filters.priceRange[0] &&
             hotel.price <= filters.priceRange[1];
    });

    // Apply property type filter
    // Since the Hotel type doesn't have category, we'll infer it from price ranges and amenities
    if (filters.propertyTypes.length > 0) {
      result = result.filter(hotel => {
        return filters.propertyTypes.some(type => {
          // Map property types based on hotel characteristics
          if (type === 'luxury') return hotel.price >= 300000;
          if (type === 'resort') return hotel.amenities?.some(a =>
            a.toLowerCase().includes('pool') ||
            a.toLowerCase().includes('beach') ||
            a.toLowerCase().includes('spa')
          );
          if (type === 'business') return hotel.amenities?.some(a =>
            a.toLowerCase().includes('wifi') ||
            a.toLowerCase().includes('meeting')
          );
          if (type === 'budget') return hotel.price < 150000;
          if (type === 'boutique') return hotel.price >= 150000 && hotel.price < 300000;
          return true;
        });
      });
    }

    // Apply amenities filter (hotel must have ALL selected amenities)
    if (filters.amenities.length > 0) {
      result = result.filter(hotel => {
        return filters.amenities.every(amenity => {
          return hotel.amenities?.some(hotelAmenity =>
            hotelAmenity.toLowerCase().includes(amenity.toLowerCase()) ||
            amenity.toLowerCase().includes(hotelAmenity.toLowerCase())
          );
        });
      });
    }

    // Apply rating filter
    if (filters.minRating > 0) {
      result = result.filter(hotel => hotel.rating >= filters.minRating);
    }

    // Apply guest capacity filter
    if (filters.guestCapacity) {
      result = result.filter(hotel => {
        if (!hotel.rooms || hotel.rooms.length === 0) return true;
        return hotel.rooms.some(room => room.capacity >= filters.guestCapacity!);
      });
    }

    // Special features filter (implement based on hotel data)
    // For now, treating special features as amenities
    if (filters.specialFeatures.length > 0) {
      result = result.filter(hotel => {
        return filters.specialFeatures.some(feature => {
          // Map special features to amenities or categories
          if (feature === 'pet-friendly') {
            return hotel.amenities?.some(a => a.toLowerCase().includes('pet'));
          }
          if (feature === 'family-friendly') {
            return hotel.amenities?.some(a =>
              a.toLowerCase().includes('family') ||
              a.toLowerCase().includes('kids') ||
              a.toLowerCase().includes('playground')
            );
          }
          if (feature === 'romantic') {
            return hotel.price >= 300000 ||
                   hotel.amenities?.some(a => a.toLowerCase().includes('spa'));
          }
          if (feature === 'eco-friendly') {
            return hotel.amenities?.some(a => a.toLowerCase().includes('eco'));
          }
          return false;
        });
      });
    }

    return result;
  }, [hotels, filters]);
}
