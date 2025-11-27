/**
 * Data Transfer Objects (DTOs) for Notifications API responses
 * These types represent the raw data structure from the API
 */

export type NotificationType = 'booking_confirmed' | 'booking_cancelled' | 'payment_success' | 'review_reminder';

export interface NotificationDTO {
  id: number;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

export interface NotificationsResponseDTO {
  notifications: NotificationDTO[];
  unreadCount: number;
}

export interface MarkReadResponseDTO {
  success: boolean;
}
