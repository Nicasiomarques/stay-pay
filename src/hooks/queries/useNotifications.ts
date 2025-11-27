/**
 * useNotifications Hook
 * React Query hooks for notification queries and mutations
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { getNotificationGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';
import { Notification } from '@/mappers';
import { GetNotificationsParams, NotificationsResponse } from '@/repositories/NotificationGateway';
import { showToast } from '@/utils';

/**
 * Hook to fetch user notifications
 */
export const useNotifications = (
  params?: GetNotificationsParams,
  options?: Omit<UseQueryOptions<NotificationsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.notifications.list(params),
    queryFn: () => getNotificationGateway().getNotifications(params),
    ...options,
  });
};

/**
 * Hook to fetch unread notifications count
 */
export const useUnreadNotificationsCount = (
  options?: Omit<UseQueryOptions<NotificationsResponse, Error, number>, 'queryKey' | 'queryFn' | 'select'>
) => {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount(),
    queryFn: () => getNotificationGateway().getNotifications({ unreadOnly: true }),
    select: (data) => data.unreadCount,
    ...options,
  });
};

/**
 * Hook to mark a notification as read
 */
export const useMarkNotificationAsRead = (
  options?: UseMutationOptions<boolean, Error, number>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => getNotificationGateway().markAsRead(notificationId),
    onSuccess: () => {
      // Invalidate notifications queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
    onError: () => {
      showToast.error('Erro ao marcar notificação como lida');
    },
    ...options,
  });
};

/**
 * Hook to mark all notifications as read
 */
export const useMarkAllNotificationsAsRead = (
  options?: UseMutationOptions<boolean, Error, void>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => getNotificationGateway().markAllAsRead(),
    onSuccess: () => {
      // Invalidate notifications queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
      showToast.success('Todas as notificações foram marcadas como lidas');
    },
    onError: () => {
      showToast.error('Erro ao marcar notificações como lidas');
    },
    ...options,
  });
};
