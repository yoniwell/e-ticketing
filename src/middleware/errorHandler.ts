import { Request, Response, NextFunction } from 'express';
import { AppError } from '../common/errors/index.js';
import { logger } from '../config/logger.js';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(
    {
      method: req.method,
      url: req.originalUrl,
      stack: err.stack,
    },
    err.message,
  );

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.details ?? null,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}
