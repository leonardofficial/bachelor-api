import type { Application } from 'express';

import { wait } from './routes/wait';

/**
 * Configures routes for the server
 * @param app
 */
export function routesConfig(app: Application) {
  app.post('/wait', [wait]);
}
