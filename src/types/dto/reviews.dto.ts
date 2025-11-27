/**
 * Data Transfer Objects (DTOs) for Reviews API responses
 * These types represent the raw data structure from the API
 */

export interface ReviewAuthorDTO {
  name: string;
  avatar: string;
}

export interface ReviewDTO {
  id: number;
  hotelId: number;
  userId: string;
  bookingId: string;
  author: ReviewAuthorDTO;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  images: string[];
}

export interface RatingDistributionDTO {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface HotelReviewsResponseDTO {
  reviews: ReviewDTO[];
  total: number;
  averageRating: number;
  ratingDistribution: RatingDistributionDTO;
}

export interface CreateReviewRequestDTO {
  bookingId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface CreateReviewResponseDTO {
  reviewId: number;
  status: string;
}

export interface MarkHelpfulResponseDTO {
  success: boolean;
  helpfulCount: number;
}
