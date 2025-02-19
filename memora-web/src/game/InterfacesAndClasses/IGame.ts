export interface IGame {
    start(): void;
    reset(): void;
    getCurrentLevel(): number;
    getCurrentGameState(): any;
    // getCurrentLevelMetrics(): any;
    isSessionEnded(): boolean;
  }
  