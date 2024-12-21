import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser {
  username: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  smokingStatus: boolean;
  drinkingStatus: boolean;
  medicalCondition: string;
  email: string;
  password: string;
}

export interface IUserDocument extends Document, IUser { }
export interface IUserModel extends Model<IUserDocument> { }

const UserSchema = new Schema<IUserDocument>({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  smokingStatus: { type: Boolean, default: false },
  drinkingStatus: { type: Boolean, default: false },
  medicalCondition: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  password: { type: String, required: true },
}, { timestamps: true });

export const UserModel = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
