import { createServer, Registry } from 'miragejs';
import { models, type AppModels } from './models';
import { factories } from './factories';
import { seedData } from './seeds';
import { hotelsRoutes } from './routes/hotels';
import { authRoutes } from './routes/auth';
import { bookingsRoutes } from './routes/bookings';
import { profileRoutes } from './routes/profile';
import { favoritesRoutes } from './routes/favorites';
import { reviewsRoutes } from './routes/reviews';
import { paymentsRoutes } from './routes/payments';
import { notificationsRoutes } from './routes/notifications';
import { promotionsRoutes } from './routes/promotions';

export type AppRegistry = Registry<AppModels, {}>;

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer<AppModels>({
    environment,

    models,
    factories,

    seeds(server) {
      seedData(server);
    },

    routes() {
      this.namespace = 'api';

      // Set up timing to simulate network latency
      this.timing = 400; // 400ms delay

      // Enable CORS
      this.passthrough((request) => {
        // Allow external requests (like Unsplash images)
        if (request.url.includes('unsplash.com')) {
          return true;
        }
        return false;
      });

      // Register all route handlers
      hotelsRoutes(this);
      authRoutes(this);
      bookingsRoutes(this);
      profileRoutes(this);
      favoritesRoutes(this);
      reviewsRoutes(this);
      paymentsRoutes(this);
      notificationsRoutes(this);
      promotionsRoutes(this);

      // Catch-all for unhandled routes
      this.post('/*', (schema, request) => {
        console.log('⚠️ Unhandled POST request:', request.url);
        return { error: 'Not implemented' };
      });

      this.get('/*', (schema, request) => {
        console.log('⚠️ Unhandled GET request:', request.url);
        return { error: 'Not implemented' };
      });
    },
  });

  // Log when server is ready
  console.log('🚀 MirageJS server started!');
  console.log('📡 API endpoints available at /api/*');
  console.log('🏨 Hotels:', server.schema.all('hotel').models.length);
  console.log('👥 Users:', server.schema.all('user').models.length);

  return server;
}
