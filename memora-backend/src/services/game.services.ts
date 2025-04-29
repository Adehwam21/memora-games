import { IAppContext, IService } from "../types/app";
import { IGame } from "../models/game.model";

export default class GameSessionService extends IService {
    constructor(props: IAppContext) {
        super(props);
    }

    async addOne(input: IGame) {
      try {
        const game = await this.db!.GameModel.create(input);
        await game.save();
        return game;

      } catch (e) {
        throw e;
      }
    }

    async getManyByType(input: {gameType: string}): Promise<IGame[]> {
      try {
        const game = await this.db!.GameModel.find({gametype: input.gameType});

        if (!game){
          throw new Error("No game found");
        }
  
        return game;

      } catch (e) {
        throw e;
      }

    }

    async getManyByDeveloper(input: {developer: string}): Promise<IGame[]> {
      try {
        const game = await this.db!.GameModel.find({developer: input.developer});

        if (!game){
          throw new Error("No game found");
        }
  
        return game;
        
      } catch (e) {
        throw e;
      }

    }

    async getOneByID(_id: string): Promise<IGame> {
      try {
        const game = await this.db!.GameModel.findById(_id);

        if (!game){
          throw new Error("No game found");
        }
  
        return game

      } catch (e) {
        throw e;
      }

    }

    async getAll(): Promise<IGame[]> {
      try {
        const games = await this.db!.GameModel.find();
        
        if (!games){
          throw new Error("No games found");
        }

        return games;
      } catch (e) {
        throw e;
      }
    }
  }