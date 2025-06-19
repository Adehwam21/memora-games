/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStroopGameConfig, IStroopQuestion } from "../../../types/game/stroopTypes";
import { initializeGameState } from "../../../utils/game/stroopUtils";

export interface GameState {
  sessionId: string | null;
  config: IStroopGameConfig | null;
  gameState: {
    duration: number
    questions: IStroopQuestion[];
  } | null;
  metrics: {
    questions: number;
    attempts: number;
    errors: number;
    accuracy: number
  } | null;
  totalScore: 0 | number;
  isPlaying: boolean;
  isPaused: boolean;
  gameEnded: boolean | null;
}

const initialState: GameState = {
  sessionId: null,
  config: null,
  gameState: null,
  metrics: null,
  totalScore: 0,
  isPlaying: false,
  isPaused: false,
  gameEnded: false
}

const stroopGameSlice = createSlice({
  name: "stroop",
  initialState,
  reducers: {
    startStroopGame(state, action: PayloadAction<{ sessionId: string; stroopGameConfig: IStroopGameConfig | any }>) {
      state.sessionId = action.payload.sessionId;
      state.config = action.payload.stroopGameConfig;
      state.isPlaying = true;
      state.metrics = { 
        questions: 0,
        attempts: 0,
        errors: 0,
        accuracy: 0
      }
      state.totalScore = 0;
      state.gameState = initializeGameState(action.payload.stroopGameConfig);
      state.gameEnded = false;
    },
  }
})

export const {
  startStroopGame,
} = stroopGameSlice.actions;

export const stroopGameReducer = stroopGameSlice.reducer;
