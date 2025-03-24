import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuessWhatInitConfig } from "../game/gameModes/GuessWhat/types";
import { initializeGameState, } from "../utils/guessWhatUtils";
import { Card } from "../game/InterfacesAndClasses/Card";


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
    gameEnded: boolean | null;
}

const initialState: GameState = {
    sessionId: null,
    config: null,
    gameState: null,
    metrics: [],
    isPlaying: false,
    gameEnded: false,
};

const guessWhatGameSlice = createSlice({
    name: "guessWhat",
    initialState,
    reducers: {
        decrementTimer(state) {
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

        revealCards(state) {
            if (state.gameState && state.gameState.timeLeft === 0) {
                state.gameState.isMemorizationPhase = false;
            }
        }, 

        selectCard(state, action: PayloadAction<number>) {
            if (!state.gameState || state.gameState.isMemorizationPhase) return;

            const card = state.gameState.cards.find(card => card.id === action.payload);
            if (!card || card.matched) return;

            state.gameState.attempts++; 

            if (state.gameState.currentImagesToFind.includes(card.image)) {
                card.matched = true;
                state.gameState.currentImagesToFind = state.gameState.currentImagesToFind.filter(
                    image => image !== card.image
                );
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

        endGame(state) {
            state.config = null;
            state.isPlaying = false;
            state.gameEnded = true;
            state.gameState = null;
        },
        forceEndGame(state){
            state.config = null;
            state.isPlaying = false;
            state.gameEnded = null;
            state.gameState = null;
        }
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
    setLevelStartTime
 } = guessWhatGameSlice.actions;

export const guessWhatGameReducer = guessWhatGameSlice.reducer;
