import { Response } from 'express';
import { ApiResponse } from './ApiResponse.js';

export class ResponseBuilder {
  static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200,
  ) {
    return res
      .status(statusCode)
      .json(new ApiResponse(true, statusCode, message, data));
  }

  static created<T>(res: Response, data: T, message = 'Created successfully') {
    return res.status(201).json(new ApiResponse(true, 201, message, data));
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }

  static paginated<T>(
    res: Response,
    data: T,
    meta: {
      page: number;
      limit: number;
      total: number;
    },
    message = 'Success',
  ) {
    return res
      .status(200)
      .json(new ApiResponse(true, 200, message, data, meta));
  }
}
