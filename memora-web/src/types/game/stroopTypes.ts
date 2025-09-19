import { BaseGameConfig } from "./base";

export interface IStroopQuestion {
  text: string; // The color word
  fontColor: string; // The color used to render it
  isCorrect: boolean; // Whether word matches color
}

export interface IStroopGameConfig extends BaseGameConfig {
  duration: 20000, // Revert to 90000 after fyp demo
  questions: IStroopQuestion[]
}