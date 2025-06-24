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
        name: "memora-backend",
        port: process.env.PORT,
    },
    auth: {
        secret: process.env.JWT_SECRET || "00606060",
        expiresIn: "1d",
    },
    db: {
        uri: process.env.PROD_MONGO_URI || "",
    },
};
exports.default = config;
//# sourceMappingURL=prod.js.map