import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { prisma } from "../../../database/prisma.js";

import { AppError } from "../../../common/errors/index.js";


export function authorize(permissionName: string) {


    return async function (

        req: Request,

        _res: Response,

        next: NextFunction,

    ): Promise<void> {


        try {


            if (!req.user) {

                throw new AppError(
                    "Authentication required",
                    401,
                );

            }



            const hasPermission =
                await prisma.rolePermission.findFirst({

                    where: {

                        roleId: req.user.roleId,

                        permission: {

                            name: permissionName,

                        },

                    },

                });



            if (!hasPermission) {

                throw new AppError(
                    "Forbidden: insufficient permission",
                    403,
                );

            }



            next();



        } catch(error) {

            next(error);

        }


    };

}