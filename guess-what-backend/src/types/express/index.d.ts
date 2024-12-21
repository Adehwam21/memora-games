import express from "express";
import { IAppContext } from "../app";

declare global {
    namespace Express {
        interface Request {
            context?: IAppContext;
            user?: any;
        }
    }
}