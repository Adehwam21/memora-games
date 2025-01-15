import { Router } from 'express';
import {
    createGameSession,
    getGameSessionsByUser,
    getGameSessionById,
    updateGameSession,
    deleteGameSession,
} from "../../controllers/game.controller";

import { verifyToken, admin, player } from '../../middleware/auth';

export const gameRouter = Router();

gameRouter.route("/game-session")
    .post([verifyToken, player], createGameSession); // Create a game session

gameRouter.route("/game-session/user/:userId")
    .get(getGameSessionsByUser); // Get all game sessions for a user

gameRouter.route("/game-session/:id")
    .get(getGameSessionById); // Get a specific game session by ID

gameRouter.route("/game-session/update/:id")
    .put([verifyToken, player], updateGameSession); // Update a specific game session

gameRouter.route("/game-session/del/:id")
    .delete(deleteGameSession); // Delete a specific game session
