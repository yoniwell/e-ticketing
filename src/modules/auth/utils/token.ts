import jwt from "jsonwebtoken";

import { env } from "../../../config/index.js";

import type { JwtPayload } from "../types/auth.types.js";

import type { UserModel as User} from "../../../generated/prisma/models.js";

export class TokenService {

    static generateAccessToken(

        payload: JwtPayload

    ): string {

        return jwt.sign(

            payload,

            env.JWT_ACCESS_SECRET,

            {

                expiresIn:

                    env.JWT_ACCESS_EXPIRES_IN

            }

        );

    }

    static generateRefreshToken(

        payload: JwtPayload

    ): string {

        return jwt.sign(

            payload,

            env.JWT_REFRESH_SECRET,

            {

                expiresIn:

                    env.JWT_REFRESH_EXPIRES_IN

            }

        );

    }

    static verifyAccessToken(

        token: string

    ): JwtPayload {

        return jwt.verify(

            token,

            env.JWT_ACCESS_SECRET

        ) as JwtPayload;

    }

    static verifyRefreshToken(

        token: string

    ): JwtPayload {

        return jwt.verify(

            token,

            env.JWT_REFRESH_SECRET

        ) as JwtPayload;

    }

    static createPayload(user: User): JwtPayload {

    return {

        sub: user.id.toString(),

        roleId: user.roleId.toString(),

        branchId: user.branchId.toString(),

    };

}

static createAccessTokenForUser(
    user: User
): string {

    return this.generateAccessToken(

        this.createPayload(user)

    );

}

static createRefreshTokenForUser(
    user: User
): string {

    return this.generateRefreshToken(

        this.createPayload(user)

    );

}

}