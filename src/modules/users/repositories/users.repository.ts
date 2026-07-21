import { prisma } from "../../../database/prisma.js";

import type { Prisma } from "../../../generated/prisma/client.js";
import type { UserModel as User } from "../../../generated/prisma/models.js";

import type { IUsersRepository } from "../interfaces/users.repository.interface.js";

export class UsersRepository implements IUsersRepository {

    async findById(id: bigint): Promise<User | null> {

        return prisma.user.findUnique({

            where: {

                id

            }

        });

    }

    async findByEmail(email: string): Promise<User | null> {

        return prisma.user.findUnique({

            where: {

                email

            }

        });

    }

    async findByPhone(phoneNumber: string): Promise<User | null> {

        return prisma.user.findUnique({

            where: {

                phoneNumber

            }

        });

    }

    async create(

        data: Prisma.UserCreateInput

    ): Promise<User> {

        return prisma.user.create({

            data

        });

    }

    async update(

        id: bigint,

        data: Prisma.UserUpdateInput

    ): Promise<User> {

        return prisma.user.update({

            where: {

                id

            },

            data

        });

    }

    async delete(

        id: bigint

    ): Promise<User> {

        return prisma.user.delete({

            where: {

                id

            }

        });

    }

}