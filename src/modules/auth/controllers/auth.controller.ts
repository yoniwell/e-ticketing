import { Request, Response } from "express";

import { asyncHandler } from "../../../common/utils/asyncHandler.js";

import { sendResponse } from "../../../common/responses/sendResponse.js";

import { AUTH_MESSAGES } from "../constants/auth.constants.js";

import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

const register = asyncHandler(

    async (req: Request, res: Response) => {

        const result = await authService.register(req.body);

        return sendResponse(

            res,

            201,

            AUTH_MESSAGES.REGISTER_SUCCESS,

            result

        );

    }

);

const login = asyncHandler(

    async (req: Request, res: Response) => {

        const result = await authService.login(req.body);

        return sendResponse(

            res,

            200,

            AUTH_MESSAGES.LOGIN_SUCCESS,

            result

        );

    }

);

export const profile = asyncHandler(

    async (req, res) => {

        return sendResponse(

            res,

            200,

            "Authenticated user",

            req.user,

        );

    },

);

export const AuthController = {

    register,

    login,
    profile,
};