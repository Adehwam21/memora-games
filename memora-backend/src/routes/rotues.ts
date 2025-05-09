import { Router } from "express";
import { authRouter } from "./api/auth.route";
import { gameSessionRouter } from "./api/gameSession.route";
import { gameRouter } from "./api/game.route";

const routes = Router()

routes.use('/auth', authRouter);
routes.use('/game', gameRouter);
routes.use('/game-session', gameSessionRouter);

export default routes;