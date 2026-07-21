import { Prisma } from "../../../generated/prisma/client.js";
import { CreateUserDto } from "../dto/create-user.dto.js";

export class UserMapper {

    static toCreateInput(
        dto: CreateUserDto,
        passwordHash: string
    ): Prisma.UserCreateInput {

        return {

            firstName: dto.firstName,

            lastName: dto.lastName,

            email: dto.email,

            phoneNumber: dto.phoneNumber,

            passwordHash,

            role: {
                connect: {
                    id: dto.roleId
                }
            },

            branch: {
                connect: {
                    id: dto.branchId
                }
            }

        };

    }

}