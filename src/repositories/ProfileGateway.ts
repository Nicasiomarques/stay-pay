/**
 * Profile Gateway
 * Handles all profile-related API calls
 */

import { IHttpClient } from '@/lib/httpClient';
import * as DTOs from '@/types/dto';
import { UserProfile, mapUserProfileDTOToUserProfile } from '@/mappers';

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  preferences?: {
    language?: string;
    currency?: string;
    notifications?: boolean;
  };
}

export const createProfileGateway = (httpClient: IHttpClient) => {
  /**
   * Get current user's profile
   */
  const getProfile = async (): Promise<UserProfile> => {
    const response = await httpClient.get<DTOs.UserProfileDTO>('/users/profile');
    return mapUserProfileDTOToUserProfile(response.data);
  };

  /**
   * Update user profile
   */
  const updateProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await httpClient.patch<DTOs.UserProfileDTO>('/users/profile', data);
    return mapUserProfileDTOToUserProfile(response.data);
  };

  /**
   * Upload profile avatar
   */
  const uploadAvatar = async (): Promise<string> => {
    const response = await httpClient.post<DTOs.UploadAvatarResponseDTO>('/users/profile/avatar');
    return response.data.avatarUrl;
  };

  /**
   * Delete user account
   */
  const deleteAccount = async (): Promise<boolean> => {
    const response = await httpClient.delete<DTOs.DeleteAccountResponseDTO>('/users/profile');
    return response.data.success;
  };

  return {
    getProfile,
    updateProfile,
    uploadAvatar,
    deleteAccount,
  };
};

export type ProfileGateway = ReturnType<typeof createProfileGateway>;
