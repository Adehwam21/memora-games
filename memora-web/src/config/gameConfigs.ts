import { RootState } from "../redux/store";
import { startGuessWhatGame } from "../redux/slices/games-slice/guessWhat";
import { startStroopGame } from "../redux/slices/games-slice/stroop";
import { getGuessWhatMMSEScore } from "../utils/game/guessWhatUtils";
// import { getStroopMMSEScore } from "../utils/game/stroopUtils";

import { GuessWhatInitConfig } from "../types/game/guessWhatTypes";
import { IStroopGameConfig } from "../types/game/stroopTypes";

export const gameConfigs = {
  "guess-what": {
    gameTitle: "guess what",
    description: "A memory recognition game to evaluate visual attention and recall.",
    startGameAction: (payload: { sessionId: string; guessWhatConfig: GuessWhatInitConfig }) =>
      startGuessWhatGame(payload),
    getSlice: (state: RootState) => state.guessWhat,
    computeScore: getGuessWhatMMSEScore,
  },
  "stroop": {
    gameTitle: "stroop",
    description: "A test of cognitive control using color-word interference.",
    startGameAction: (payload: { sessionId: string; stroopGameConfig: IStroopGameConfig }) =>
      startStroopGame(payload),
    getSlice: (state: RootState) => state.stroop,
    computeScore: getGuessWhatMMSEScore, // TODO: Change this function to getStroopMMSEScore after implemented.
  },
};

export type GameKey = keyof typeof gameConfigs;
