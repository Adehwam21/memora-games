import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { startGame } from "../../redux/slices/games-slice/guessWhat";
import MainScreen from "./GuessWhatGame/screens/MainScreen";
import { GuessWhatInitConfig } from "../../types/game/guessWhatTypes";
import { GameCanvas } from "./GameCanvas";

interface GameRunnerProps {
  sessionId: string;
  config: GuessWhatInitConfig;
}

export const GameRunner: React.FC<GameRunnerProps> = ({ sessionId, config }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    switch (config.title) {
      case "guess what":
        dispatch(startGame({sessionId, config}));
        break;

      // ... Add more cases for various games
    }
  }, [config, sessionId, dispatch]);

  return (
    <GameCanvas gameTitle={config.title}>
      {config.title === "guess what" && <MainScreen />}
    </GameCanvas>
  );
};

