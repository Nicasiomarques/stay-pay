import { Model, belongsTo } from "miragejs";
import type { ModelDefinition } from "miragejs/-types";
import type * as Types from "./types";

export const models = {
  user: Model.extend<Partial<Types.User>>({}),
  hotel: Model.extend<Partial<Types.Hotel>>({}),
  booking: Model.extend({
    user: belongsTo(),
    hotel: belongsTo(),
  }),
  review: Model.extend({
    hotel: belongsTo(),
    user: belongsTo(),
  }),
  favorite: Model.extend({
    user: belongsTo(),
    hotel: belongsTo(),
  }),
  notification: Model.extend({
    user: belongsTo(),
  }),
  payment: Model.extend({
    booking: belongsTo(),
    user: belongsTo(),
  }),
  authToken: Model.extend({
    user: belongsTo(),
  }),
  deal: Model.extend<Partial<Types.Deal>>({}),
  trendingDestination: Model.extend<Partial<Types.TrendingDestination>>({}),
  lastMinuteDeal: Model.extend<Partial<Types.LastMinuteDeal>>({}),
};

export type AppModels = {
  user: ModelDefinition<Types.User>;
  hotel: ModelDefinition<Types.Hotel>;
  booking: ModelDefinition<Types.Booking>;
  review: ModelDefinition<Types.Review>;
  favorite: ModelDefinition<Types.Favorite>;
  notification: ModelDefinition<Types.Notification>;
  payment: ModelDefinition<Types.Payment>;
  authToken: ModelDefinition<Types.AuthToken>;
  deal: ModelDefinition<Types.Deal>;
  trendingDestination: ModelDefinition<Types.TrendingDestination>;
  lastMinuteDeal: ModelDefinition<Types.LastMinuteDeal>;
};
