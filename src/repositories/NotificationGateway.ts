/**
 * NotificationGateway
 * Handles all notification-related API calls
 */

import { IHttpClient } from '@/lib/httpClient';
import * as DTOs from '@/types/dto';
import {
  mapNotificationsDTOToNotifications,
  Notification,
} from '@/mappers';

export interface GetNotificationsParams {
  unreadOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

export const createNotificationGateway = (httpClient: IHttpClient) => {
  const getNotifications = async (params?: GetNotificationsParams): Promise<NotificationsResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.unreadOnly) queryParams.append('unreadOnly', 'true');
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const url = `/users/notifications${queryString ? `?${queryString}` : ''}`;

    const response = await httpClient.get<DTOs.NotificationsResponseDTO>(url);

    return {
      notifications: mapNotificationsDTOToNotifications(response.data.notifications),
      unreadCount: response.data.unreadCount,
    };
  };

  const markAsRead = async (notificationId: number): Promise<boolean> => {
    const response = await httpClient.patch<DTOs.MarkReadResponseDTO>(
      `/users/notifications/${notificationId}/read`
    );
    return response.data.success;
  };

  const markAllAsRead = async (): Promise<boolean> => {
    const { notifications } = await getNotifications({ unreadOnly: true });
    await Promise.all(notifications.map(n => markAsRead(n.id)));
    return true;
  };

  return {
    getNotifications,
    markAsRead,
    markAllAsRead,
  };
};

export type NotificationGateway = ReturnType<typeof createNotificationGateway>;
