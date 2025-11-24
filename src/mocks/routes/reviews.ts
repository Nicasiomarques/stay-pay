import type { Server, Response } from 'miragejs';
import type { AppRegistry } from '../server';

function getUserFromToken(schema: any, request: any) {
  const token = request.requestHeaders.authorization?.replace('Bearer ', '');
  if (!token) return null;
  const authToken = schema.findBy('authToken', { token });
  if (!authToken) return null;
  return schema.find('user', authToken.userId);
}

export function reviewsRoutes(server: Server<AppRegistry>) {
  // GET /api/hotels/:hotelId/reviews - Get reviews for a hotel
  server.get('/api/hotels/:hotelId/reviews', (schema, request) => {
    const hotelId = parseInt(request.params.hotelId);
    const { page = '1', limit = '10', sortBy = 'recent' } = request.queryParams;

    const hotel = schema.find('hotel', hotelId);
    if (!hotel) {
      return new Response(404, {}, { error: { code: 'NOT_FOUND', message: 'Hotel não encontrado' } });
    }

    let reviews = schema.where('review', { hotelId }).models;

    // Sort reviews
    if (sortBy === 'recent') {
      reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'rating') {
      reviews.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'helpful') {
      reviews.sort((a, b) => b.helpful - a.helpful);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedReviews = reviews.slice(startIndex, endIndex);

    // Calculate rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
    });

    return {
      reviews: paginatedReviews,
      total: hotel.reviews,
      averageRating: hotel.rating,
      ratingDistribution,
    };
  });

  // POST /api/hotels/:hotelId/reviews - Submit a review
  server.post('/api/hotels/:hotelId/reviews', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const hotelId = parseInt(request.params.hotelId);
    const hotel = schema.find('hotel', hotelId);
    if (!hotel) {
      return new Response(404, {}, { error: { code: 'NOT_FOUND', message: 'Hotel não encontrado' } });
    }

    const attrs = JSON.parse(request.requestBody);
    const { bookingId, rating, comment, images = [] } = attrs;

    if (!bookingId || !rating || !comment) {
      return new Response(400, {}, { error: { code: 'VALIDATION_ERROR', message: 'Campos obrigatórios faltando' } });
    }

    // Verify booking exists and belongs to user
    const booking = schema.find('booking', bookingId);
    if (!booking || booking.userId !== user.id) {
      return new Response(403, {}, { error: { code: 'FORBIDDEN', message: 'Reserva inválida' } });
    }

    // Create review
    const review = schema.create('review', {
      hotelId,
      userId: user.id,
      bookingId,
      author: {
        name: user.name,
        avatar: user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      rating,
      date: new Date().toISOString(),
      comment,
      helpful: 0,
      images,
    });

    // Update hotel review count and rating
    const allReviews = schema.where('review', { hotelId }).models;
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    hotel.update({
      reviews: allReviews.length,
      rating: Math.round(avgRating * 10) / 10,
    });

    return {
      reviewId: review.id,
      status: 'published',
    };
  });

  // PATCH /api/reviews/:reviewId/helpful - Mark review as helpful
  server.patch('/api/reviews/:reviewId/helpful', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const reviewId = parseInt(request.params.reviewId);
    const review = schema.find('review', reviewId);

    if (!review) {
      return new Response(404, {}, { error: { code: 'NOT_FOUND', message: 'Avaliação não encontrada' } });
    }

    // Increment helpful count
    review.update({ helpful: review.helpful + 1 });

    return {
      success: true,
      helpfulCount: review.helpful,
    };
  });
}
