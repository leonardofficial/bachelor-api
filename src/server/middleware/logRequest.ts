import type { NextFunction, Request, Response } from 'express';

import { logger } from '../../logger';

/**
 * Logs the request with method and body
 * @param req
 * @param res
 * @param next
 */
export function logRequest(req: Request, res: Response, next: NextFunction) {
  console.log(req);
  logger.info(
    `${req.method} - ${req.path} - BODY ${JSON.stringify(
      req.body
    )} - QUERY ${JSON.stringify(req.query)}`
  );
  next();
}
