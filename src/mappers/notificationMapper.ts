/**
 * Notification Mapper
 * Transforms notification DTOs to domain models
 */

import { NotificationDTO, NotificationType } from '@/types/dto';

/**
 * Domain model for Notification
 */
export interface Notification {
  id: number;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

/**
 * Maps NotificationDTO from API to Notification domain model
 */
export const mapNotificationDTOToNotification = (dto: NotificationDTO): Notification => {
  return {
    id: dto.id,
    userId: dto.userId,
    type: dto.type,
    title: dto.title,
    message: dto.message,
    read: dto.read,
    createdAt: dto.createdAt,
    data: dto.data,
  };
};

/**
 * Maps an array of NotificationDTOs to Notification domain models
 */
export const mapNotificationsDTOToNotifications = (dtos: NotificationDTO[]): Notification[] => {
  return dtos.map(mapNotificationDTOToNotification);
};
