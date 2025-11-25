import { Server, Response } from 'miragejs';
import type { AppRegistry } from '../server';

function getUserFromToken(schema: any, request: any) {
  const token = request.requestHeaders.authorization?.replace('Bearer ', '');
  if (!token) return null;
  const authToken = schema.findBy('authToken', { token });
  if (!authToken) return null;
  return schema.find('user', authToken.userId);
}

export function paymentsRoutes(server: Server<AppRegistry>) {
  // POST /api/payments/process - Process card payment
  server.post('/payments/process', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const attrs = JSON.parse(request.requestBody);
    const { bookingId, paymentMethod, amount, currency, paymentDetails } = attrs;

    if (!bookingId || !paymentMethod || !amount || !currency || !paymentDetails) {
      return new Response(400, {}, { error: { code: 'VALIDATION_ERROR', message: 'Campos obrigatórios faltando' } });
    }

    // Simulate payment processing delay
    const payment = schema.create('payment', {
      bookingId,
      userId: user.id,
      amount,
      currency,
      method: paymentMethod,
      status: 'success',
      transactionId: `TXN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
      createdAt: new Date().toISOString(),
    });

    // Create notification
    schema.create('notification', {
      userId: user.id,
      type: 'payment_success',
      title: 'Pagamento Confirmado',
      message: `Seu pagamento de ${amount.toLocaleString()} ${currency} foi processado com sucesso`,
      read: false,
      createdAt: new Date().toISOString(),
      data: { transactionId: payment.transactionId, bookingId },
    });

    return {
      transactionId: payment.transactionId,
      status: 'success',
      bookingId,
      amount,
      currency,
      timestamp: payment.createdAt,
    };
  });

  // POST /api/payments/mobile-money - Process mobile money payment
  server.post('/payments/mobile-money', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const attrs = JSON.parse(request.requestBody);
    const { bookingId, phoneNumber, amount, provider } = attrs;

    if (!bookingId || !phoneNumber || !amount || !provider) {
      return new Response(400, {}, { error: { code: 'VALIDATION_ERROR', message: 'Campos obrigatórios faltando' } });
    }

    const payment = schema.create('payment', {
      bookingId,
      userId: user.id,
      amount,
      currency: 'AOA',
      method: 'mobile-money',
      status: 'pending',
      transactionId: `TXN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
      createdAt: new Date().toISOString(),
    });

    return {
      transactionId: payment.transactionId,
      status: 'pending',
      message: 'Aguarde a confirmação no seu telefone',
    };
  });

  // GET /api/payments/:transactionId/status - Check payment status
  server.get('/api/payments/:transactionId/status', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const transactionId = request.params.transactionId;
    const payment = schema.findBy('payment', { transactionId });

    if (!payment) {
      return new Response(404, {}, { error: { code: 'NOT_FOUND', message: 'Transação não encontrada' } });
    }

    if (payment.userId !== user.id) {
      return new Response(403, {}, { error: { code: 'FORBIDDEN', message: 'Acesso negado' } });
    }

    // Simulate mobile money confirmation after a few seconds
    if (payment.status === 'pending') {
      payment.update({ status: 'success' });
    }

    return {
      transactionId: payment.transactionId,
      status: payment.status,
      bookingId: payment.bookingId,
    };
  });

  // POST /api/payments/refund - Process refund
  server.post('/payments/refund', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const attrs = JSON.parse(request.requestBody);
    const { bookingId, amount, reason } = attrs;

    if (!bookingId || !amount) {
      return new Response(400, {}, { error: { code: 'VALIDATION_ERROR', message: 'Campos obrigatórios faltando' } });
    }

    const refundId = `REF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;

    return {
      refundId,
      status: 'processing',
      estimatedTime: '3-5 dias úteis',
    };
  });
}
