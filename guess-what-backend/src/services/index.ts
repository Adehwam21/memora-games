import { IAppContext } from "../types/app";
import UserService from "./user.services";
import GameSessionService from "./game.services";

export interface IServices {
    user: UserService;
    gameSession: GameSessionService;
}

export default async function initServices(context: IAppContext) {
    try {
        return {
            user: new UserService(context),
            gameSession: new GameSessionService(context)
        };
    } catch (e) {
        throw e;
    }
}