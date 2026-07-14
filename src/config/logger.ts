import pino, { LoggerOptions } from 'pino';
import { env } from './env.js';

const loggerConfig: LoggerOptions = {
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
};

if (env.NODE_ENV === 'development') {
  loggerConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  };
}

export const logger = pino(loggerConfig);
