import { IStroopGameConfig } from "../../types/game/stroopTypes";

export function initializeGameState(config: IStroopGameConfig, level: number) {
    return {
        level,
        duration: config.duration,
        questions: config.questions,
        currentIndex: 0,
    };
}