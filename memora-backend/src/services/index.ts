import { IAppContext } from "../types/app";
import UserService from "./user.services";
import GameSessionService from "./gameSession.services";
import GameService from "./game.services"

export interface IServices {
    user: UserService;
    gameSession: GameSessionService;
    game: GameService
}

export default async function initServices(context: IAppContext) {
    try {
        return {
            user: new UserService(context),
            gameSession: new GameSessionService(context),
            game: new GameService(context),
        };
    } catch (e) {
        throw e;
    }
}