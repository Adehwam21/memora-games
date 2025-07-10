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
exports.exportStroopParticipantGameSessionsToCSV = exports.exportGuessWhatParticipantSessionsToCSV = exports.getAllCompletedGameSessions = exports.getAllGameSessions = exports.deleteGameSession = exports.updateGameSession = exports.getGameSessionById = exports.getCompleteGameSessionsByUser = exports.getGameSessionsByUser = exports.createResearchGameSession = exports.createGameSession = void 0;
const game_1 = require("../types/game");
const guessWhatUtils_1 = require("../utils/guessWhatUtils");
const helpers_1 = require("../utils/helpers");
const stroopUtils_1 = require("../utils/stroopUtils");
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
        const { gameTitle, participantInfo } = req.body;
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
            mmseScore: Number(participantInfo.mmseScore),
            consent: participantInfo.consent,
            educationLevel: participantInfo.educationLevel,
            participantName: participantInfo.name,
            age: participantInfo.age,
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
 * Get all complete game sessions for a user
 */
const getCompleteGameSessionsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const gameSessions = yield req.context.services.gameSession.getCompleteSessionsByUserId(userId);
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
exports.getCompleteGameSessionsByUser = getCompleteGameSessionsByUser;
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
    try {
        const { id } = req.params;
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { age, educationLevel } = req.user;
        const { updateData, gameKey } = req.body;
        let metrics;
        let mmseScore;
        switch (gameKey) {
            case "guess-what":
                metrics = (0, guessWhatUtils_1.formatGuessWhatSessionForMMSEPrediction)(updateData);
                mmseScore = yield (0, helpers_1.requestMMSEScore)(Object.assign(Object.assign({}, metrics), { educationLevel, age }), gameKey);
                break;
            case "stroop":
                metrics = (0, stroopUtils_1.formatStroopSessionForMMSEPrediction)(updateData);
                mmseScore = yield (0, helpers_1.requestMMSEScore)(Object.assign(Object.assign({}, metrics), { educationLevel, age }), gameKey);
                break;
            default:
                res.status(400).json({ message: "Invalid game key" });
                return;
        }
        const updatedGameSession = yield req.context.services.gameSession.updateOne(id, Object.assign(Object.assign({}, updateData), { mmseScore }));
        if (!updatedGameSession) {
            res.status(404).json({ message: "Game session not found" });
            return;
        }
        res.status(200).json({
            message: "Game session updated successfully",
            gameSession: updatedGameSession,
        });
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
/**
 * Get all completed game sessions
*/
const getAllCompletedGameSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameSessions = yield req.context.services.gameSession.getAllCompleted();
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
exports.getAllCompletedGameSessions = getAllCompletedGameSessions;
const exportGuessWhatParticipantSessionsToCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const gameSessions = yield ((_a = req.context.services) === null || _a === void 0 ? void 0 : _a.gameSession.getParticipantSession("guess what"));
        if (!gameSessions) {
            res.status(404).json({ message: "No participant game session found" });
            return;
        }
        const csv = (0, guessWhatUtils_1.formatGuessWhatParticipantSession)(gameSessions);
        if (!csv) {
            res.status(404).json({ message: "Counldn't export" });
            return;
        }
        res.header("Content-Type", "text/csv");
        res.attachment("guesswhat_sessions.csv");
        res.send(csv);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.exportGuessWhatParticipantSessionsToCSV = exportGuessWhatParticipantSessionsToCSV;
const exportStroopParticipantGameSessionsToCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const sessions = yield ((_a = req.context.services) === null || _a === void 0 ? void 0 : _a.gameSession.getParticipantSession("stroop"));
        if (!sessions) {
            res.status(404).json({ message: "No participant game session found" });
            return;
        }
        const csv = (0, stroopUtils_1.formatStroopParticipantSession)(sessions);
        if (!csv) {
            res.status(404).json({ message: "Counldn't export" });
            return;
        }
        res.header("Content-Type", "text/csv");
        res.attachment("stroop_sessions.csv");
        res.send(csv);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.exportStroopParticipantGameSessionsToCSV = exportStroopParticipantGameSessionsToCSV;
//# sourceMappingURL=gameSession.controller.js.map