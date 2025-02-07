import mongoose, { Document, Model, Schema } from "mongoose";

interface ILevelScore {
  level: number;
  accuracy: number; // e.g., percentage of correct answers
  errors: number; // number of errors
  responseTime: number; // total response time for this level in milliseconds
}

interface ITotalScore {
  avgAccuracy: number; // average accuracy across levels
  totalErrors: number; // sum of all errors across levels
  totalResponseTime: number; // sum of response times across levels
}

// Base interface
export interface IGameSession {
  userId: string; // Reference to the user
  sessionDate: Date; // Date of the session
  gameType: string // The type of game user took a session on
  initConfig: {}, // The initial configurations of the game type
  levelScores: ILevelScore[]; // Scores for individual levels
  totalScore: ITotalScore; // Aggregated score for the session
}

export interface IGameSessionDocument extends Document, IGameSession { }
export interface IGameSessionModel extends Model<IGameSessionDocument> { }

// Schema definition
const GameSessionSchema = new Schema<IGameSessionDocument>(
  {
    userId: { type: String, required: true, index: true },
    sessionDate: { type: Date, default: Date.now, index: true },
    gameType: { type: String, required: true },
    initConfig: {},
    levelScores: [
      {
        level: { type: Number, required: false },
        accuracy: { type: Number, required: false },
        sessionErrors: { type: Number, required: false },
        responseTime: { type: Number, required: false },
      },
    ],
    totalScore: {
      avgAccuracy: { type: Number, required: false },
      totalErrors: { type: Number, required: false },
      totalResponseTime: { type: Number, required: false },
    },
  },
  { timestamps: true }
);

export const GameSessionModel = mongoose.model<IGameSessionDocument, IGameSessionModel>(
  "GameSession",
  GameSessionSchema
);
