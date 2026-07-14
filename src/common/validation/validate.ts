import { RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/index.js';
import { ValidationSchemas } from './ValidationSchemas.js';

export const validate = (schemas: ValidationSchemas): RequestHandler => {
  return async (req, _res, next) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(req.params)) as any;
      }

      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(req.query)) as any;
      }

      if (schemas.headers) {
        req.headers = (await schemas.headers.parseAsync(req.headers)) as any;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return next(new AppError('Validation failed', 400, errors));
      }

      next(error);
    }
  };
};
