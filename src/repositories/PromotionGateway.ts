/**
 * Promotion Gateway
 * Handles all API calls related to promotions, deals, and destinations
 */

import { IHttpClient } from '@/lib/httpClient';
import * as DTOs from '@/types/dto';
import {
  mapDealDTOsToDeals,
  mapTrendingDestinationDTOsToTrendingDestinations,
  mapLastMinuteDealDTOsToLastMinuteDeals,
} from '@/mappers';
import { Deal, TrendingDestination, LastMinuteDeal } from '@/types';

export interface TrendingDestinationsParams {
  limit?: number;
  trendingOnly?: boolean;
}

export const createPromotionGateway = (httpClient: IHttpClient) => {
  /**
   * Get special deals/offers
   */
  const getDeals = async (limit?: number): Promise<Deal[]> => {
    const response = await httpClient.get<DTOs.DealsListResponseDTO>('/deals', {
      params: limit ? { limit } : undefined,
    });
    return mapDealDTOsToDeals(response.data.deals);
  };

  /**
   * Get trending destinations
   */
  const getTrendingDestinations = async (
    params?: TrendingDestinationsParams
  ): Promise<TrendingDestination[]> => {
    const response = await httpClient.get<DTOs.TrendingDestinationsResponseDTO>(
      '/trending-destinations',
      {
        params: params ? { ...params } : undefined,
      }
    );
    return mapTrendingDestinationDTOsToTrendingDestinations(response.data.destinations);
  };

  /**
   * Get last minute deals with time-limited offers
   */
  const getLastMinuteDeals = async (limit?: number): Promise<LastMinuteDeal[]> => {
    const response = await httpClient.get<DTOs.LastMinuteDealsResponseDTO>(
      '/last-minute-deals',
      {
        params: limit ? { limit } : undefined,
      }
    );
    return mapLastMinuteDealDTOsToLastMinuteDeals(response.data.deals);
  };

  return {
    getDeals,
    getTrendingDestinations,
    getLastMinuteDeals,
  };
};

export type PromotionGateway = ReturnType<typeof createPromotionGateway>;
