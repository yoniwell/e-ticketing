import { z } from "zod";

export const updateUserSchema = z.object({

    firstName: z.string().trim().min(2).max(50).optional(),

    lastName: z.string().trim().min(2).max(50).optional(),

    email: z.string().email().optional(),

    phoneNumber: z.string().min(10).max(15).optional(),

    roleId: z.coerce.bigint().optional(),

    branchId: z.coerce.bigint().optional()

});