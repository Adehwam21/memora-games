import dotenv from "dotenv";
import { Config } from "../types/config";
dotenv.config();

const config: Config = {
    app: {
        env: "development",
        name: "memora-backend",
        port: (process.env.PORT as unknown as number) || 8000,
    },
    auth: {
        secret: process.env.JWT_SECRET as string || "00606060",
        expiresIn: "7d",
    },
    db: {
        uri: process.env.DEV_MONGO_URI as string || "",
    },
};

export default config;