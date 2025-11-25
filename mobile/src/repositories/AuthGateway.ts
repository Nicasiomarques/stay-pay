import { IHttpClient } from "@/lib/httpClient";
import * as DTOs from "@/types/dto";
import { mapUserDTOToUser, AuthState } from "@/mappers";

export const createAuthGateway = (httpClient: IHttpClient) => {
  const login = async (credentials: DTOs.LoginRequestDTO): Promise<AuthState> => {
    const response = await httpClient.post<DTOs.LoginResponseDTO>("/auth/login", credentials);

    return {
      user: mapUserDTOToUser(response.data.user),
      token: response.data.token,
      refreshToken: response.data.refreshToken,
    };
  };

  const register = async (userData: DTOs.RegisterRequestDTO): Promise<AuthState> => {
    const response = await httpClient.post<DTOs.RegisterResponseDTO>(
      "/auth/register",
      userData
    );

    return {
      user: mapUserDTOToUser(response.data.user),
      token: response.data.token,
      refreshToken: response.data.refreshToken,
    };
  };

  const logout = async (): Promise<{ message: string }> => {
    const response = await httpClient.post<DTOs.LogoutResponseDTO>("/auth/logout");
    return { message: response.data.message };
  };

  const refreshToken = async (refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
    expiresAt: string;
  }> => {
    const response = await httpClient.post<DTOs.RefreshTokenResponseDTO>(
      "/auth/refresh", { refreshToken });

    return {
      token: response.data.token,
      refreshToken: response.data.refreshToken,
      expiresAt: response.data.expiresAt,
    };
  };

  const forgotPassword = async (
    email: string
  ): Promise<{ message: string; resetToken: string }> => {
    const response = await httpClient.post<DTOs.ForgotPasswordResponseDTO>("/auth/forgot-password", { email });

    return {
      message: response.data.message,
      resetToken: response.data.resetToken,
    };
  };

  const resetPassword = async (resetToken: string, newPassword: string): Promise<{ message: string }> => {
    const response = await httpClient.post<DTOs.ResetPasswordResponseDTO>(
      "/auth/reset-password",
      { resetToken, newPassword }
    );

    return { message: response.data.message };
  };

  return {
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
  };
};

export type AuthGateway = ReturnType<typeof createAuthGateway>;
