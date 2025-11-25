/**
 * useAuth Hook
 * React Query hooks for authentication-related mutations
 */

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
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
    onSuccess: (data) => {
      // Store auth token in HTTP client
      dependencies.httpClient.setAuthToken(data.token);

      // Cache user data
      queryClient.setQueryData(queryKeys.auth.user(), data.user);

      // Store token in localStorage for persistence
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

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
    onSuccess: (data) => {
      // Store auth token in HTTP client
      dependencies.httpClient.setAuthToken(data.token);

      // Cache user data
      queryClient.setQueryData(queryKeys.auth.user(), data.user);

      // Store token in localStorage for persistence
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

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
    onSuccess: () => {
      // Clear auth token from HTTP client
      dependencies.httpClient.setAuthToken(null);

      // Clear all cached data
      queryClient.clear();

      // Remove token from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

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
    onSuccess: (data) => {
      // Update auth token in HTTP client
      dependencies.httpClient.setAuthToken(data.token);

      // Update tokens in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
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
 * Initialize auth from localStorage on app load
 */
export const initializeAuth = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    dependencies.httpClient.setAuthToken(token);
  }
};
