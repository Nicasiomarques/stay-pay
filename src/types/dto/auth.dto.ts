/**
 * Data Transfer Objects (DTOs) for Authentication API responses
 * These types represent the raw data structure from the API
 */

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  createdAt: string;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
  };
}

export interface AuthTokenDTO {
  token: string;
  refreshToken: string;
  userId: string;
  expiresAt: string;
}

// API Response types
export interface LoginResponseDTO {
  user: UserDTO;
  token: string;
  refreshToken: string;
  message: string;
}

export interface RegisterResponseDTO {
  user: UserDTO;
  token: string;
  refreshToken: string;
  message: string;
}

export interface RefreshTokenResponseDTO {
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LogoutResponseDTO {
  message: string;
}

export interface ForgotPasswordResponseDTO {
  message: string;
  resetToken: string;
}

export interface ResetPasswordResponseDTO {
  message: string;
}

// API Request types
export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ResetPasswordRequestDTO {
  resetToken: string;
  newPassword: string;
}
