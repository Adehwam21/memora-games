import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { pauseGame, resumeGame } from "../../../../redux/slices/games-slice/guessWhat";
import { endGame } from "../../../../redux/slices/games-slice/stroop";
import { CountdownTimer } from "./CountdownTimer";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

interface GameHUDProps {
  gameTitle: string;
  totalScore: number;
  // accuracy: number;
  totalPausedDuration: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  gameTitle,
  totalScore,
  // accuracy,
}) => {
  const dispatch = useDispatch();
  const { isPaused } = useSelector((state: RootState) => state.stroop);

  const state = useSelector((state: RootState) => {
    switch (gameTitle) {
      case "stroop":
        return state.stroop;
      default:
        return null;
    }
  });

  const handleGameEnd = () => {
    dispatch(endGame());
  };


  if (!state?.config) return null;

  const togglePause = () => {
    switch (gameTitle) {
      case "stroop":
        dispatch(!isPaused ? resumeGame() : pauseGame());
        break;
    }
  };

  return (
    <div className="w-full px-6 py-3 rounded-t-md bg-black/50 backdrop-blur-sm shadow-md text-[#EADEB8] flex justify-between items-center z-50">
      <div className="flex items-center space-x-6 text-base font-semibold">
        <span>🎯 Score: <span className="font-bold">{totalScore}</span></span>
        {/* <span>🎯 Accuracy: <span className="font-bold">{accuracy}%</span></span> */}
      </div>

      <div className="flex items-center space-x-4">
        <CountdownTimer
          duration={110000}
          onComplete={handleGameEnd}
          isPaused={isPaused}
        />
        <button
          onClick={togglePause}
          className="p-2 rounded-full bg-[#EADEB8]/10 hover:bg-[#EADEB8]/20 transition duration-200 ease-in-out"
        >
          {isPaused ? <FaPlay size={18} /> : <FaPause size={18} />}
        </button>
      </div>
    </div>
  );
};
