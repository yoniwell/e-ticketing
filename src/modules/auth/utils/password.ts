import bcrypt from "bcrypt";

import { env } from "../../../config/index.js";

export class PasswordService {

    static async hash(password: string): Promise<string> {

        return bcrypt.hash(
            password,
            Number(env.BCRYPT_ROUNDS)
        );

    }

    static async compare(

        password: string,

        passwordHash: string

    ): Promise<boolean> {

        return bcrypt.compare(
            password,
            passwordHash
        );

    }

}