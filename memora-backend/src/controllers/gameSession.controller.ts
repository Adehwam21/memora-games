import { Request, Response } from "express";
import { GameInitialConfig, GameTypeEnum } from "../types/game";
import { formatGuessWhatParticipantSession } from "../utils/guessWhatUtils";
import { formatStroopParticipantSession } from "../utils/stroopUtils";

/**
 * Create a new game session
 */
export const createGameSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const { gameTitle } = req.body;
        const { userId } = req.user!;
        const formattedGameTitle = gameTitle.toString().trim().replace(" ", "-");

        const initialConfig =
            formattedGameTitle === GameTypeEnum.GuessWhat
                ? GameInitialConfig.guessWhat
                : formattedGameTitle === GameTypeEnum.Stroop
                ? GameInitialConfig.stroop
                : null;

        const newGameSession = await req.context!.services!.gameSession.addOne({
            userId,
            gameTitle,
            initConfig: initialConfig!,
        });

        if (gameTitle === GameTypeEnum.GuessWhat){
            newGameSession.initConfig = GameInitialConfig.guessWhat;
        } else if (gameTitle == GameTypeEnum.Stroop){
            newGameSession.initConfig = GameInitialConfig.stroop;
        }

        res.status(201).json({ message: "Game session created successfully", gameSession: newGameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Create a new research session
 */
export const createResearchGameSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const { gameTitle, participantInfo } = req.body;
        const { userId } = req.user!;
        const formattedGameTitle = gameTitle.toString().trim().replace(" ", "-");

        const initialConfig =
            formattedGameTitle === GameTypeEnum.GuessWhat
                ? GameInitialConfig.guessWhat
                : formattedGameTitle === GameTypeEnum.Stroop
                ? GameInitialConfig.stroop
                : null;

        const newGameSession = await req.context!.services!.gameSession.addOne({
            userId,
            gameTitle,
            initConfig: initialConfig!,
            mmseScore: Number(participantInfo.mmseScore),
            consent: participantInfo.consent,
            educationLevel: participantInfo.educationLevel,
            participantName: participantInfo.name,
            age: participantInfo.age,
        });

        if (gameTitle === GameTypeEnum.GuessWhat){
            newGameSession.initConfig = GameInitialConfig.guessWhat;
        } else if (gameTitle == GameTypeEnum.Stroop){
            newGameSession.initConfig = GameInitialConfig.stroop;
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
        const gameSessions = await req.context!.services!.gameSession!.getByUserId(userId);

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
 * Get all complete game sessions for a user
 */
export const getCompleteGameSessionsByUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const gameSessions = await req.context!.services!.gameSession!.getCompleteSessionsByUserId(userId);

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
        const updatedGameSession = await req.context!.services!.gameSession!.updateOne(id, updateData);

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

/**
 * Get all completed game sessions
*/
export const getAllCompletedGameSessions = async (req: Request, res: Response): Promise<void> => {
    try {
        const gameSessions = await req.context!.services!.gameSession.getAllCompleted();

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

export const exportGuessWhatParticipantSessionsToCSV = async (req: Request, res: Response): Promise<void> => {
    try {
        const gameSessions = await req.context.services?.gameSession.getParticipantSession("guess what");

        if (!gameSessions){
            res.status(404).json({message: "No participant game session found"});
            return;
        }

        const csv = formatGuessWhatParticipantSession(gameSessions);
        if(!csv){
            res.status(404).json({message: "Counldn't export"});
            return;
        }

        res.header("Content-Type", "text/csv");
        res.attachment("guesswhat_sessions.csv");
        res.send(csv);
        return;

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const exportStroopParticipantGameSessionsToCSV = async (req: Request, res: Response): Promise<void> => {
    try {
        const sessions = await req.context.services?.gameSession.getParticipantSession("stroop");
        if (!sessions){
            res.status(404).json({message: "No participant game session found"});
            return;
        }

        const csv = formatStroopParticipantSession(sessions);
        if(!csv){
            res.status(404).json({message: "Counldn't export"});
            return;
        }

        res.header("Content-Type", "text/csv");
        res.attachment("stroop_sessions.csv");
        res.send(csv);
        return;


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}