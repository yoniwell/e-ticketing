export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode = 500,
    public readonly details?: unknown
  ) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}