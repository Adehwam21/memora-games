"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.researchSessionRouter = exports.gameSessionRouter = void 0;
const express_1 = require("express");
const gameSession_controller_1 = require("../../controllers/gameSession.controller");
const auth_1 = require("../../middleware/auth");
exports.gameSessionRouter = (0, express_1.Router)();
exports.researchSessionRouter = (0, express_1.Router)();
exports.gameSessionRouter.route("")
    .post(auth_1.verifyToken, gameSession_controller_1.createGameSession); // Create a new game session
exports.gameSessionRouter.route("/user/:userId")
    .get([auth_1.verifyToken], gameSession_controller_1.getGameSessionsByUser); // Get all game sessions for a user
exports.gameSessionRouter.route("/all/")
    .get([auth_1.verifyToken, auth_1.admin], gameSession_controller_1.getAllGameSessions); // Get all game sessions
exports.gameSessionRouter.route("/:id")
    .get([auth_1.verifyToken], gameSession_controller_1.getGameSessionById); // Get a specific game session by ID
exports.gameSessionRouter.route("/update/:id")
    .put(auth_1.verifyToken, gameSession_controller_1.updateGameSession); // Update a specific game session
exports.gameSessionRouter.route("/del/:id")
    .delete([auth_1.verifyToken, auth_1.admin], gameSession_controller_1.deleteGameSession); // Delete a specific game session
exports.researchSessionRouter.route("/")
    .post([auth_1.verifyToken, auth_1.facilitator], gameSession_controller_1.createResearchGameSession); // Create a new game session
//# sourceMappingURL=gameSession.route.js.map