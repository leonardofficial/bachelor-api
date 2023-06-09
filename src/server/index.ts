// import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import * as config from '../../config/config.json';
import { logger } from '../logger';
import { logRequest } from './middleware/logRequest';
import { routesConfig } from './routes-config';

/**
 * Server setup
 */
const port = config.port || 8080;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logRequest);
app.use(cors({ origin: true }));
routesConfig(app);

/**
 * Starts the server with above config
 */
export function startServer() {
  app.listen(port, () => {
    logger.info(`Startup complete! Server is listening on port ${port}!`);
  });
}
