import { Router } from "express";

import { validate } from "../../../common/validation/validate.js";

import { UsersController } from "../controllers/users.controller.js";

import { createUserSchema } from "../validation/create-user.schema.js";

const router = Router();

const controller = new UsersController();

router.post(
    "/register",
    validate({body:createUserSchema}),
    controller.register
);

export default router;