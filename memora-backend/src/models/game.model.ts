import mongoose, { Document, Model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IMetric {
  level: number;
  attempts: number;
  accuracy: number; // e.g., percentage of correct answers
  levelErrors: number; // number of errors
  totalResponseTime: number; // total response time for this level in milliseconds
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
  ssid: string; // Session ID
  gameType: string // The type of game user took a session on
  initConfig: {}, // The initial configurations of the game type
  metrics: IMetric[]; // Scores for individual levels
  mmseScore: ITotalScore; // Aggregated score for the session
}

export interface IGameSessionDocument extends Document, IGameSession { }
export interface IGameSessionModel extends Model<IGameSessionDocument> { }

// Schema definition
const GameSessionSchema = new Schema<IGameSessionDocument>(
  {
    userId: { type: String, required: true, index: true },
    ssid: { type: String, required: true, index: true, default: uuidv4 },
    sessionDate: { type: Date, default: Date.now, index: true },
    gameType: { type: String, required: true },
    initConfig: {},
    metrics: [
      {
        level: { type: Number, required: false },
        attempt: { type: Number, required: false },
        accuracy: { type: Number, required: false },
        levelErrors: { type: Number, required: false },
        totalResponseTime: { type: Number, required: false },
      },
    ],
    mmseScore: { type: Number, required: false },
  },
  { timestamps: true }
);

export const GameSessionModel = mongoose.model<IGameSessionDocument, IGameSessionModel>(
  "GameSession",
  GameSessionSchema
);
