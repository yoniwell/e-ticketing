import bcrypt from "bcrypt";

import { AppError } from "../../../common/errors/index.js";

import { USER_MESSAGES } from "../constants/user.constants.js";

import { UserMapper } from "../mappers/user.mapper.js";

import { UsersRepository } from "../repositories/users.repository.js";

import type { CreateUserDto } from "../dto/create-user.dto.js";

export class UsersService {

    constructor(

        private readonly repository = new UsersRepository()

    ) {}

    async register(

        dto: CreateUserDto

    ) {

        const emailExists =

            await this.repository.findByEmail(

                dto.email

            );

        if (emailExists) {

            throw new AppError(

                USER_MESSAGES.EMAIL_EXISTS,

                409

            );

        }

        const phoneExists =

            await this.repository.findByPhone(

                dto.phoneNumber

            );

        if (phoneExists) {

            throw new AppError(

                USER_MESSAGES.PHONE_EXISTS,

                409

            );

        }

        const passwordHash =

            await bcrypt.hash(

                dto.password,

                12

            );

        const user =

            UserMapper.toCreateInput(

                dto,

                passwordHash

            );

        return this.repository.create(

            user

        );

    }

}