import mongoose, { Model, ObjectId, Schema } from "mongoose";

export interface IGame {
  title: string,
  gametype: string,
  developer?: ObjectId,
  coverPhoto: string,
  description: string,
  stars?: number,
}

export interface IGameDocument extends Document, IGame { }
export interface IGameModel extends Model<IGameDocument> { }

const GameSchema = new Schema<IGameDocument>({
  title: { type: String, required: true },
  gametype: { type: String, required: true },
  developer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  coverPhoto: { type: String, required: true },
  description: { type: String, required: true },
  stars: { type: Number },
}, { timestamps: true });

export const GameModel = mongoose.model<IGameDocument, IGameModel>("Game", GameSchema);
