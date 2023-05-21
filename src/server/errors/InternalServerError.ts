import { Response } from 'express';

/**
 * Creates standardized internal server error response
 * @param res
 * @param err
 */
export function internalServerError(res: Response, err: any) {
  return res.status(500).send({ error: true, code: 500, message: err.message });
}
