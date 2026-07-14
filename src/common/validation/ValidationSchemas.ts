import { ZodType} from "zod";

export interface ValidationSchemas {
    body?: ZodType;

    params?: ZodType;

    query?: ZodType;

    headers?: ZodType;
}