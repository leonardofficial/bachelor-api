import type { Request, Response } from 'express';

import { sleep } from '../../utils/sleep';
import { internalServerError } from '../errors/InternalServerError';

/**
 * Wait for a specified amount of time
 * @param req
 * @param res
 */
export async function wait(req: Request, res: Response) {
  try {
    const { delay } = req.body;
    await sleep(delay ?? 1000);
    return res.status(200).send({ error: false, message: 'success' });
  } catch (e) {
    return internalServerError(res, e);
  }
}
