"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRouter = void 0;
const express_1 = require("express");
const game_controller_1 = require("../../controllers/game.controller");
const auth_1 = require("../../middleware/auth");
exports.gameRouter = (0, express_1.Router)();
exports.gameRouter.route('/')
    .get(game_controller_1.getAllGames)
    .post([auth_1.verifyToken, auth_1.developer], game_controller_1.createGame);
//# sourceMappingURL=game.route.js.map