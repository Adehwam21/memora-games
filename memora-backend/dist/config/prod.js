"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app: {
        env: "production",
        name: "memora-backend-production",
        port: process.env.PORT,
    },
    auth: {
        secret: process.env.JWT_SECRET || "00606060",
        expiresIn: "1d",
    },
    db: {
        uri: process.env.PROD_MONGO_URI || "",
    },
    aiServer: {
        baseUrl: process.env.PROD_AI_SERVER_URL || "",
    }
};
exports.default = config;
//# sourceMappingURL=prod.js.map