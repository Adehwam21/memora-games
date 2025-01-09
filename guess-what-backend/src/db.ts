import { connect } from 'mongoose';
import dotenv from 'dotenv';
import { IUserModel } from './models/user.model';
import { Config } from './types/config';
import { UserModel } from './models/user.model';
import { GameSessionModel, IGameSessionModel } from './models/game.model';

dotenv.config();

export interface IDb {
    UserModel: IUserModel;
    GameSessionModel: IGameSessionModel;
}

export default async function InitDB(config: Config["db"]): Promise<IDb> {
    try {
        await connect(config.uri, { autoIndex: false });
        console.log("Database connected");

        await UserModel.createCollection();

        return {
            UserModel,
            GameSessionModel
        };
    } catch (e) {
        throw e;
    }
}