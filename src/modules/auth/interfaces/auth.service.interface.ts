import type { RegisterDto } from "../dto/register.dto.js";
import type { LoginDto } from "../dto/login.dto.js";

export interface LoginResponse {

    user: unknown;

    accessToken: string;

    refreshToken: string;

}

export interface IAuthService {

    register(
        dto: RegisterDto
    ): Promise<LoginResponse>;

    login(
        dto: LoginDto
    ): Promise<LoginResponse>;

}