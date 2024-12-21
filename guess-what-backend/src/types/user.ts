export interface IRegisterUserInput {
  username: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  smokingStatus: boolean;
  drinkingStatus: boolean;
  medicalCondition: string;
  email: string;
  password: string;
}