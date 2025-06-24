"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGameSessions = exports.deleteGameSession = exports.updateGameSession = exports.getGameSessionById = exports.getGameSessionsByUser = exports.createResearchGameSession = exports.createGameSession = void 0;
const game_1 = require("../types/game");
/**
 * Create a new game session
 */
const createGameSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameTitle } = req.body;
        const { userId } = req.user;
        const formattedGameTitle = gameTitle.toString().trim().replace(" ", "-");
        const initialConfig = formattedGameTitle === game_1.GameTypeEnum.GuessWhat
            ? game_1.GameInitialConfig.guessWhat
            : formattedGameTitle === game_1.GameTypeEnum.Stroop
                ? game_1.GameInitialConfig.stroop
                : null;
        const newGameSession = yield req.context.services.gameSession.addOne({
            userId,
            gameTitle,
            initConfig: initialConfig,
        });
        if (gameTitle === game_1.GameTypeEnum.GuessWhat) {
            newGameSession.initConfig = game_1.GameInitialConfig.guessWhat;
        }
        else if (gameTitle == game_1.GameTypeEnum.Stroop) {
            newGameSession.initConfig = game_1.GameInitialConfig.stroop;
        }
        res.status(201).json({ message: "Game session created successfully", gameSession: newGameSession });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createGameSession = createGameSession;
/**
 * Create a new research session
 */
const createResearchGameSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameTitle, participantName, mmse, age } = req.body;
        const { userId } = req.user;
        const formattedGameTitle = gameTitle.toString().trim().replace(" ", "-");
        const initialConfig = formattedGameTitle === game_1.GameTypeEnum.GuessWhat
            ? game_1.GameInitialConfig.guessWhat
            : formattedGameTitle === game_1.GameTypeEnum.Stroop
                ? game_1.GameInitialConfig.stroop
                : null;
        const newGameSession = yield req.context.services.gameSession.addOne({
            userId,
            gameTitle,
            initConfig: initialConfig,
            mmseScore: mmse,
            participantName,
            age,
        });
        if (gameTitle === game_1.GameTypeEnum.GuessWhat) {
            newGameSession.initConfig = game_1.GameInitialConfig.guessWhat;
        }
        else if (gameTitle == game_1.GameTypeEnum.Stroop) {
            newGameSession.initConfig = game_1.GameInitialConfig.stroop;
        }
        res.status(201).json({ message: "Game session created successfully", gameSession: newGameSession });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createResearchGameSession = createResearchGameSession;
/**
 * Get all game sessions for a user
 */
const getGameSessionsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const gameSessions = yield req.context.services.gameSession.getByUserId(userId);
        if (gameSessions.length === 0) {
            res.status(404).json({ message: "No game sessions found for this user" });
            return;
        }
        res.status(200).json({ gameSessions });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getGameSessionsByUser = getGameSessionsByUser;
/**
 * Get a single game session by ID
 */
const getGameSessionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gameSession = yield req.context.services.gameSession.getById(id);
        if (!gameSession) {
            res.status(404).json({ message: "Game session not found" });
            return;
        }
        res.status(200).json({ gameSession });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getGameSessionById = getGameSessionById;
/**
 * Update a game session
 */
const updateGameSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedGameSession = yield req.context.services.gameSession.updateOne(id, updateData);
        if (!updatedGameSession) {
            res.status(404).json({ message: "Game session not found" });
            return;
        }
        res.status(200).json({ message: "Game session updated successfully", gameSession: updatedGameSession });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateGameSession = updateGameSession;
/**
 * Delete a game session
 */
const deleteGameSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedGameSession = yield req.context.services.gameSession.deleteOne(id);
        if (!deletedGameSession) {
            res.status(404).json({ message: "Game session not found" });
            return;
        }
        res.status(200).json({ message: "Game session deleted successfully", gameSession: deletedGameSession });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteGameSession = deleteGameSession;
/**
 * Get all game sessions
*/
const getAllGameSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameSessions = yield req.context.services.gameSession.getAll();
        if (gameSessions.length === 0) {
            res.status(404).json({ message: "No game sessions found" });
            return;
        }
        res.status(200).json({ gameSessions });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.getAllGameSessions = getAllGameSessions;
//# sourceMappingURL=gameSession.controller.js.map