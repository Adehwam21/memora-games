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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InitDB;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("./models/user.model");
const gameSession_model_1 = require("./models/gameSession.model");
const game_model_1 = require("./models/game.model");
dotenv_1.default.config();
function InitDB(config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)(config.uri, { autoIndex: false });
            console.log("Database connected");
            yield user_model_1.UserModel.createCollection();
            yield gameSession_model_1.GameSessionModel.createCollection();
            yield game_model_1.GameModel.createCollection();
            return {
                UserModel: user_model_1.UserModel,
                GameSessionModel: gameSession_model_1.GameSessionModel,
                GameModel: game_model_1.GameModel
            };
        }
        catch (e) {
            throw e;
        }
    });
}
//# sourceMappingURL=db.js.map