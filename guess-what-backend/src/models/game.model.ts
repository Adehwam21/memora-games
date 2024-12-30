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
    userId: { type: String, required: true },
    sessionDate: { type: Date, default: Date.now },
    sessionNumber: { type: Number, required: true },
    levelScores: [
      {
        level: { type: Number, required: true },
        accuracy: { type: Number, required: true },
        errors: { type: Number, required: true },
        responseTime: { type: Number, required: true },
      },
    ],
    totalScore: {
      avgAccuracy: { type: Number, required: true },
      totalErrors: { type: Number, required: true },
      totalResponseTime: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

// Pre-save middleware to calculate totalScore dynamically
GameSessionSchema.pre<IGameSessionDocument>("save", function (next) {
  const levelScores = this.levelScores;

  // Calculate the aggregate scores
  const totalAccuracy = levelScores.reduce((sum, level) => sum + level.accuracy, 0);
  const totalErrors = levelScores.reduce((sum, level) => sum + level.errors, 0);
  const totalResponseTime = levelScores.reduce((sum, level) => sum + level.responseTime, 0);

  // Update totalScore with computed values
  this.totalScore = {
    avgAccuracy: totalAccuracy / levelScores.length,
    totalErrors,
    totalResponseTime,
  };

  next();
});

// Model creation
export const GameSessionModel = mongoose.model<IGameSessionDocument, IGameSessionModel>(
  "GameSession",
  GameSessionSchema
);
