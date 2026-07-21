import { z } from "zod";

export const createUserSchema = z.object({

    firstName: z.string()
        .trim()
        .min(2)
        .max(50),

    lastName: z.string()
        .trim()
        .min(2)
        .max(50),

    email: z.string()
        .email()
        .toLowerCase(),

    phoneNumber: z.string()
        .min(10)
        .max(15),

    password: z.string()
        .min(8)
        .max(100),

    roleId: z.coerce.bigint(),

    branchId: z.coerce.bigint()

});