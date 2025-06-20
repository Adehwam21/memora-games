import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStroopGameConfig, IStroopQuestion } from "../../../types/game/stroopTypes";
import { initializeGameState } from "../../../utils/game/stroopUtils";

export interface GameState {
  sessionId: string | null;
  config: IStroopGameConfig | null;
  gameState: {
    level: number;
    duration: number;
    questions: IStroopQuestion[];
    currentIndex: number;
  } | null;
  metrics: {
    questions: number;
    attempts: number;
    errors: number;
    accuracy: number;
  } | null;
  pauseStartTime?: number | null,
  totalPausedDuration?: number,
  totalScore: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameEnded: boolean;
}

const initialState: GameState = {
  sessionId: null,
  config: null,
  gameState: null,
  metrics: null,
  totalScore: 0,
  isPlaying: false,
  isPaused: false,
  gameEnded: false,
  pauseStartTime: null,
  totalPausedDuration: 0,
};

const stroopGameSlice = createSlice({
  name: "stroop",
  initialState,
  reducers: {
    startStroopGame(state, action: PayloadAction<{ sessionId: string; stroopGameConfig: IStroopGameConfig }>) {
      state.sessionId = action.payload.sessionId;
      state.config = action.payload.stroopGameConfig;
      state.isPlaying = true;
      state.metrics = {
        questions: 0,
        attempts: 0,
        errors: 0,
        accuracy: 0,
      };
      state.totalScore = 0;
      state.gameState = {
        ...initializeGameState(action.payload.stroopGameConfig, 1),
        currentIndex: 0,
      };
      state.gameEnded = false;
    },

    recordAnswer(state, action: PayloadAction<{ correct: boolean; bonus: number }>) {
      const { correct, bonus } = action.payload;
      if (state.metrics && state.gameState) {
        state.metrics.attempts += 1;
        if (!correct) {
          state.metrics.errors += 1;
        }
        state.metrics.questions += 1;
        state.metrics.accuracy = Math.round(
          ((state.metrics.attempts - state.metrics.errors) / state.metrics.attempts) * 100
        );
        if (correct) {
          state.totalScore += 10 + bonus;
        }
      }
      console.log("answer: ", correct, "score: ", state.totalScore)
    },
    advanceLevel(state) {
      if (state.gameState) {
        state.gameState.level += 1;
        state.gameState.currentIndex += 1;
      }
    },
    pauseGame(state) {
      if (state.isPaused || !state.gameState) return; // <-- Corrected condition
      state.isPaused = true;
      state.pauseStartTime = Date.now();
    },
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },

    resumeGame(state) {
      if (state.isPaused && !state.gameEnded && state.isPlaying && state.gameState) {
        const pausedTime = Date.now() - (state.pauseStartTime || Date.now());
        state.totalPausedDuration = (state.totalPausedDuration || 0) + pausedTime;
        state.isPaused = false;
        state.pauseStartTime = null;
      }
    },


    restartGame(state){
      state.gameState = initializeGameState(state.config!, 1);
      state.isPaused = false;
      state.isPlaying = true;
      state.gameEnded = false;
      state.totalScore = 0;
    },

    forceEndGame(state){
      state.config = null;
      state.isPaused = false;
      state.sessionId = null;
      state.isPlaying = false;
      state.gameEnded = true;
      state.gameState = null;
    },

    endGame(state) {
      state.config = null;
      state.isPaused = false;
      state.sessionId = null;
      state.isPlaying = false;
      state.gameEnded = true;
      state.gameState = null;
    },
  },
});

export const { 
  startStroopGame,
  restartGame,
  pauseGame,
  forceEndGame,
  resumeGame,
  recordAnswer, 
  advanceLevel, 
  endGame 
} = stroopGameSlice.actions;
export const stroopGameReducer = stroopGameSlice.reducer;
