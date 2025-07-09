import { ObjectId } from "mongoose";

export interface IRegisterUserInput {
  username: string;
  age?: number;
  gender?: "Male" | "Female" | "Other";
  smokingStatus?: boolean;
  drinkingStatus?: boolean;
  educationLevel?: string;
  email: string;
  password: string;
}

export interface _User {
  _id: ObjectId
  userId: string;
  email: string;
  username: string;
  gender: string;
  educationLevel: string;
  age: number;
  role: string;
}
