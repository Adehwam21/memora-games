"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSessionModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
// Schema definition
const GameSessionSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, index: true },
    ssid: { type: String, required: true, index: true, default: uuid_1.v4 },
    sessionDate: { type: String, default: Date.now, index: true },
    gameTitle: { type: String, required: true },
    gameType: { type: String, required: false },
    initConfig: {},
    metrics: { type: mongoose_1.Schema.Types.Mixed, required: false },
    totalScore: { type: Number, required: false },
    mmseScore: { type: Number, required: false },
    age: { type: String, required: false },
    participantName: { type: String, required: false },
}, { timestamps: true });
exports.GameSessionModel = mongoose_1.default.model("GameSession", GameSessionSchema);
//# sourceMappingURL=gameSession.model.js.map