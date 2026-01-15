import { Router } from "express";
import { loginUser, logOutUser, refreshToken, registerUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshToken);

// verified routes
router.route("/logout").post(verifyJWT,logOutUser);

export default router;