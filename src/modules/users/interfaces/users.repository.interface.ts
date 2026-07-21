import { User } from "../../../generated/prisma/client.js";
import { Prisma } from "../../../generated/prisma/client.js";

export interface IUsersRepository {

    findById(id: bigint): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    findByPhone(phoneNumber: string): Promise<User | null>;

    create(data: Prisma.UserCreateInput): Promise<User>;

    update(
        id: bigint,
        data: Prisma.UserUpdateInput
    ): Promise<User>;

    delete(id: bigint): Promise<User>;

}