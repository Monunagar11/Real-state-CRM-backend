import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logOutUser);

export default router;