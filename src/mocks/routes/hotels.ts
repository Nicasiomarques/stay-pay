import type { Server, Request, Response } from 'miragejs';
import type { AppRegistry } from '../server';

export function hotelsRoutes(server: Server<AppRegistry>) {
  // GET /api/hotels - Search and filter hotels
  server.get('/api/hotels', (schema, request) => {
    let hotels = schema.all('hotel').models;

    const {
      location,
      checkIn,
      checkOut,
      guests,
      minPrice,
      maxPrice,
      minRating,
      amenities,
      categories,
      sortBy,
      page = '1',
      limit = '10'
    } = request.queryParams;

    // Filter by location
    if (location) {
      hotels = hotels.filter(hotel =>
        hotel.location.toLowerCase().includes(location.toLowerCase()) ||
        hotel.name.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      hotels = hotels.filter(hotel => hotel.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      hotels = hotels.filter(hotel => hotel.price <= parseInt(maxPrice));
    }

    // Filter by rating
    if (minRating) {
      hotels = hotels.filter(hotel => hotel.rating >= parseFloat(minRating));
    }

    // Filter by amenities
    if (amenities) {
      const amenitiesList = Array.isArray(amenities) ? amenities : [amenities];
      hotels = hotels.filter(hotel =>
        amenitiesList.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Filter by categories
    if (categories) {
      const categoriesList = Array.isArray(categories) ? categories : [categories];
      hotels = hotels.filter(hotel => categoriesList.includes(hotel.category));
    }

    // Filter by guest capacity (check if any room can accommodate)
    if (guests) {
      const guestCount = parseInt(guests);
      hotels = hotels.filter(hotel =>
        hotel.rooms.some((room: any) => room.capacity >= guestCount)
      );
    }

    // Sort hotels
    if (sortBy === 'preço: baixo a alto') {
      hotels.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'avaliação') {
      hotels.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'distância') {
      hotels.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });
    }
    // Default: recomendado (by rating)
    else {
      hotels.sort((a, b) => b.rating - a.rating);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedHotels = hotels.slice(startIndex, endIndex);

    return {
      hotels: paginatedHotels,
      total: hotels.length,
      page: pageNum,
      limit: limitNum,
    };
  });

  // GET /api/hotels/:id - Get hotel details
  server.get('/api/hotels/:id', (schema, request) => {
    const id = request.params.id;
    const hotel = schema.find('hotel', id);

    if (!hotel) {
      return new Response(
        404,
        {},
        { error: { code: 'NOT_FOUND', message: 'Hotel não encontrado' } }
      );
    }

    return hotel;
  });

  // GET /api/hotels/:hotelId/rooms/availability - Check room availability
  server.get('/api/hotels/:hotelId/rooms/availability', (schema, request) => {
    const hotelId = request.params.hotelId;
    const { checkIn, checkOut, guests } = request.queryParams;

    if (!checkIn || !checkOut || !guests) {
      return new Response(
        400,
        {},
        { error: { code: 'VALIDATION_ERROR', message: 'Parâmetros obrigatórios: checkIn, checkOut, guests' } }
      );
    }

    const hotel = schema.find('hotel', hotelId);
    if (!hotel) {
      return new Response(
        404,
        {},
        { error: { code: 'NOT_FOUND', message: 'Hotel não encontrado' } }
      );
    }

    const guestCount = parseInt(guests);
    const availableRooms = hotel.rooms.map((room: any) => ({
      ...room,
      available: room.capacity >= guestCount,
      remainingRooms: Math.floor(Math.random() * 10) + 1, // Mock availability
    }));

    return {
      available: availableRooms.some((room: any) => room.available),
      rooms: availableRooms,
    };
  });

  // GET /api/hotels/featured - Get featured hotels
  server.get('/api/hotels/featured', (schema, request) => {
    const limit = parseInt(request.queryParams.limit || '3');
    const hotels = schema.all('hotel').models;

    // Get top-rated hotels
    const featured = hotels
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);

    return { hotels: featured };
  });

  // GET /api/hotels/popular - Get popular hotels
  server.get('/api/hotels/popular', (schema, request) => {
    const limit = parseInt(request.queryParams.limit || '10');
    const hotels = schema.all('hotel').models;

    // Get hotels with rating >= 4.7
    const popular = hotels
      .filter(hotel => hotel.rating >= 4.7)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);

    return { hotels: popular };
  });

  // GET /api/destinations - Get popular destinations
  server.get('/api/destinations', (schema) => {
    const hotels = schema.all('hotel').models;

    // Group hotels by location and count
    const destinationsMap = new Map<string, { name: string; hotelCount: number; image: string }>();

    hotels.forEach(hotel => {
      const location = hotel.location;
      if (destinationsMap.has(location)) {
        const dest = destinationsMap.get(location)!;
        dest.hotelCount++;
      } else {
        destinationsMap.set(location, {
          name: location,
          hotelCount: 1,
          image: hotel.image,
        });
      }
    });

    const destinations = Array.from(destinationsMap.values())
      .sort((a, b) => b.hotelCount - a.hotelCount)
      .slice(0, 8); // Top 8 destinations

    return { destinations };
  });
}
