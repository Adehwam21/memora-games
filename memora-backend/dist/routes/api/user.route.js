"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const auth_controller_1 = require("../../controllers/auth.controller");
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.route('/profile')
    .get(auth_1.verifyToken, auth_controller_1.getUserProfile)
    .put(auth_1.verifyToken, auth_controller_1.updateUserProfile);
// userRouter.route('/profile/update-password')
//   .put(verifyToken, updateUserPassword)
//# sourceMappingURL=user.route.js.map