import { BaseGameConfig } from "./base";

export interface GuessWhatInitConfig extends BaseGameConfig {
    maxLevels: number,
    defaultMemorizationTime: number;
    memorizationTimeReductionPerLevel: number;
    minMemorizationTime: number;
    basePairs: number;
    levelStartTime: number;
    levelEndTime: number;
    imageSet: [];
}

export interface GuessWhatCurrentState {
    gameState: {
        level: number;
        cards: Card[];
        currentImagesToFind: string[];
        isMemorizationPhase: boolean;
        memorizationTime: number;
        attempts: number;
        maxAttempts: number;
    }
}

export interface Card {
    id: number;
    image: string;
    matched: boolean;
}