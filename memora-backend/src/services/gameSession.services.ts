import { IGameSession } from "../models/gameSession.model";
import { IAppContext, IService } from "../types/app";
import { Types } from "mongoose";

export default class GameSessionService extends IService {
    constructor(props: IAppContext) {
        super(props);
    }

    /**
     * Create a new game session
     */
    async addOne(input: Partial<IGameSession>): Promise<IGameSession> {
        try {
            const gameSession = new this.db.GameSessionModel(input);
            await gameSession.save();
            return gameSession;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get a single game session by ID
     */
    async getById(id: string): Promise<IGameSession | null> {
        try {
            const gameSession = await this.db.GameSessionModel.findById(id)
                .sort({updatedAt: 1});
            if (!gameSession) {
                throw new Error("GameSession not found");
            }
            return gameSession;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get all game sessions for a specific user
     */
    async getByUserId(userId: string): Promise<IGameSession[]> {
        try {
            const gameSessions = await this.db.GameSessionModel.find({ userId });
            if (!gameSessions) {
                throw new Error("No game sessions found for this user");
            }
            return gameSessions;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get all complete game sessions for a specific user
     */
    async getCompleteSessionsByUserId(userId: string): Promise<IGameSession[]> {
        try {
            const gameSessions = await this.db.GameSessionModel.find({ userId, complete: true });
            if (!gameSessions) {
                throw new Error("No game sessions found for this user");
            }
            return gameSessions;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update a specific game session by ID
     */
    async updateOne(id: string, input: Partial<IGameSession>): Promise<IGameSession | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid GameSession ID");
        }

        try {
            const gameSession = await this.db.GameSessionModel.findByIdAndUpdate(
                id,
                { $set: input },
                { new: true }
            );
            if (!gameSession) {
                throw new Error("GameSession not found");
            }
            return gameSession;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Delete a specific game session by ID
     */
    async deleteOne(id: string): Promise<IGameSession | null> {
        try {
            const gameSession = await this.db.GameSessionModel.findByIdAndDelete(id);
            if (!gameSession) {
                throw new Error("GameSession not found");
            }
            return gameSession;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get all game sessions
     */
    async getAll(): Promise<IGameSession[]> {
        try {
            const gameSessions = await this.db.GameSessionModel.find();
            if (!gameSessions) {
                throw new Error("No game sessions found");
            }
            return gameSessions;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get all completed game sessions
     */
    async getAllCompleted(): Promise<IGameSession[] | any> {
        try {
            const gameSessions = await this.db.GameSessionModel.find({complete: true});
            if (!gameSessions) {
                throw new Error("No game sessions found");
            }
            return gameSessions;
        } catch (e) {
            throw e;
        }   
    }

    async getParticipantSession(gameTitle: string): Promise<any> {
        try {
            const gameSessions = await this.db.GameSessionModel.find({
                gameTitle,
                consent: true
            }).lean()

            return gameSessions
        } catch (e) {
            throw e;
        }
    }
}
