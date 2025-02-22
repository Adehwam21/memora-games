import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GuessWhatGameConfig {
    name: string;
    gameType: string;
    maxLevel: number;
    difficulty: string;
    defaultMemorizationTime: number;
    memorizationTimeReductionPerLevel: number;
    minMemorizationTime: number;
    maxAttempts: number;
    basePairs: number;
    imageSet: string[];
}

interface GameState {
    sessionId: string | null;
    config: GuessWhatGameConfig | null;
    isPlaying: boolean;
    isMemorizationTime: boolean;
    memorizationTime?: number;
    maxAttempts?: number;
    basePairs?: number;
    level?: number;
    imageSet?: string[];
}

const initialState: GameState = {
    sessionId: null,
    config: null,
    isPlaying: false,
    isMemorizationTime: true,
    memorizationTime: 0,
    maxAttempts: 0,
};

const guessWhatGameSlice = createSlice({
    name: "guessWhat",
    initialState,
    reducers: {
        startGame(state, action: PayloadAction<{ sessionId: string; config: GuessWhatGameConfig }>) {
            state.sessionId = action.payload.sessionId;
            state.config = action.payload.config;
            state.isPlaying = true;
            state.memorizationTime = action.payload.config.defaultMemorizationTime;
            state.isMemorizationTime = true;
        },
        startLevel(state, action: PayloadAction<{ sessionId: string; config: GuessWhatGameConfig }>) {
            state.sessionId = action.payload.sessionId;
            state.config = action.payload.config;
            state.isPlaying = true;
        },
        endGame(state) {
            state.sessionId = null;
            state.config = null;
            state.isPlaying = false;
        },
    },
});

export const { startGame, endGame } = guessWhatGameSlice.actions;
export const guessWhatGameReducer = guessWhatGameSlice.reducer;
