import type { UserStatus } from "../../../generated/prisma/enums.js";

export interface AuthenticatedUserResponse {

    id: bigint;

    firstName: string;

    lastName: string;

    email: string;

    phoneNumber: string;

    status: UserStatus;

    roleId: bigint;

    branchId: bigint;

    lastLogin: Date | null;

    createdAt: Date;

    updatedAt: Date;

}