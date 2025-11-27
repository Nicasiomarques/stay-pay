/**
 * useAuth Hook
 * React Query hooks for authentication-related mutations
 */

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthGateway, dependencies } from "@/config/dependencies";
import { queryKeys } from "@/config/queryClient";
import {
  AuthState,
  LoginCredentials,
  RegistrationData,
  mapLoginCredentialsToDTO,
  mapRegistrationDataToDTO,
} from "@/mappers";
import { showToast } from "@/utils";

const AUTH_TOKEN_KEY = "@staygo:auth_token";
const REFRESH_TOKEN_KEY = "@staygo:refresh_token";

/**
 * Hook to login
 */
export const useLogin = (
  options?: UseMutationOptions<AuthState, Error, LoginCredentials>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      const dto = mapLoginCredentialsToDTO(credentials);
      return getAuthGateway().login(dto);
    },
    onSuccess: async (data) => {
      // Store auth token in HTTP client
      dependencies.httpClient.setAuthToken(data.token);

      // Cache user data
      queryClient.setQueryData(queryKeys.auth.user(), data.user);

      // Store token in AsyncStorage for persistence
      try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      } catch (error) {
        console.error("Error storing auth tokens:", error);
      }

      showToast.success('Bem-vindo de volta!');
    },
    onError: () => {
      showToast.error('Email ou senha incorretos');
    },
    ...options,
  });
};

/**
 * Hook to register
 */
export const useRegister = (
  options?: UseMutationOptions<AuthState, Error, RegistrationData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegistrationData) => {
      const dto = mapRegistrationDataToDTO(userData);
      return getAuthGateway().register(dto);
    },
    onSuccess: async (data) => {
      // Store auth token in HTTP client
      dependencies.httpClient.setAuthToken(data.token);

      // Cache user data
      queryClient.setQueryData(queryKeys.auth.user(), data.user);

      // Store token in AsyncStorage for persistence
      try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      } catch (error) {
        console.error("Error storing auth tokens:", error);
      }

      showToast.success('Conta criada com sucesso!');
    },
    onError: () => {
      showToast.error('Erro ao criar conta. Tente novamente');
    },
    ...options,
  });
};

/**
 * Hook to logout
 */
export const useLogout = (
  options?: UseMutationOptions<{ message: string }, Error, void>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => getAuthGateway().logout(),
    onSuccess: async () => {
      // Clear auth token from HTTP client
      dependencies.httpClient.setAuthToken(null);

      // Clear all cached data
      queryClient.clear();

      // Remove tokens from AsyncStorage
      try {
        await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY]);
      } catch (error) {
        console.error("Error removing auth tokens:", error);
      }

      showToast.info('Sessão encerrada');
    },
    ...options,
  });
};

/**
 * Hook to refresh auth token
 */
export const useRefreshToken = (
  options?: UseMutationOptions<
    { token: string; refreshToken: string; expiresAt: string },
    Error,
    string
  >
) => {
  return useMutation({
    mutationFn: (refreshToken: string) =>
      getAuthGateway().refreshToken(refreshToken),
    onSuccess: async (data) => {
      // Update auth token in HTTP client
      dependencies.httpClient.setAuthToken(data.token);

      // Update tokens in AsyncStorage
      try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      } catch (error) {
        console.error("Error updating auth tokens:", error);
      }
    },
    ...options,
  });
};

/**
 * Hook to request password reset
 */
export const useForgotPassword = (
  options?: UseMutationOptions<
    { message: string; resetToken: string },
    Error,
    string
  >
) => {
  return useMutation({
    mutationFn: (email: string) => getAuthGateway().forgotPassword(email),
    onSuccess: () => {
      showToast.success('Email de recuperação enviado');
    },
    onError: () => {
      showToast.error('Erro ao enviar email. Tente novamente');
    },
    ...options,
  });
};

/**
 * Hook to reset password
 */
export const useResetPassword = (
  options?: UseMutationOptions<
    { message: string },
    Error,
    { resetToken: string; newPassword: string }
  >
) => {
  return useMutation({
    mutationFn: ({ resetToken, newPassword }) =>
      getAuthGateway().resetPassword(resetToken, newPassword),
    onSuccess: () => {
      showToast.success('Senha alterada com sucesso');
    },
    onError: () => {
      showToast.error('Erro ao alterar senha. Tente novamente');
    },
    ...options,
  });
};

/**
 * Initialize auth from AsyncStorage on app load
 */
export const initializeAuth = async () => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      dependencies.httpClient.setAuthToken(token);
    }
  } catch (error) {
    console.error("Error initializing auth:", error);
  }
};

/**
 * Get stored refresh token
 */
export const getStoredRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};
