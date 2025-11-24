import type { Server, Response } from 'miragejs';
import type { AppRegistry } from '../server';

// Simple helper to generate tokens
function generateToken() {
  return `jwt_${Math.random().toString(36).substring(2)}${Date.now()}`;
}

export function authRoutes(server: Server<AppRegistry>) {
  // POST /api/auth/register - Register new user
  server.post('/api/auth/register', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { name, email, phone, password } = attrs;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return new Response(
        400,
        {},
        { error: { code: 'VALIDATION_ERROR', message: 'Todos os campos são obrigatórios' } }
      );
    }

    // Check if user already exists
    const existingUser = schema.findBy('user', { email });
    if (existingUser) {
      return new Response(
        409,
        {},
        { error: { code: 'USER_EXISTS', message: 'Email já está registrado' } }
      );
    }

    // Create new user
    const user = schema.create('user', {
      id: `user_${Date.now()}`,
      name,
      email,
      phone,
      password, // In real app, this would be hashed
      avatar: null,
      createdAt: new Date().toISOString(),
      preferences: {
        language: 'pt',
        currency: 'AOA',
        notifications: true,
      },
    });

    // Create auth token
    const token = generateToken();
    const refreshToken = generateToken();

    const authToken = schema.create('authToken', {
      token,
      refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    });

    return {
      userId: user.id,
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      },
    };
  });

  // POST /api/auth/login - User login
  server.post('/api/auth/login', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { email, password } = attrs;

    if (!email || !password) {
      return new Response(
        400,
        {},
        { error: { code: 'VALIDATION_ERROR', message: 'Email e senha são obrigatórios' } }
      );
    }

    // Find user
    const user = schema.findBy('user', { email });
    if (!user) {
      return new Response(
        401,
        {},
        { error: { code: 'INVALID_CREDENTIALS', message: 'Email ou senha incorretos' } }
      );
    }

    // Verify password (in real app, compare hashed passwords)
    if (user.password !== password) {
      return new Response(
        401,
        {},
        { error: { code: 'INVALID_CREDENTIALS', message: 'Email ou senha incorretos' } }
      );
    }

    // Create auth token
    const token = generateToken();
    const refreshToken = generateToken();

    schema.create('authToken', {
      token,
      refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    return {
      userId: user.id,
      token,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      },
    };
  });

  // POST /api/auth/logout - User logout
  server.post('/api/auth/logout', (schema, request) => {
    const token = request.requestHeaders.authorization?.replace('Bearer ', '');

    if (!token) {
      return new Response(
        401,
        {},
        { error: { code: 'UNAUTHORIZED', message: 'Token não fornecido' } }
      );
    }

    // Find and delete token
    const authToken = schema.findBy('authToken', { token });
    if (authToken) {
      authToken.destroy();
    }

    return { success: true };
  });

  // POST /api/auth/refresh - Refresh access token
  server.post('/api/auth/refresh', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { refreshToken: oldRefreshToken } = attrs;

    if (!oldRefreshToken) {
      return new Response(
        400,
        {},
        { error: { code: 'VALIDATION_ERROR', message: 'Refresh token é obrigatório' } }
      );
    }

    // Find existing token
    const authToken = schema.findBy('authToken', { refreshToken: oldRefreshToken });
    if (!authToken) {
      return new Response(
        401,
        {},
        { error: { code: 'INVALID_TOKEN', message: 'Refresh token inválido' } }
      );
    }

    // Generate new tokens
    const newToken = generateToken();
    const newRefreshToken = generateToken();

    authToken.update({
      token: newToken,
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  });

  // POST /api/auth/forgot-password - Request password reset
  server.post('/api/auth/forgot-password', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { email } = attrs;

    if (!email) {
      return new Response(
        400,
        {},
        { error: { code: 'VALIDATION_ERROR', message: 'Email é obrigatório' } }
      );
    }

    const user = schema.findBy('user', { email });

    // Always return success even if user doesn't exist (security best practice)
    return {
      success: true,
      message: 'Se o email existir, você receberá instruções para redefinir sua senha',
    };
  });

  // POST /api/auth/reset-password - Reset password with token
  server.post('/api/auth/reset-password', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const { token, newPassword } = attrs;

    if (!token || !newPassword) {
      return new Response(
        400,
        {},
        { error: { code: 'VALIDATION_ERROR', message: 'Token e nova senha são obrigatórios' } }
      );
    }

    // In a real app, verify the reset token
    // For mock purposes, we'll just return success
    return { success: true };
  });
}
