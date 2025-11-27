/**
 * ReviewGateway
 * Handles all review-related API calls
 */

import { IHttpClient } from '@/lib/httpClient';
import * as DTOs from '@/types/dto';
import {
  mapReviewsDTOToReviews,
  mapRatingDistribution,
  HotelReviews,
} from '@/mappers';

export interface GetReviewsParams {
  page?: number;
  limit?: number;
  sortBy?: 'recent' | 'rating' | 'helpful';
}

export interface CreateReviewData {
  bookingId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export interface CreateReviewResult {
  reviewId: number;
  status: string;
}

export interface MarkHelpfulResult {
  success: boolean;
  helpfulCount: number;
}

export const createReviewGateway = (httpClient: IHttpClient) => {
  const getHotelReviews = async (
    hotelId: number,
    params?: GetReviewsParams
  ): Promise<HotelReviews> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    const url = `/hotels/${hotelId}/reviews${queryString ? `?${queryString}` : ''}`;

    const response = await httpClient.get<DTOs.HotelReviewsResponseDTO>(url);

    return {
      reviews: mapReviewsDTOToReviews(response.data.reviews),
      total: response.data.total,
      averageRating: response.data.averageRating,
      ratingDistribution: mapRatingDistribution(response.data.ratingDistribution),
    };
  };

  const createReview = async (
    hotelId: number,
    data: CreateReviewData
  ): Promise<CreateReviewResult> => {
    const response = await httpClient.post<DTOs.CreateReviewResponseDTO>(
      `/hotels/${hotelId}/reviews`,
      data
    );

    return {
      reviewId: response.data.reviewId,
      status: response.data.status,
    };
  };

  const markReviewHelpful = async (reviewId: number): Promise<MarkHelpfulResult> => {
    const response = await httpClient.patch<DTOs.MarkHelpfulResponseDTO>(
      `/reviews/${reviewId}/helpful`
    );

    return {
      success: response.data.success,
      helpfulCount: response.data.helpfulCount,
    };
  };

  return {
    getHotelReviews,
    createReview,
    markReviewHelpful,
  };
};

export type ReviewGateway = ReturnType<typeof createReviewGateway>;
