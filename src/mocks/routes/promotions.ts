import { Server, Response } from 'miragejs';
import type { AppRegistry } from '../server';

export function promotionsRoutes(server: Server<AppRegistry>) {
  console.log('🎁 Registering promotions routes...');

  // GET /api/deals - Get all special deals
  server.get('/deals', (schema, request) => {
    const limitParam = request.queryParams.limit;
    const limit = parseInt(Array.isArray(limitParam) ? limitParam[0] : limitParam || '10');

    const deals = schema.all('deal').models;

    // Filter only active deals (validUntil > now)
    const activeDeals = deals.filter(deal => {
      if (!deal.validUntil) return true;
      return new Date(deal.validUntil) > new Date();
    });

    return { deals: activeDeals.slice(0, limit) };
  });

  // GET /api/deals/:id - Get single deal
  server.get('/deals/:id', (schema, request) => {
    const id = request.params.id;
    const deal = schema.find('deal', id);

    if (!deal) {
      return new Response(
        404,
        {},
        { error: { code: 'NOT_FOUND', message: 'Oferta não encontrada' } }
      );
    }

    return { deal };
  });

  // GET /api/trending-destinations - Get trending destinations
  server.get('/trending-destinations', (schema, request) => {
    const limitParam = request.queryParams.limit;
    const trendingOnlyParam = request.queryParams.trendingOnly;

    const limit = parseInt(Array.isArray(limitParam) ? limitParam[0] : limitParam || '10');
    const trendingOnly = (Array.isArray(trendingOnlyParam) ? trendingOnlyParam[0] : trendingOnlyParam) === 'true';

    let destinations = schema.all('trendingDestination').models;

    if (trendingOnly) {
      destinations = destinations.filter(dest => dest.trending);
    }

    // Sort by hotelsCount descending
    destinations.sort((a, b) => b.hotelsCount - a.hotelsCount);

    return { destinations: destinations.slice(0, limit) };
  });

  // GET /api/last-minute-deals - Get last minute deals with computed expiresIn
  server.get('/last-minute-deals', (schema, request) => {
    const limitParam = request.queryParams.limit;
    const limit = parseInt(Array.isArray(limitParam) ? limitParam[0] : limitParam || '10');

    const deals = schema.all('lastMinuteDeal').models;
    const now = Date.now();

    // Filter active deals and compute expiresIn
    const activeDeals = deals
      .filter(deal => new Date(deal.expiresAt).getTime() > now)
      .map(deal => {
        const msRemaining = new Date(deal.expiresAt).getTime() - now;
        const hoursRemaining = Math.floor(msRemaining / (60 * 60 * 1000));
        const minutesRemaining = Math.floor((msRemaining % (60 * 60 * 1000)) / (60 * 1000));

        return {
          ...deal.attrs,
          expiresIn: `${hoursRemaining}h ${minutesRemaining}m`,
        };
      })
      .slice(0, limit);

    return { deals: activeDeals };
  });

  // GET /api/last-minute-deals/:id - Get single last minute deal
  server.get('/last-minute-deals/:id', (schema, request) => {
    const id = request.params.id;
    const deal = schema.find('lastMinuteDeal', id);

    if (!deal) {
      return new Response(
        404,
        {},
        { error: { code: 'NOT_FOUND', message: 'Oferta não encontrada' } }
      );
    }

    const now = Date.now();
    const msRemaining = new Date(deal.expiresAt).getTime() - now;
    const hoursRemaining = Math.floor(msRemaining / (60 * 60 * 1000));
    const minutesRemaining = Math.floor((msRemaining % (60 * 60 * 1000)) / (60 * 1000));

    return {
      deal: {
        ...deal.attrs,
        expiresIn: `${hoursRemaining}h ${minutesRemaining}m`,
      },
    };
  });
}
