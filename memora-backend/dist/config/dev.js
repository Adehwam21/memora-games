"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app: {
        env: "development",
        name: "memora-backend",
        port: process.env.PORT || 8000,
    },
    auth: {
        secret: process.env.JWT_SECRET || "00606060",
        expiresIn: "7d",
    },
    db: {
        uri: process.env.DEV_MONGO_URI || "",
    },
    aiServer: {
        baseUrl: process.env.DEV_AI_SERVER_URL || "",
    }
};
exports.default = config;
//# sourceMappingURL=dev.js.map