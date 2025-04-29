import { Router } from "express";
import { authRouter } from "./api/auth.route";
import { gameSessionRouter } from "./api/gameSession.route";
import { gameRouter } from "./api/game.route";

const routes = Router()

routes.use('/auth', authRouter);
routes.use('/game-session', gameSessionRouter);
routes.use('/game', gameRouter)

export default routes;