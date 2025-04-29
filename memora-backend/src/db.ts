import { connect } from 'mongoose';
import dotenv from 'dotenv';
import { Config } from './types/config';
import { UserModel ,IUserModel } from './models/user.model';
import { GameSessionModel, IGameSessionModel } from './models/gameSession.model';
import { GameModel, IGameModel } from './models/game.model';

dotenv.config();

export interface IDb {
    UserModel: IUserModel;
    GameSessionModel: IGameSessionModel;
    GameModel: IGameModel;
}

export default async function InitDB(config: Config["db"]): Promise<IDb> {
    try {
        await connect(config.uri, { autoIndex: false });
        console.log("Database connected");

        await UserModel.createCollection();
        await GameSessionModel.createCollection();
        await GameModel.createCollection();

        return {
            UserModel,
            GameSessionModel,
            GameModel
        };
    } catch (e) {
        throw e;
    }
}