import { Router } from "express";
import { createGame, getAllGames } from "../../controllers/game.controller";
import { verifyToken, developer } from "../../middleware/auth";

export const gameRouter = Router()

gameRouter.route('/')
  .get(getAllGames)
  .post([verifyToken, developer], createGame)