import { Card } from "../../InterfacesAndClasses/Card";

export interface GuessWhatInitConfig {
    name: string;
    maxLevels: number;
    defaultMemorizationTime: number;
    memorizationTimeReductionPerLevel: number;
    minMemorizationTime: number;
    basePairs: number;
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