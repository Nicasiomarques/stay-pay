import type { Server, Response } from 'miragejs';
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
  server.get('/api/users/favorites', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const favorites = schema.where('favorite', { userId: user.id }).models;

    // Enrich with hotel data
    const favoritesWithHotels = favorites.map(favorite => {
      const hotel = schema.find('hotel', favorite.hotelId);
      return {
        id: favorite.id,
        addedAt: favorite.addedAt,
        hotel: {
          id: hotel?.id,
          name: hotel?.name,
          location: hotel?.location,
          rating: hotel?.rating,
          reviews: hotel?.reviews,
          price: hotel?.price,
          image: hotel?.image,
        },
      };
    });

    return { favorites: favoritesWithHotels };
  });

  // POST /api/users/favorites/:hotelId - Add hotel to favorites
  server.post('/api/users/favorites/:hotelId', (schema, request) => {
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
  server.del('/api/users/favorites/:hotelId', (schema, request) => {
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
