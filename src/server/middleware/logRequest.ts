import type { NextFunction, Request, Response } from 'express';

import { logger } from '../../logger';

/**
 * Logs the request with method and body
 * @param req
 * @param res
 * @param next
 */
export function logRequest(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method} - ${req.path} - ${JSON.stringify(req.body)}`);
  next();
}
