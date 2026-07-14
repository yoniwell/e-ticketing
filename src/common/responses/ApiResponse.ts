export class ApiResponse<T = unknown> {
  constructor(
    public readonly success: boolean,
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data?: T,
    public readonly meta?: Record<string, unknown>
  ) {}
}