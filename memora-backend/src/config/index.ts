import production from "./prod";
import development from "./dev";
import dotenv from "dotenv";
import { Config } from "../types/config";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

// Fail fast in production instead of running with a guessable JWT secret or no database
if (isProduction) {
    const missing = ["JWT_SECRET", "PROD_MONGO_URI", "PROD_AI_SERVER_URL"].filter((key) => !process.env[key]);
    if (missing.length) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
}

export const config: Config = isProduction ? production : development;
