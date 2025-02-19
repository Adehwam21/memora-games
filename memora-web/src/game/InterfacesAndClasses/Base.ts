import { IGame } from "./IGame";

export abstract class BaseGame implements IGame {
    protected gameType: string;
    protected currentLevel: number;
    protected maxLevels: number;

    constructor(totalLevels: number = 10, gameName: string) {
        this.gameType = gameName;
        this.maxLevels = totalLevels;
        this.currentLevel = 1;
    }

    abstract start(): void;
    abstract reset(): void;
    abstract nextLevel(): any;
    abstract getCurrentGameState(): any;
    // abstract getCurrentLevelMetrics(): any;

    getCurrentLevel(): number {
        return this.currentLevel;
    }

    isSessionEnded(): boolean {
        return this.currentLevel > this.maxLevels;
    }


}
