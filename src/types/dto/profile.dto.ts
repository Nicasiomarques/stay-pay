/**
 * Data Transfer Objects (DTOs) for User Profile API responses
 * These types represent the raw data structure from the API
 */

export interface UserStatisticsDTO {
  bookings: number;
  reviews: number;
  favorites: number;
}

export interface UserProfileDTO {
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
  statistics: UserStatisticsDTO;
}

export interface UpdateProfileRequestDTO {
  name?: string;
  phone?: string;
  preferences?: {
    language?: string;
    currency?: string;
    notifications?: boolean;
  };
}

export interface UpdateProfileResponseDTO {
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

export interface UploadAvatarResponseDTO {
  avatarUrl: string;
}

export interface DeleteAccountResponseDTO {
  success: boolean;
}
