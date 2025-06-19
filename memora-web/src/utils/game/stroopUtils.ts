import { IStroopGameConfig } from "../../types/game/stroopTypes";

export function initializeGameState(config: IStroopGameConfig) {
    return {
        duration: config.duration,
        questions: config.questions,
    };
}