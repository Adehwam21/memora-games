import { Router } from "express";
import { authRouter } from "./api/auth.route";
import { gameSessionRouter, researchSessionRouter } from "./api/gameSession.route";
import { gameRouter } from "./api/game.route";

const routes = Router()

routes.use('/auth', authRouter);
routes.use('/game', gameRouter);
routes.use('/game-session', gameSessionRouter);
routes.use('/research-session', researchSessionRouter)

export default routes;