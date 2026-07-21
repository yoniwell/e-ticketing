import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { AppError } from "../../../common/errors/index.js";

import { AUTH_MESSAGES } from "../constants/auth.constants.js";

import { AuthRepository } from "../repositories/auth.repository.js";

import { TokenService } from "../utils/token.js";

const repository = new AuthRepository();

export async function authenticate(
    req: Request,
    _res: Response,
    next: NextFunction,
): Promise<void> {
    try {

        /*
        |--------------------------------------------------------------------------
        | Authorization Header
        |--------------------------------------------------------------------------
        */

        const authorization = req.headers.authorization;

        if (!authorization) {

            throw new AppError(

                AUTH_MESSAGES.TOKEN_REQUIRED,

                401,

            );

        }

        /*
        |--------------------------------------------------------------------------
        | Bearer Token
        |--------------------------------------------------------------------------
        */

        const [scheme, token] = authorization.split(" ");

        if (

            scheme !== "Bearer"

            ||

            !token

        ) {

            throw new AppError(

                AUTH_MESSAGES.INVALID_TOKEN,

                401,

            );

        }

        /*
        |--------------------------------------------------------------------------
        | Verify JWT
        |--------------------------------------------------------------------------
        */

        const payload = TokenService.verifyAccessToken(token);

        /*
        |--------------------------------------------------------------------------
        | Find User
        |--------------------------------------------------------------------------
        */

        const user = await repository.findById(

            BigInt(payload.sub),

        );

        if (!user) {

            throw new AppError(

                AUTH_MESSAGES.INVALID_TOKEN,

                401,

            );

        }

        /*
        |--------------------------------------------------------------------------
        | Check Account Status
        |--------------------------------------------------------------------------
        */

        if (user.status !== "ACTIVE") {

            throw new AppError(

                AUTH_MESSAGES.ACCOUNT_DISABLED,

                403,

            );

        }

        /*
        |--------------------------------------------------------------------------
        | Attach Authenticated User
        |--------------------------------------------------------------------------
        */

        req.user = {

            id: user.id,

            roleId: user.roleId,

            branchId: user.branchId,

            status: user.status,

        };

        next();

    } catch (error) {

        next(error);

    }
}