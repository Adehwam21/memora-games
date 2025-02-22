export interface IRegisterUserInput {
  username: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  smokingStatus: boolean;
  drinkingStatus: boolean;
  medicalCondition: string;
  educationLevel: string;
  email: string;
  password: string;
}

export interface _User {
  userId: string;
  email: string;
  username: string;
  role: string;
}
