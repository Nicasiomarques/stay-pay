import { Server, Response } from 'miragejs';
import type { Request } from 'miragejs';
import type { AppRegistry } from '../server';

export function hotelsRoutes(server: Server<AppRegistry>) {
  // IMPORTANT: Register specific routes BEFORE generic ones with params
  // MirageJS matches routes in order, so /api/hotels/featured must come before /api/hotels/:id

  console.log('🔧 Registering hotels routes...');

  // GET /api/hotels/featured - Get featured hotels
  server.get('/hotels/featured', (schema, request) => {
    console.log('✅ Featured hotels route hit');
    const limitParam = request.queryParams.limit;
    const limit = parseInt(Array.isArray(limitParam) ? limitParam[0] : limitParam || '3');
    const hotels = schema.all('hotel').models;

    // Get top-rated hotels
    const featured = hotels
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);

    return { hotels: featured };
  });

  // GET /api/hotels/popular - Get popular hotels
  server.get('/hotels/popular', (schema, request) => {
    const limitParam = request.queryParams.limit;
    const limit = parseInt(Array.isArray(limitParam) ? limitParam[0] : limitParam || '10');
    const hotels = schema.all('hotel').models;

    // Get hotels with rating >= 4.7
    const popular = hotels
      .filter(hotel => hotel.rating >= 4.7)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);

    return { hotels: popular };
  });

  // GET /api/hotels/:hotelId/rooms/availability - Check room availability
  server.get('/hotels/:hotelId/rooms/availability', (schema, request) => {
    const hotelId = request.params.hotelId;
    const checkInParam = request.queryParams.checkIn;
    const checkOutParam = request.queryParams.checkOut;
    const guestsParam = request.queryParams.guests;

    const checkIn = Array.isArray(checkInParam) ? checkInParam[0] : checkInParam;
    const checkOut = Array.isArray(checkOutParam) ? checkOutParam[0] : checkOutParam;
    const guests = Array.isArray(guestsParam) ? guestsParam[0] : guestsParam;

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

  // GET /api/hotels/:id - Get hotel details
  server.get('/hotels/:id', (schema, request) => {
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

  // GET /api/hotels - Search and filter hotels
  server.get('/hotels', (schema, request) => {
    let hotels = schema.all('hotel').models;

    // Extract and normalize query params (handle string arrays)
    const getParam = (key: string): string | undefined => {
      const value = request.queryParams[key];
      if (!value) return undefined;
      return Array.isArray(value) ? value[0] : value;
    };

    const location = getParam('location');
    const minPrice = getParam('minPrice');
    const maxPrice = getParam('maxPrice');
    const minRating = getParam('minRating');
    const guests = getParam('guests');
    const sortBy = getParam('sortBy');
    const page = getParam('page') || '1';
    const limit = getParam('limit') || '10';

    // Amenities and categories can be arrays
    const amenitiesParam = request.queryParams.amenities;
    const amenities = amenitiesParam ? (Array.isArray(amenitiesParam) ? amenitiesParam : [amenitiesParam]) : null;

    const categoriesParam = request.queryParams.categories;
    const categories = categoriesParam ? (Array.isArray(categoriesParam) ? categoriesParam : [categoriesParam]) : null;

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
      hotels = hotels.filter(hotel =>
        amenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Filter by categories
    if (categories) {
      hotels = hotels.filter(hotel => categories.includes(hotel.category));
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

  // GET /api/destinations - Get popular destinations
  server.get('/destinations', (schema) => {
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
