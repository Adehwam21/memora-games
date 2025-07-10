import dotenv from "dotenv";
import { Config } from "../types/config";
dotenv.config();

const config: Config = {
    app: {
        env: "production",
        name: "memora-backend-production",
        port: process.env.PORT as unknown as number,
    },
    auth: {
        secret: process.env.JWT_SECRET as string || "00606060",
        expiresIn: "1d",
    },
    db: {
        uri: process.env.PROD_MONGO_URI as string || "",
    },
    aiServer: {
        baseUrl: process.env.PROD_AI_SERVER_URL as string || "",
    }
};

export default config;