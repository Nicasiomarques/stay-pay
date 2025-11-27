/**
 * useProfile Hook
 * React Query hooks for user profile queries and mutations
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getProfileGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';
import { UserProfile } from '@/mappers';
import { UpdateProfileData } from '@/repositories/ProfileGateway';
import { showToast } from '@/utils';

/**
 * Hook to fetch current user's profile
 */
export const useUserProfile = (
  options?: Omit<UseQueryOptions<UserProfile>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.profile.current(),
    queryFn: () => getProfileGateway().getProfile(),
    ...options,
  });
};

/**
 * Hook to update user profile
 */
export const useUpdateProfile = (
  options?: UseMutationOptions<UserProfile, Error, UpdateProfileData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => getProfileGateway().updateProfile(data),
    onSuccess: (updatedProfile) => {
      // Update cached profile data
      queryClient.setQueryData(queryKeys.profile.current(), updatedProfile);
      showToast.success('Perfil atualizado com sucesso');
    },
    onError: () => {
      showToast.error('Erro ao atualizar perfil');
    },
    ...options,
  });
};

/**
 * Hook to upload avatar
 */
export const useUploadAvatar = (
  options?: UseMutationOptions<string, Error, void>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => getProfileGateway().uploadAvatar(),
    onSuccess: (avatarUrl) => {
      // Update cached profile with new avatar
      queryClient.setQueryData<UserProfile | undefined>(
        queryKeys.profile.current(),
        (oldData) => oldData ? { ...oldData, avatar: avatarUrl } : undefined
      );
      showToast.success('Foto atualizada com sucesso');
    },
    onError: () => {
      showToast.error('Erro ao atualizar foto');
    },
    ...options,
  });
};

/**
 * Hook to delete user account
 */
export const useDeleteAccount = (
  options?: UseMutationOptions<boolean, Error, void>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => getProfileGateway().deleteAccount(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      showToast.info('Conta eliminada com sucesso');
    },
    onError: () => {
      showToast.error('Erro ao eliminar conta');
    },
    ...options,
  });
};
