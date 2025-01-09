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
  sessionNumber: number; // Sequential session number
  levelScores: ILevelScore[]; // Scores for individual levels
  totalScore: ITotalScore; // Aggregated score for the session
}

// Extend Document for Mongoose compatibility
export interface IGameSessionDocument extends Document, IGameSession { }

// Extend Model for Mongoose compatibility
export interface IGameSessionModel extends Model<IGameSessionDocument> { }

// Schema definition
const GameSessionSchema = new Schema<IGameSessionDocument>(
  {
    userId: { type: String, required: true, index: true },
    sessionDate: { type: Date, default: Date.now, index: true },
    sessionNumber: { type: Number, required: true },
    levelScores: [
      {
        level: { type: Number, required: false },
        accuracy: { type: Number, required: false },
        errors: { type: Number, required: false },
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

GameSessionSchema.index({ userId: 1, sessionNumber: 1 }, { unique: true });

GameSessionSchema.pre<IGameSessionDocument>("save", function (next) {
  const levelScores = this.levelScores;

  if (levelScores.length === 0) { // Tp ensure no division by zero
    this.totalScore = {
      avgAccuracy: 0,
      totalErrors: 0,
      totalResponseTime: 0,
    };
  } else {
    const totalAccuracy = levelScores.reduce((sum, level) => sum + level.accuracy, 0);
    const totalErrors = levelScores.reduce((sum, level) => sum + level.errors, 0);
    const totalResponseTime = levelScores.reduce((sum, level) => sum + level.responseTime, 0);

    this.totalScore = {
      avgAccuracy: totalAccuracy / levelScores.length,
      totalErrors,
      totalResponseTime,
    };
  }

  next();
});

export const GameSessionModel = mongoose.model<IGameSessionDocument, IGameSessionModel>(
  "GameSession",
  GameSessionSchema
);
