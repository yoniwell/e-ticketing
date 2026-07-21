import { prisma } from "../../../database/prisma.js";


import type {
    Prisma,
    User,
} from "../../../generated/prisma/client.js";

export class AuthRepository {

    /**
     * Find user by email OR phone number
     */
    async findByIdentifier(
        identifier: string
    ): Promise<User | null> {

        return prisma.user.findFirst({

            where: {

                OR: [

                    {
                        email: identifier.toLowerCase(),
                    },

                    {
                        phoneNumber: identifier,
                    },

                ],

            },

            include: {

                role: true,

                branch: true,

            },

        });

    }

    /**
     * Find user by ID
     */
    async findById(
        id: bigint
    ): Promise<User | null> {

        return prisma.user.findUnique({

            where: {

                id,

            },

            include: {

                role: true,

                branch: true,

            },

        });

    }

    /**
     * Check if email already exists
     */
    async existsByEmail(
        email: string
    ): Promise<boolean> {

        const user = await prisma.user.findUnique({

            where: {

                email: email.toLowerCase(),

            },

            select: {

                id: true,

            },

        });

        return !!user;

    }

    /**
     * Check if phone number already exists
     */
    async existsByPhone(
        phoneNumber: string
    ): Promise<boolean> {

        const user = await prisma.user.findUnique({

            where: {

                phoneNumber,

            },

            select: {

                id: true,

            },

        });

        return !!user;

    }

    /**
     * Create new user
     */
    async createUser(
        data: Prisma.UserCreateInput
    ): Promise<User> {

        return prisma.user.create({

            data,

            include: {

                role: true,

                branch: true,

            },

        });

    }

    /**
     * Update last login timestamp
     */
    async updateLastLogin(
        id: bigint
    ): Promise<void> {

        await prisma.user.update({

            where: {

                id,

            },

            data: {

                lastLogin: new Date(),

            },

        });

    }

}