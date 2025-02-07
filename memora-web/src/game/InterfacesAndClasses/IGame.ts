export interface IGame {
    start(): void;
    reset(): void;
    getCurrentLevel(): number;
    getGameState(): any;
    isSessionEnded(): boolean;
  }
  