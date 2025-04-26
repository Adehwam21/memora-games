import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { startGame } from "../../redux/slices/games-slice/guessWhat";
import GuessWhat from "./GuessWhatGame/GuessWhatScreen";
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
      case "guessWhat":
        dispatch(startGame({sessionId, config}));
        break;

      // ... Add more cases for various games
    }
  }, [config, sessionId, dispatch]);

  return (
    <GameCanvas>
      {config.title === "guessWhat" && <GuessWhat />}
    </GameCanvas>
  );
};

