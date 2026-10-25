import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import axios from "axios";
import { Config } from "./types/config";
import customError from "./types/error";
import { IAppContext } from "./types/app";
import InitDB from "./db";
import initServices from "./services/index";
import logger from "./logger";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes/rotues";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";


export default async function start(config: Config) {
  try {
    // initialize server and services
    const appContext: IAppContext = {};
    appContext.db = await InitDB(config.db);
    appContext.services = await initServices(appContext);
    const app = express();
    app.use(cors({
      origin: "*"
    }));
    app.use(morgan('dev'));
    app.use(express.json(), bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use((req: Request, res: Response, next: NextFunction) => {
      req.context = appContext;
      next();
    });


    // Middleware to log request details
    app.use((req, res, next) => {
      const start = process.hrtime();

      res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(3); // in milliseconds
        const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration} ms - ${res.get('Content-Length') || 0}`;

        logger.info({
          message: logMessage,
          type: "service log"
        });
      });

      next();
    });

    //use routes
    app.use("/api/v1", routes);

    // Render polls this; report unhealthy if the model server is down,
    // otherwise games silently fail at the scoring step
    app.use("/health", async (req, res) => {
      try {
        await axios.get(`${config.aiServer.baseUrl}/`, { timeout: 3000 });
        res.status(200).send("Greeeeeen!");
      } catch {
        res.status(503).send("AI server unreachable");
      }
    });

    // In the Docker image the React build is served from the same origin as the API
    const webDist = process.env.WEB_DIST;
    if (webDist && fs.existsSync(webDist)) {
      app.use(express.static(webDist));

      // Let React Router handle every other page, so refreshing /dashboard/stats works
      app.get(/^\/(?!api\/).*/, (req, res) => {
        res.sendFile(path.join(webDist, "index.html"));
      });
    }

    app.use(customError);

    // start server
    app.listen(config.app.port, () => {
      console.log(`🚀 Server ready at http://localhost:${config.app.port}`);
    });
  } catch (err) {
    console.error(err);
    // Exit so the container stops and Render restarts it, instead of idling with no server
    process.exit(1);
  }
}