import type { Server, Response } from 'miragejs';
import type { AppRegistry } from '../server';

// Helper to verify authentication
function getUserFromToken(schema: any, request: any) {
  const token = request.requestHeaders.authorization?.replace('Bearer ', '');
  if (!token) {
    return null;
  }

  const authToken = schema.findBy('authToken', { token });
  if (!authToken) {
    return null;
  }

  return schema.find('user', authToken.userId);
}

export function bookingsRoutes(server: Server<AppRegistry>) {
  // POST /api/bookings - Create new booking
  server.post('/api/bookings', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(
        401,
        {},
        { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } }
      );
    }

    const attrs = JSON.parse(request.requestBody);
    const { hotelId, roomId, checkIn, checkOut, guests, guestDetails, paymentMethod, pricing } = attrs;

    // Validate required fields
    if (!hotelId || !roomId || !checkIn || !checkOut || !guests || !guestDetails || !paymentMethod || !pricing) {
      return new Response(
        400,
        {},
        { error: { code: 'VALIDATION_ERROR', message: 'Campos obrigatórios faltando' } }
      );
    }

    // Verify hotel exists
    const hotel = schema.find('hotel', hotelId);
    if (!hotel) {
      return new Response(
        404,
        {},
        { error: { code: 'NOT_FOUND', message: 'Hotel não encontrado' } }
      );
    }

    // Create booking
    const booking = schema.create('booking', {
      userId: user.id,
      hotelId,
      roomId,
      checkIn,
      checkOut,
      guests,
      guestDetails,
      paymentMethod,
      pricing,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    });

    // Create notification
    schema.create('notification', {
      userId: user.id,
      type: 'booking_confirmed',
      title: 'Reserva Confirmada',
      message: `Sua reserva ${booking.id} foi confirmada com sucesso`,
      read: false,
      createdAt: new Date().toISOString(),
      data: { bookingId: booking.id },
    });

    return {
      bookingId: booking.id,
      status: booking.status,
      confirmationCode: booking.confirmationCode,
      qrCode: booking.qrCode,
      createdAt: booking.createdAt,
    };
  });

  // GET /api/bookings/:bookingId - Get booking details
  server.get('/api/bookings/:bookingId', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(
        401,
        {},
        { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } }
      );
    }

    const bookingId = request.params.bookingId;
    const booking = schema.find('booking', bookingId);

    if (!booking) {
      return new Response(
        404,
        {},
        { error: { code: 'NOT_FOUND', message: 'Reserva não encontrada' } }
      );
    }

    // Verify user owns this booking
    if (booking.userId !== user.id) {
      return new Response(
        403,
        {},
        { error: { code: 'FORBIDDEN', message: 'Acesso negado' } }
      );
    }

    const hotel = schema.find('hotel', booking.hotelId);
    const room = hotel?.rooms.find((r: any) => r.id === booking.roomId);

    return {
      id: booking.id,
      hotel: {
        id: hotel?.id,
        name: hotel?.name,
        location: hotel?.location,
        image: hotel?.image,
      },
      room: {
        type: room?.type,
      },
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      status: booking.status,
      total: booking.pricing.total,
      qrCode: booking.qrCode,
    };
  });

  // PATCH /api/bookings/:bookingId/cancel - Cancel a booking
  server.patch('/api/bookings/:bookingId/cancel', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(
        401,
        {},
        { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } }
      );
    }

    const bookingId = request.params.bookingId;
    const booking = schema.find('booking', bookingId);

    if (!booking) {
      return new Response(
        404,
        {},
        { error: { code: 'NOT_FOUND', message: 'Reserva não encontrada' } }
      );
    }

    // Verify user owns this booking
    if (booking.userId !== user.id) {
      return new Response(
        403,
        {},
        { error: { code: 'FORBIDDEN', message: 'Acesso negado' } }
      );
    }

    // Check if booking can be cancelled
    if (booking.status === 'Cancelled') {
      return new Response(
        400,
        {},
        { error: { code: 'INVALID_STATUS', message: 'Reserva já foi cancelada' } }
      );
    }

    // Update booking status
    booking.update({ status: 'Cancelled' });

    // Create notification
    schema.create('notification', {
      userId: user.id,
      type: 'booking_cancelled',
      title: 'Reserva Cancelada',
      message: `Sua reserva ${booking.id} foi cancelada`,
      read: false,
      createdAt: new Date().toISOString(),
      data: { bookingId: booking.id },
    });

    return {
      bookingId: booking.id,
      status: 'Cancelled',
      refundAmount: booking.pricing.subtotal,
      refundStatus: 'Processing',
    };
  });

  // GET /api/users/bookings - Get all user bookings
  server.get('/api/users/bookings', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(
        401,
        {},
        { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } }
      );
    }

    const { status, page = '1', limit = '10' } = request.queryParams;

    let bookings = schema.where('booking', { userId: user.id }).models;

    // Filter by status
    if (status === 'upcoming') {
      const now = new Date();
      bookings = bookings.filter(booking => new Date(booking.checkIn) > now && booking.status === 'Confirmed');
    } else if (status === 'completed') {
      const now = new Date();
      bookings = bookings.filter(booking => new Date(booking.checkOut) < now || booking.status === 'Completed');
    } else if (status === 'cancelled') {
      bookings = bookings.filter(booking => booking.status === 'Cancelled');
    }

    // Sort by creation date (newest first)
    bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedBookings = bookings.slice(startIndex, endIndex);

    // Enrich with hotel data
    const bookingsWithHotels = paginatedBookings.map(booking => {
      const hotel = schema.find('hotel', booking.hotelId);
      return {
        id: booking.id,
        hotel: hotel?.name,
        location: hotel?.location,
        image: hotel?.image,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        status: booking.status,
        total: booking.pricing.total,
        createdAt: booking.createdAt,
      };
    });

    return {
      bookings: bookingsWithHotels,
      total: bookings.length,
      page: pageNum,
    };
  });

  // GET /api/users/bookings/upcoming - Get upcoming bookings
  server.get('/api/users/bookings/upcoming', (schema, request) => {
    request.queryParams.status = 'upcoming';
    return server.schema.first('booking'); // This will be handled by the main /api/users/bookings handler
  });

  // GET /api/users/bookings/past - Get past bookings
  server.get('/api/users/bookings/past', (schema, request) => {
    request.queryParams.status = 'completed';
    return server.schema.first('booking'); // This will be handled by the main /api/users/bookings handler
  });
}
