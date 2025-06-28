import mongoose, { Document, Model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface ITotalScore {
  avgAccuracy: number; // average accuracy across levels
  totalErrors: number; // sum of all errors across levels
  totalResponseTime: number; // sum of response times across levels
}
export interface IGuessWhatMetric {
  level: number;
  attempt: number;
  accuracy: number;
  levelErrors: number;
  totalResponseTime: number;
  levelScore: number;
}

export interface IStroopMetric {
  questions: number;
  attempts: number;
  averageResponseTime: number;
  errors: number;
  accuracy: number;
}

// Union type for metrics
type GameMetric = IGuessWhatMetric[] | IStroopMetric;

// Base interface
export interface IGameSession {
  userId: string; // Reference to the user
  sessionDate: String; // Date of the session
  ssid: string; // Session ID
  gameTitle: string // The title of game user took a session on
  gameType?: string // The category the chosen game falls under
  initConfig: {}, // The initial configurations of the game type
  metrics?: GameMetric[]
  totalScore: number;
  participantName?: string;
  mmseScore?: ITotalScore | number; // Aggregated score for the session
  age?: number;
  consent?: boolean;
  educationLevel?: string;
  complete?: boolean;
}

export interface IGameSessionDocument extends Document, IGameSession { }
export interface IGameSessionModel extends Model<IGameSessionDocument> { }

// Schema definition
const GameSessionSchema = new Schema<IGameSessionDocument>(
  {
    userId: { type: String, required: true, index: true },
    ssid: { type: String, required: true, index: true, default: uuidv4 },
    sessionDate: { type: String, default: Date.now, index: true },
    gameTitle: { type: String, required: true },
    gameType: {type: String, required: false},
    initConfig: {},
    metrics: { type: Schema.Types.Mixed, required: false },
    totalScore: {type: Number, required: false},
    mmseScore: { type: Number, required: false },
    age: { type: String, required: false },
    participantName: { type: String, required: false },
    consent: { type: Boolean, required: false },
    educationLevel: {type: String, required: false},
    complete: {type: Boolean, required: false, default: false}

  },
  { timestamps: true }
);

export const GameSessionModel = mongoose.model<IGameSessionDocument, IGameSessionModel>(
  "GameSession",
  GameSessionSchema
);
