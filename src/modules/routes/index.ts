import { Router } from "express";

import authRoutes from "../auth/routes/auth.routes.js";
import userRoutes from "../users/routes/users.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);



router.get("/test", (req, res) => {
    res.json({
        message: "Main modules router works"
    });
});




export default router;