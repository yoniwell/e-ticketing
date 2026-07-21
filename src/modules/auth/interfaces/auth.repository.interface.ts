import type { UserModel as User} from "../../../generated/prisma/models.js";
import type { Prisma } from "../../../generated/prisma/client.js";

export interface IAuthRepository {

    findByIdentifier(
        identifier: string
    ): Promise<User | null>;

    createUser(
        data: Prisma.UserCreateInput
    ): Promise<User>;

    updateLastLogin(
        id: bigint
    ): Promise<void>;

}