import { Router } from "express";
import { login, register, updateUserProfile } from "../../controllers/auth.controller";
import { verifyToken } from "../../middleware/auth";

export const authRouter = Router();

authRouter.route("/register")
    .post(register)

authRouter.route("/login")
    .post(login);

authRouter.route("/profile")
    .put(verifyToken, updateUserProfile)
