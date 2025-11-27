/**
 * User Mapper
 * Transforms API DTOs to domain models used in components
 */

import { UserDTO, LoginRequestDTO, RegisterRequestDTO, UserProfileDTO } from '@/types/dto';

/**
 * User model for components
 */
export interface User {
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

/**
 * User statistics
 */
export interface UserStatistics {
  bookings: number;
  reviews: number;
  favorites: number;
}

/**
 * User profile with statistics
 */
export interface UserProfile extends User {
  statistics: UserStatistics;
}

/**
 * Auth state with user and token
 */
export interface AuthState {
  user: User;
  token: string;
  refreshToken: string;
}

/**
 * Maps UserDTO from API to User model
 */
export const mapUserDTOToUser = (userDTO: UserDTO): User => {
  return {
    id: userDTO.id,
    name: userDTO.name,
    email: userDTO.email,
    phone: userDTO.phone,
    avatar: userDTO.avatar,
    createdAt: userDTO.createdAt,
    preferences: userDTO.preferences,
  };
};

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Maps login credentials to LoginRequestDTO
 */
export const mapLoginCredentialsToDTO = (credentials: LoginCredentials): LoginRequestDTO => {
  return {
    email: credentials.email,
    password: credentials.password,
  };
};

/**
 * Registration data
 */
export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

/**
 * Maps registration data to RegisterRequestDTO
 */
export const mapRegistrationDataToDTO = (data: RegistrationData): RegisterRequestDTO => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
  };
};

/**
 * Maps UserProfileDTO from API to UserProfile model
 */
export const mapUserProfileDTOToUserProfile = (profileDTO: UserProfileDTO): UserProfile => {
  return {
    id: profileDTO.id,
    name: profileDTO.name,
    email: profileDTO.email,
    phone: profileDTO.phone,
    avatar: profileDTO.avatar,
    createdAt: profileDTO.createdAt,
    preferences: profileDTO.preferences,
    statistics: {
      bookings: profileDTO.statistics.bookings,
      reviews: profileDTO.statistics.reviews,
      favorites: profileDTO.statistics.favorites,
    },
  };
};
