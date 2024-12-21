import mongoose, { Document, Model, Schema } from "mongoose";

export interface IGameSession {
  userId: string;
  sessionDate: Date;
  sessionNumber: Number;
  levelScores: {
    level: number;
    accuracy: number;
    errors: number;
    responseTime: number;
  }[];
  totalScore: {
    avgAccuracy: number;
    totalResponseTime: number;
    totalErrors: number;
  };
}

// export interface IGameConfiguration extends Document {
//   level: number;
//   timeLimit: number;
//   numCards: number;
//   difficulty: "Easy" | "Medium" | "Hard";
// }

export interface IGameSessionDocument extends Document, IGameSession { }
export interface IGameModel extends Model<IGameSessionDocument> { }

const GameSessionSchema = new Schema<IGameSession>({
  sessionDate: { type: Date, default: Date.now },
  sessionNumber: { type: Number, default: 1 },
  levelScores: [
    {
      level: { type: Number, required: true },
      accuracy: { type: Number, required: true },
      errors: { type: Number, required: true },
      responseTime: { type: Number, required: true },
    }
  ],
  totalScore: {
    avgAccuracy: { type: Number, required: true },
    totalErrors: { type: Number, required: true },
    totalResponseTime: { type: Number, required: true }
  },
}, { timestamps: true });

export const GameSessionModel = mongoose.model<IGameSessionDocument, IGameModel>("GameSession", GameSessionSchema);
