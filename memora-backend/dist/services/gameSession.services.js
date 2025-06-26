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
const app_1 = require("../types/app");
const mongoose_1 = require("mongoose");
class GameSessionService extends app_1.IService {
    constructor(props) {
        super(props);
    }
    /**
     * Create a new game session
     */
    addOne(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameSession = new this.db.GameSessionModel(input);
                yield gameSession.save();
                return gameSession;
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Get a single game session by ID
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameSession = yield this.db.GameSessionModel.findById(id);
                if (!gameSession) {
                    throw new Error("GameSession not found");
                }
                return gameSession;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Get all game sessions for a specific user
     */
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameSessions = yield this.db.GameSessionModel.find({ userId });
                if (!gameSessions) {
                    throw new Error("No game sessions found for this user");
                }
                return gameSessions;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Update a specific game session by ID
     */
    updateOne(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid GameSession ID");
            }
            try {
                const gameSession = yield this.db.GameSessionModel.findByIdAndUpdate(id, { $set: input }, { new: true });
                if (!gameSession) {
                    throw new Error("GameSession not found");
                }
                return gameSession;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Delete a specific game session by ID
     */
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameSession = yield this.db.GameSessionModel.findByIdAndDelete(id);
                if (!gameSession) {
                    throw new Error("GameSession not found");
                }
                return gameSession;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Get all game sessions
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameSessions = yield this.db.GameSessionModel.find();
                if (!gameSessions) {
                    throw new Error("No game sessions found");
                }
                return gameSessions;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getParticipantSession(gameTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameSessions = yield this.db.GameSessionModel.find({
                    gameTitle,
                    consent: true
                }).lean();
                return gameSessions;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = GameSessionService;
//# sourceMappingURL=gameSession.services.js.map