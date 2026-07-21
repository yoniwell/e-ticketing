import type {

    Request,

    Response

} from "express";

import { asyncHandler } from "../../../common/utils/index.js";

import { sendResponse } from "../../../common/responses/index.js";

import { USER_MESSAGES } from "../constants/user.constants.js";

import { UsersService } from "../services/users.service.js";

export class UsersController {

    constructor(

        private readonly service =

            new UsersService()

    ) {}

    register =

        asyncHandler(

            async (

                req: Request,

                res: Response

            ) => {

                const user =

                    await this.service.register(

                        req.body

                    );

              return sendResponse(
                res,
                201,
                USER_MESSAGES.CREATED,
                user
                 );

            }

        );

}