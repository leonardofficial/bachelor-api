import { createLogger, format, transports } from 'winston';

import * as config from '../../config/config.json';

/**
 * Logger used by all files
 */
const colors = {
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[34m',
  verbose: '\x1b[33m',
};
const spaces = {
  error: '\t  ',
  warn: '\t  ',
  info: '\t  ',
  http: '\t  ',
  verbose: ' ',
  debug: '\t  ',
  silly: '\t  ',
};

/**
 * Custom logging output
 */
const loggerFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  format.printf(
    (info) =>
      `\x1b[2m${info.timestamp}\t \x1b[0m${colors[info.level] || '\x1b[1m'} ${
        info.level
      }\x1b[0m${spaces[info.level] || ''}${info.message}${
        info.splat !== undefined ? `${info.splat}` : ' '
      }`
  )
);

/**
 * Winston logger
 */
export const logger = createLogger({
  level: config.logger.level || 'info',
  format: loggerFormat,

  // Add additional transports such as Slack here
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
});
