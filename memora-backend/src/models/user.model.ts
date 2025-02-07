import mongoose, { Document, Schema, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  userId: string
  username: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  smokingStatus: boolean;
  drinkingStatus: boolean;
  medicalCondition: string;
  educationLevel: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserDocument extends Document, IUser { }
export interface IUserModel extends Model<IUserDocument> { }

const UserSchema = new Schema<IUserDocument>({
  userId: { type: String, required: true, default: uuidv4 },
  username: { type: String, required: true, },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  smokingStatus: { type: Boolean, default: false },
  drinkingStatus: { type: Boolean, default: false },
  medicalCondition: { type: String, required: false },
  educationLevel: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  role: { type: String, required: true, default: "user" },
  password: { type: String, required: true },
}, { timestamps: true });

export const UserModel = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
