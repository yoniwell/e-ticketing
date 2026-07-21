import { Router } from "express";

import { AuthController } from "../controllers/auth.controller.js";

import { validate } from "../../../common/validation/validate.js";

import { registerSchema } from "../validation/register.schema.js";
import { loginSchema } from "../validation/login.schema.js";

import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { authenticate } from "../../../modules/auth/middleware/authenticate.js";

import { authorize } from "../../../modules/auth/middleware/authorize.js";
import {  PERMISSIONS } from "../../../modules/auth/constants/permissions.js";


const router = Router();

router.post(

    "/register",

    validate({ body: registerSchema }),

    asyncHandler(AuthController.register),

);

router.post(

    "/login",

    validate({ body: loginSchema }),

    asyncHandler(AuthController.login),

);
router.get("/test", (req,res)=>{
    res.json({
        message:"Auth route works"
    });
});



router.get(

    "/profile",

    authenticate,

    asyncHandler(AuthController.profile),

);

router.get(

    "/permission-test",

    authenticate,

    authorize(PERMISSIONS.USERS_READ),

    (req,res)=>{

        res.json({
            message:"You have users.read permission"
        });

    }

);

export default router;