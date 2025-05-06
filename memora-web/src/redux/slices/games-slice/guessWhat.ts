import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuessWhatInitConfig } from "../../../types/game/guessWhatTypes";
import { initializeGameState, } from "../../../utils/game/guessWhatUtils";
import { Card } from "../../../types/game/guessWhatTypes";

interface GameState {
    sessionId: string | null;
    config: GuessWhatInitConfig | null;
    gameState: { 
        level: number; 
        cards: Card[]; 
        currentImagesToFind: string[]; 
        isMemorizationPhase: boolean;
        memorizationTime: number;
        timeLeft: number;
        attempts: number;
        pauseStartTime: number;
        levelStartTime: number;
        levelEndTime: number;
        maxAttempts: number;
    } | null;
    metrics: { 
        level: number; 
        attempt: number, 
        totalResponseTime: number, 
        accuracy: number, 
        levelErrors: number 
    }[];
    isPlaying: boolean;
    isPaused: boolean;
    gameEnded: boolean | null;
}

const initialState: GameState = {
    sessionId: null,
    config: null,
    gameState: null,
    metrics: [],
    isPlaying: false,
    isPaused: false,
    gameEnded: false,
};

const guessWhatGameSlice = createSlice({
    name: "guessWhat",
    initialState,
    reducers: {
        decrementTimer(state) {
            if (state.isPaused || !state.gameState) return;

            if (state.gameState && state.gameState.timeLeft > 0) {
                state.gameState.timeLeft -= 1;
            } else if (state.gameState?.timeLeft === 0) {
                state.gameState.isMemorizationPhase = false;
            }
        },

        setLevelStartTime(state, action: PayloadAction<number>) { 
            state.gameState!.levelStartTime = action.payload;
        },
        
        startGame(state, action: PayloadAction<{ sessionId: string; config: GuessWhatInitConfig }>) {
            state.sessionId = action.payload.sessionId;
            state.config = action.payload.config;
            state.isPlaying = true;
            state.metrics = []
            // state.gameState = initializeGameState(action.payload.config, 1)
            state.gameState = initializeGameState(action.payload.config, 1);
            state.gameEnded = false

        },
        restartGame(state){
            state.gameState = initializeGameState(state.config!, 1)
            state.gameState.memorizationTime = 20000
            state.isPaused = false
            state.isPlaying = true;
            state.metrics = []
            state.gameEnded = false
        },

        revealCards(state) {
            if (state.gameState && state.gameState.timeLeft === 0) {
                state.gameState.isMemorizationPhase = false;
            }
        },

        selectCard(state, action: PayloadAction<number>) {
            if (!state.gameState || state.gameState.isMemorizationPhase || state.isPaused) return;

            const card = state.gameState.cards.find(card => card.id === action.payload);
            if (!card || card.matched) return;

            if (state.gameState.currentImagesToFind.includes(card.image)) {
                card.matched = true;
                state.gameState.currentImagesToFind = state.gameState.currentImagesToFind.filter(
                    image => image !== card.image
                );
            } else {
                state.gameState.attempts++;
            }
        },
        
        nextLevel(state) {
            if (!state.config || !state.gameState) return;

            // Capture end time and calculate total response time
            state.gameState.levelEndTime = Date.now();
            const totalResponseTime = ((state.gameState.levelEndTime - state.gameState.levelStartTime) / 1000) - 0.5;

            // Compute accuracy and errors
            const correctAttempts = state.gameState.cards.filter(card => card.matched).length;
            const totalAttempts = state.gameState.attempts;
            const accuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
            const errors = totalAttempts - correctAttempts;

            // Store level metrics
            state.metrics.push({
                level: state.gameState.level,
                attempt: totalAttempts,
                totalResponseTime,
                accuracy,
                levelErrors: errors,
            });

            if (state.gameState.level >= state.config.maxLevels) {
                guessWhatGameSlice.caseReducers.endGame(state);
                return;
            }

            // Start the next level
            state.gameState = initializeGameState(state.config, state.gameState.level + 1);
        },

        pauseGame(state) {
            if (state.isPaused || !state.gameState) return;
            state.isPaused = true;
            state.gameState.pauseStartTime = Date.now();
        },

        setPaused: (state, action: PayloadAction<boolean>) => {
            state.isPaused = action.payload;
        },

        resumeGame(state) {
            if (!state.isPaused || !state.gameState || !state.gameState.pauseStartTime) return;
        
            const pausedDuration = Date.now() - state.gameState.pauseStartTime;
        
            // Adjust level start time so the response time stays accurate
            state.gameState.levelStartTime += pausedDuration;
        
            // Adjust timeLeft if still in memorization phase
            if (state.gameState.isMemorizationPhase) {
                state.gameState.timeLeft -= Math.floor(pausedDuration / 1000);
                if (state.gameState.timeLeft < 0) state.gameState.timeLeft = 0;
            }
        
            state.isPaused = false;
            state.gameState.pauseStartTime = 0;
        },

        setTimeLeft: (state, action: PayloadAction<number>) => {
            state.gameState!.timeLeft = action.payload;
        },

        forceEndGame(state){
            state.config = null;
            state.isPlaying = false;
            state.gameEnded = null;
            state.gameState = null;
        },
        
        endGame(state) {
            state.config = null;
            state.isPlaying = false;
            state.gameEnded = true;
            state.gameState = null;
        },
        
    },
});


export const { 
    startGame, 
    revealCards, 
    selectCard, 
    nextLevel, 
    endGame, 
    decrementTimer, 
    forceEndGame,
    setLevelStartTime,
    setPaused,
    setTimeLeft,
    pauseGame,
    resumeGame,
    restartGame
} = guessWhatGameSlice.actions;

export const guessWhatGameReducer = guessWhatGameSlice.reducer;
