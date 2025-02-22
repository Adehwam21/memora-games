import { Router } from 'express';
import {
    createGameSession,
    getGameSessionsByUser,
    getGameSessionById,
    updateGameSession,
    deleteGameSession,
    getAllGameSessions,
} from "../../controllers/game.controller";
import { verifyToken, admin, player } from '../../middleware/auth';

export const gameRouter = Router();

gameRouter.route("/game-session")
    .post( verifyToken, createGameSession); // Create a new game session

gameRouter.route("/game-session/user/:userId")
    .get([verifyToken], getGameSessionsByUser); // Get all game sessions for a user

gameRouter.route("/game-session/all/")
    .get([verifyToken, admin], getAllGameSessions); // Get all game sessions

gameRouter.route("/game-session/:id")
    .get([verifyToken], getGameSessionById); // Get a specific game session by ID

gameRouter.route("/game-session/update/:id")
    .put([verifyToken, player], updateGameSession); // Update a specific game session

gameRouter.route("/game-session/del/:id")
    .delete([verifyToken, admin], deleteGameSession); // Delete a specific game session
