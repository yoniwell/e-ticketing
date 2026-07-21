import { AppError } from "../../../common/errors/index.js";

import { AUTH_MESSAGES } from "../constants/auth.constants.js";

import { AuthRepository } from "../repositories/auth.repository.js";

import { PasswordService } from "../utils/password.js";

import { TokenService } from "../utils/token.js";

import { AuthMapper } from "../mappers/auth.mapper.js";

import type { RegisterDto } from "../dto/register.dto.js";

import type { LoginDto } from "../dto/login.dto.js";

import type {
    IAuthService,
    LoginResponse,
} from "../interfaces/auth.service.interface.js";

export class AuthService implements IAuthService {

    constructor(

        private readonly repository = new AuthRepository()

    ) {}

    async register(

        dto: RegisterDto

    ): Promise<LoginResponse> {

        // Normalize email
        const email = dto.email.trim().toLowerCase();

        // Check email
        if (

            await this.repository.existsByEmail(email)

        ) {

            throw new AppError(

                AUTH_MESSAGES.USER_ALREADY_EXISTS,

                409

            );

        }

        // Check phone
        if (

            await this.repository.existsByPhone(

                dto.phoneNumber

            )

        ) {

            throw new AppError(

                AUTH_MESSAGES. INVALID_CREDENTIALS,

                409

            );

        }

        // Hash password
        const passwordHash =

            await PasswordService.hash(

                dto.password

            );

        // Create user
        const user =

            await this.repository.createUser(

                AuthMapper.toCreateUserInput(

                    {

                        ...dto,

                        email

                    },

                    passwordHash

                )

            );

        // Generate Tokens
        const accessToken =

            TokenService.createAccessTokenForUser(

                user

            );

        const refreshToken =

            TokenService.createRefreshTokenForUser(

                user

            );

        return {

            user: AuthMapper.toAuthenticatedUser(

                user

            ),

            accessToken,

            refreshToken

        };

    }

    async login(

        dto: LoginDto

    ): Promise<LoginResponse> {

        const identifier =

            dto.identifier.trim().toLowerCase();

        const user =

            await this.repository.findByIdentifier(

                identifier

            );

        if (!user) {

            throw new AppError(

                AUTH_MESSAGES.INVALID_CREDENTIALS,

                401

            );

        }

        const passwordCorrect =

            await PasswordService.compare(

                dto.password,

                user.passwordHash

            );

        if (!passwordCorrect) {

            throw new AppError(

                AUTH_MESSAGES.INVALID_CREDENTIALS,

                401

            );

        }

        await this.repository.updateLastLogin(

            user.id

        );

        const accessToken =

            TokenService.createAccessTokenForUser(

                user

            );

        const refreshToken =

            TokenService.createRefreshTokenForUser(

                user

            );

        return {

            user: AuthMapper.toAuthenticatedUser(

                user

            ),

            accessToken,

            refreshToken

        };

    }

}