import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { pauseGame, resumeGame } from "../../redux/slices/games-slice/guessWhat";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import LevelTimer from "./GuessWhatGame/components/LevelTimer";

interface GameHUDProps {
  gameTitle: string;
  score: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({gameTitle, score}) => {
  const dispatch = useDispatch();
  const { isPaused, gameState } = useSelector((state: RootState) => state.guessWhat); 
  const state = useSelector((state: RootState) => {
    switch (gameTitle) {
      case "guess-what":
        return state.guessWhat;
      default:
        return null;
    }
  });

  if (!state!.config) return null;

  const togglePause = () => {
    switch (gameTitle) {
      case "guess-what":
        dispatch(isPaused ? resumeGame() : pauseGame());
        break;

        // ... Add other game logic
    }
  };

  return (
    <div className="flex justify-between rounded-t-md text-md items-center p-3 bg-black/40  text-[#EADEB8] z-50">
      <div className="flex flex-row space-x-5">
        <p className="font-bold">
          LeveL:{gameState!.level}
        </p>
        <p className="font-bold text-md">
          Attempts: {" "}
          {
            "❤️".repeat(gameState!.maxAttempts! - gameState!.attempts) +
            "🤍".repeat(gameState!.attempts)
          }
        </p>
        <p className="font-bold">
          Score: {score}
        </p>

      </div>
      <div className="flex space-x-3 justify-center items-center">
        <div>
          <LevelTimer
              shouldRun={!isPaused}
              isMemorizationPhase={gameState!.isMemorizationPhase}
              onTick={() =>{}}
              onReset={() => {}}
            />
        </div>
        
        <button
          className="p-2 hover:cursor-pointer hover:bg-black/70"
          onClick={togglePause}
        >
          {isPaused ? <FaPlay size={20}/> : <FaPause size={20}/>}
        </button>
      </div>
      
    </div>
  );
};
