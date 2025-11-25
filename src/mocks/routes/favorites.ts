import { Server, Response } from 'miragejs';
import type { AppRegistry } from '../server';

function getUserFromToken(schema: any, request: any) {
  const token = request.requestHeaders.authorization?.replace('Bearer ', '');
  if (!token) return null;
  const authToken = schema.findBy('authToken', { token });
  if (!authToken) return null;
  return schema.find('user', authToken.userId);
}

export function favoritesRoutes(server: Server<AppRegistry>) {
  // GET /api/users/favorites - Get user's favorite hotels
  server.get('/users/favorites', (schema, request) => {
    const user = getUserFromToken(schema, request);

    // For development: return empty favorites if not authenticated
    if (!user) {
      return { favorites: [] };
    }

    const favorites = schema.where('favorite', { userId: user.id }).models;

    // Handle case where no favorites exist
    if (!favorites || favorites.length === 0) {
      return { favorites: [] };
    }

    // Enrich with hotel data
    const favoritesWithHotels = favorites.map(favorite => {
      const hotel = schema.find('hotel', String(favorite.hotelId));
      return {
        id: favorite.id,
        userId: favorite.userId,
        hotelId: favorite.hotelId,
        addedAt: favorite.addedAt,
        hotel: {
          id: hotel?.id,
          name: hotel?.name,
          location: hotel?.location,
          rating: hotel?.rating,
          reviews: hotel?.reviews,
          price: hotel?.price,
          distance: hotel?.distance,
          image: hotel?.image,
          description: hotel?.description,
          amenities: hotel?.amenities || [],
          images: hotel?.images || [],
          rooms: hotel?.rooms || [],
        },
      };
    });

    return { favorites: favoritesWithHotels };
  });

  // POST /api/users/favorites/:hotelId - Add hotel to favorites
  server.post('/users/favorites/:hotelId', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const hotelId = parseInt(request.params.hotelId);
    const hotel = schema.find('hotel', hotelId);

    if (!hotel) {
      return new Response(404, {}, { error: { code: 'NOT_FOUND', message: 'Hotel não encontrado' } });
    }

    // Check if already favorited
    const existingFavorite = schema.findBy('favorite', { userId: user.id, hotelId });
    if (existingFavorite) {
      return new Response(409, {}, { error: { code: 'ALREADY_EXISTS', message: 'Hotel já está nos favoritos' } });
    }

    const favorite = schema.create('favorite', {
      userId: user.id,
      hotelId,
      addedAt: new Date().toISOString(),
    });

    return {
      success: true,
      favoriteId: favorite.id,
    };
  });

  // DELETE /api/users/favorites/:hotelId - Remove hotel from favorites
  server.del('/users/favorites/:hotelId', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const hotelId = parseInt(request.params.hotelId);
    const favorite = schema.findBy('favorite', { userId: user.id, hotelId });

    if (!favorite) {
      return new Response(404, {}, { error: { code: 'NOT_FOUND', message: 'Favorito não encontrado' } });
    }

    favorite.destroy();

    return { success: true };
  });
}
