import { Router } from "express";
import { login, register } from "../../controllers/auth.controller";

export const authRouter = Router();

authRouter.route("/register")
    .post(register)

authRouter.route("/login")
    .post(login);
