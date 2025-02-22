import { Request, Response } from "express";
import { GameInitialConfig, GameTypeEnum } from "../types/game";

/**
 * Create a new game session
 */
export const createGameSession = async (req: Request, res: Response): Promise<void> => {
    const { gameType } = req.body;
    const { userId } = req.user!;

    try {
        const newGameSession = await req.context!.services!.gameSession.addOne({
            userId,
            gameType
        });

        if (gameType === GameTypeEnum.GuessWhat){
            newGameSession.initConfig = GameInitialConfig.guessWhat;
        }

        res.status(201).json({ message: "Game session created successfully", gameSession: newGameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Get all game sessions for a user
 */
export const getGameSessionsByUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const gameSessions = await req.context!.services!.gameSession.getByUserId(userId);

        if (gameSessions.length === 0) {
            res.status(404).json({ message: "No game sessions found for this user" });
            return;
        }

        res.status(200).json({ gameSessions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Get a single game session by ID
 */
export const getGameSessionById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const gameSession = await req.context!.services!.gameSession.getById(id);

        if (!gameSession) {
            res.status(404).json({ message: "Game session not found" });
            return;
        }

        res.status(200).json({ gameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Update a game session
 */
export const updateGameSession = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedGameSession = await req.context!.services!.gameSession.updateOne(id, updateData);

        if (!updatedGameSession) {
            res.status(404).json({ message: "Game session not found" });
            return;
        }

        res.status(200).json({ message: "Game session updated successfully", gameSession: updatedGameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Delete a game session
 */
export const deleteGameSession = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedGameSession = await req.context!.services!.gameSession.deleteOne(id);

        if (!deletedGameSession) {
            res.status(404).json({ message: "Game session not found" });
            return;
        }

        res.status(200).json({ message: "Game session deleted successfully", gameSession: deletedGameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Get all game sessions
*/
export const getAllGameSessions = async (req: Request, res: Response): Promise<void> => {
    try {
        const gameSessions = await req.context!.services!.gameSession.getAll();

        if (gameSessions.length === 0) {
            res.status(404).json({ message: "No game sessions found" });
            return;
        }

        res.status(200).json({ gameSessions });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
