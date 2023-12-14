import type { Request, Response } from 'express';

import { sleep } from '../../utils/sleep';
import { internalServerError } from '../errors/InternalServerError';
import { randomizeDelay } from '../../utils/randomizeDelay';

export function getGradualDelay(amount: number) {
  if (amount == null || amount <= 30) {
    return 1;
  }
  if (amount <= 70) {
    // Linear interpolation between 1 (at 30) and 2 (at 70)
    return 1 + (amount - 30) * (1.0 / 40.0);
  }
  return 2;
}

/**
 * Wait for a specified amount of time
 * @param req
 * @param res
 */
export async function wait(req: Request, res: Response) {
  try {
    const { delay, drift, a_amount: amount, class: c } = req.body;

    if (c !== undefined) {
      // Do concept drift using stagger
      const modifier = Number.parseInt(c, 10) === 1 ? 2 : 1;
      await sleep(randomizeDelay(modifier * (delay ?? 1000)));
      return res.status(200).send({ error: false, message: 'success' });
    }

    let modifier;
    switch (drift) {
      case 'sudden':
        modifier = (amount ?? 0) > 46 ? 2 : 1;
        await sleep(randomizeDelay(modifier * (delay ?? 1000)));
        break;
      case 'gradual':
        modifier = getGradualDelay(amount);
        await sleep(randomizeDelay(modifier * (delay ?? 1000)));
        break;
      case 'recurring':
        modifier = (amount ?? 0) % 20 > 9 ? 2 : 1;
        await sleep(randomizeDelay(modifier * (delay ?? 1000)));
        break;
      case 'incremental':
        modifier = Math.ceil((amount ?? 0) / 10);
        await sleep(randomizeDelay(modifier * (delay ?? 1000)));
        break;
      default:
        await sleep(randomizeDelay(delay ?? 1000));
    }

    return res.status(200).send({ error: false, message: 'success' });
  } catch (e) {
    return internalServerError(res, e);
  }
}
