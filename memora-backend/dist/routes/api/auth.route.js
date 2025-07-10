"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const auth_1 = require("../../middleware/auth");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.route("/register")
    .post(auth_controller_1.register);
exports.authRouter.route("/login")
    .post(auth_controller_1.login);
exports.authRouter.route("/profile")
    .put(auth_1.verifyToken, auth_controller_1.updateUserProfile);
//# sourceMappingURL=auth.route.js.map