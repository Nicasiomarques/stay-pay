import { Server, Response } from 'miragejs';
import type { AppRegistry } from '../server';

function getUserFromToken(schema: any, request: any) {
  const token = request.requestHeaders.authorization?.replace('Bearer ', '');
  if (!token) return null;
  const authToken = schema.findBy('authToken', { token });
  if (!authToken) return null;
  return schema.find('user', authToken.userId);
}

export function profileRoutes(server: Server<AppRegistry>) {
  // GET /api/users/profile - Get current user's profile
  server.get('/users/profile', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      createdAt: user.createdAt,
      preferences: user.preferences,
    };
  });

  // PATCH /api/users/profile - Update user profile
  server.patch('/users/profile', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    const attrs = JSON.parse(request.requestBody);
    const { name, phone, preferences } = attrs;

    // Update user
    const updates: any = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (preferences) updates.preferences = { ...user.preferences, ...preferences };

    user.update(updates);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      createdAt: user.createdAt,
      preferences: user.preferences,
    };
  });

  // POST /api/users/profile/avatar - Upload profile avatar
  server.post('/users/profile/avatar', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    // In real app, this would handle file upload
    // For mock, generate a random avatar URL
    const avatarUrl = `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&random=${Date.now()}`;

    user.update({ avatar: avatarUrl });

    return { avatarUrl };
  });

  // DELETE /api/users/profile - Delete user account
  server.del('/users/profile', (schema, request) => {
    const user = getUserFromToken(schema, request);
    if (!user) {
      return new Response(401, {}, { error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária' } });
    }

    // Delete all user data
    schema.where('booking', { userId: user.id }).destroy();
    schema.where('favorite', { userId: user.id }).destroy();
    schema.where('review', { userId: user.id }).destroy();
    schema.where('notification', { userId: user.id }).destroy();
    schema.where('authToken', { userId: user.id }).destroy();
    user.destroy();

    return { success: true };
  });
}
