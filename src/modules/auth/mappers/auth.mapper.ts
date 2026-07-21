import type { Prisma, User } from "../../../generated/prisma/client.js";

import type { RegisterDto } from "../dto/register.dto.js";

import type { AuthenticatedUserResponse } from "../dto/authenticated-user-response.dto.js";

export class AuthMapper {

    /**
     * RegisterDto -> Prisma.UserCreateInput
     */
    static toCreateUserInput(
        dto: RegisterDto,
        passwordHash: string
    ): Prisma.UserCreateInput {

        return {

            firstName: dto.firstName.trim(),

            lastName: dto.lastName.trim(),

            email: dto.email.trim().toLowerCase(),

            phoneNumber: dto.phoneNumber.trim(),

            passwordHash,


            role: {

                connect: {

                    id: dto.roleId,

                },

            },

            branch: {

                connect: {

                    id: dto.branchId,

                },

            },

        };

    }

    /**
     * Prisma User -> Safe Auth Response
     */
    static toAuthenticatedUser(
        user: User
    ): AuthenticatedUserResponse {

        return {

            id: user.id,

            firstName: user.firstName,

            lastName: user.lastName,

            email: user.email,

            phoneNumber: user.phoneNumber,

            status: user.status,

            roleId: user.roleId,

            branchId: user.branchId,

            lastLogin: user.lastLogin,

            createdAt: user.createdAt,

            updatedAt: user.updatedAt,

        };

    }

}