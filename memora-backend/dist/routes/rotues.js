"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("./api/auth.route");
const gameSession_route_1 = require("./api/gameSession.route");
const game_route_1 = require("./api/game.route");
const routes = (0, express_1.Router)();
routes.use('/auth', auth_route_1.authRouter);
routes.use('/game', game_route_1.gameRouter);
routes.use('/game-session', gameSession_route_1.gameSessionRouter);
routes.use('/research-session', gameSession_route_1.researchSessionRouter);
exports.default = routes;
//# sourceMappingURL=rotues.js.map