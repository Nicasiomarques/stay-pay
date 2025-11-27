/**
 * Review Mapper
 * Transforms review DTOs to domain models
 */

import { ReviewDTO, RatingDistributionDTO } from '@/types/dto';

/**
 * Domain model for Review Author
 */
export interface ReviewAuthor {
  name: string;
  avatar: string;
}

/**
 * Domain model for Review
 */
export interface Review {
  id: number;
  hotelId: number;
  userId: string;
  bookingId: string;
  author: ReviewAuthor;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  images: string[];
}

/**
 * Domain model for Rating Distribution
 */
export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

/**
 * Domain model for Hotel Reviews Response
 */
export interface HotelReviews {
  reviews: Review[];
  total: number;
  averageRating: number;
  ratingDistribution: RatingDistribution;
}

/**
 * Maps ReviewDTO from API to Review domain model
 */
export const mapReviewDTOToReview = (dto: ReviewDTO): Review => {
  return {
    id: dto.id,
    hotelId: dto.hotelId,
    userId: dto.userId,
    bookingId: dto.bookingId,
    author: {
      name: dto.author.name,
      avatar: dto.author.avatar,
    },
    rating: dto.rating,
    date: dto.date,
    comment: dto.comment,
    helpful: dto.helpful,
    images: dto.images,
  };
};

/**
 * Maps an array of ReviewDTOs to Review domain models
 */
export const mapReviewsDTOToReviews = (dtos: ReviewDTO[]): Review[] => {
  return dtos.map(mapReviewDTOToReview);
};

/**
 * Maps RatingDistributionDTO to RatingDistribution domain model
 */
export const mapRatingDistribution = (dto: RatingDistributionDTO): RatingDistribution => {
  return {
    5: dto[5],
    4: dto[4],
    3: dto[3],
    2: dto[2],
    1: dto[1],
  };
};
