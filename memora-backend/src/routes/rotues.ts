import { Router } from "express";
import { authRouter } from "./api/auth.route";
import { gameRouter } from "./api/game.route";

const routes = Router()

routes.use('/auth', authRouter);
routes.use('/game', gameRouter);

export default routes;