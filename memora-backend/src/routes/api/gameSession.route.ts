import { Router } from 'express';
import {
    createGameSession,
    getGameSessionsByUser,
    getGameSessionById,
    updateGameSession,
    deleteGameSession,
    getAllGameSessions,
} from "../../controllers/gameSession.controller";
import { verifyToken, admin, player } from '../../middleware/auth';

export const gameSessionRouter = Router();

gameSessionRouter.route("")
    .post( verifyToken, createGameSession); // Create a new game session

gameSessionRouter.route("/user/:userId")
    .get([verifyToken], getGameSessionsByUser); // Get all game sessions for a user

gameSessionRouter.route("/all/")
    .get([verifyToken, admin], getAllGameSessions); // Get all game sessions

gameSessionRouter.route("/:id")
    .get([verifyToken], getGameSessionById); // Get a specific game session by ID

gameSessionRouter.route("/update/:id")
    .put(verifyToken, updateGameSession); // Update a specific game session

gameSessionRouter.route("/del/:id")
    .delete([verifyToken, admin], deleteGameSession); // Delete a specific game session
