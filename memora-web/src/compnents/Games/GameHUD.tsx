import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { pauseGame, resumeGame } from "../../redux/slices/games-slice/guessWhat";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

interface GameHUDProps {
  gameTitle: string;
}

export const GameHUD: React.FC<GameHUDProps> = ({gameTitle}) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => {
    switch (gameTitle) {
      case "guess what":
        return state.guessWhat;
      default:
        return null;
    }
  });

  if (!state!.config) return null;

  const { isPaused, gameState  } = state!;

  const togglePause = () => {
    switch (gameTitle) {
      case "guess what":
        dispatch(isPaused ? resumeGame() : pauseGame());
        break;

        // ... Add other game logic
    }
  };

  return (
    <div className="flex justify-between rounded-t-md items-center p-3 bg-black/40  text-[#EADEB8] z-50">
      <div className="flex flex-row text-xl space-x-5">
        <p className="font-semibold">
          {gameState!.level <= 3 ? "Easy" : gameState!.level <= 6 ? "Medium" : "Hard"} ({gameState!.level})
        </p>
        <p className="font-semibold text-xl">
          Lives:{" "}
          {
            "❤️".repeat(gameState!.maxAttempts! - gameState!.attempts) +
            "🤍".repeat(gameState!.attempts)
          }
        </p>

      </div>
      <button
        className="p-2 hover:cursor-pointer hover:bg-black/70"
        onClick={togglePause}
      >
        {isPaused ? <FaPlay size={20}/> : <FaPause size={20}/>}
      </button>
    </div>
  );
};
