import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuessWhatInitConfig } from "../game/gameModes/GuessWhat/types";
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
        maxAttempts: number;
    } | null;
    isPlaying: boolean;
    isMuted: boolean;
}

const initialState: GameState = {
    sessionId: null,
    config: null,
    gameState: null,
    isPlaying: false,
    isMuted: false,
};

const guessWhatGameSlice = createSlice({
    name: "guessWhat",
    initialState,
    reducers: {
        decrementTimer(state) {
            if (state.gameState && state.gameState.timeLeft > 0) {
                state.gameState.timeLeft -= 1;
            } else if (state.gameState?.timeLeft === 0) {
                state.gameState.isMemorizationPhase = false;  // End memorization phase
            }
        },
        
        startGame(state, action: PayloadAction<{ sessionId: string; config: GuessWhatInitConfig }>) {
            state.sessionId = action.payload.sessionId;
            state.config = action.payload.config;
            state.isPlaying = true;

            // Initialize game state
            state.gameState = initializeGameState(action.payload.config, 1);
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
                state.gameState.currentImagesToFind = state.gameState.currentImagesToFind.filter(image => image !== card.image);
            }
        },
        

        nextLevel(state) {
            if (!state.config || !state.gameState) return;

            if (state.gameState.level >= state.config.maxLevels) {
                guessWhatGameSlice.caseReducers.endGame(state);
                return;
            }

            state.gameState = initializeGameState(state.config, state.gameState.level + 1);
        },

        endGame(state) {
            state.sessionId = null;
            state.config = null;
            state.isPlaying = false;
            state.gameState = null;
        },
    },
});

export const { startGame, revealCards, selectCard, nextLevel, endGame, decrementTimer } = guessWhatGameSlice.actions;
export const guessWhatGameReducer = guessWhatGameSlice.reducer;

// Helper functions
function initializeGameState(config: GuessWhatInitConfig, level: number) {
    const numImages = level + config.basePairs;
    const imagesToMemorize = shuffleArray([...Array(config.imageSet.length).keys()]).slice(0, numImages);
    
    const memorizationTime = Math.max(config.minMemorizationTime, config.defaultMemorizationTime - level * 1000);
    
    return {
        level,
        cards: generateCards(imagesToMemorize, config.imageSet),
        currentImagesToFind: selectImagesToFind(imagesToMemorize, config.imageSet, level <= 3 ? 1 : level <= 6 ? 2 : 3),
        isMemorizationPhase: true,
        memorizationTime,
        timeLeft: Math.floor(memorizationTime / 1000),  // Initialize timeLeft
        attempts: 0,
        maxAttempts: 3,
    };
}


function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

function generateCards(imgIdx: number[], imageSet: string[]): Card[] {
    return shuffleArray(imgIdx.map((index, id) => ({ id, image: imageSet[index], matched: false })));
}

function selectImagesToFind(imagesToMemorize: number[], imageSet: string[], numImagesToFind: number): string[] {
    return shuffleArray(imagesToMemorize.map(index => imageSet[index])).slice(0, numImagesToFind);
}
