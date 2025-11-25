import { Server, Response } from 'miragejs';
import type { AppRegistry } from '../server';

function getUserFromToken(schema: any, request: any) {
  const token = request.requestHeaders.authorization?.replace('Bearer ', '');
  if (!token) return null;
  const authToken = schema.findBy('authToken', { token });
  if (!authToken) return null;
  return schema.find('user', authToken.userId);
}

export function notificationsRoutes(server: Server<AppRegistry>) {
  // GET /api/users/notifications - Get user notifications
  server.get('/users/notifications', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const { unreadOnly, page = '1', limit = '20' } = request.queryParams;

    let notifications = schema.where('notification', { userId: user.id }).models;

    // Filter unread only
    if (unreadOnly === 'true') {
      notifications = notifications.filter(n => !n.read);
    }

    // Sort by date (newest first)
    notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedNotifications = notifications.slice(startIndex, endIndex);

    const unreadCount = notifications.filter(n => !n.read).length;

    return {
      notifications: paginatedNotifications,
      unreadCount,
    };
  });

  // PATCH /api/users/notifications/:notificationId/read - Mark notification as read
  server.patch('/api/users/notifications/:notificationId/read', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const notificationId = parseInt(request.params.notificationId);
    const notification = schema.find('notification', notificationId);

    if (!notification) {
      return new Response(404, {}, { error: { code: 'NOT_FOUND', message: 'Notificação não encontrada' } });
    }

    if (notification.userId !== user.id) {
      return new Response(403, {}, { error: { code: 'FORBIDDEN', message: 'Acesso negado' } });
    }

    notification.update({ read: true });

    return { success: true };
  });
}
