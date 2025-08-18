import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ProgressBar } from "./Progress";
import { countSessionsToday } from "../../utils/game/dashboardUtils";
import { IGameSession } from "../Dashboard/UserStats";
import { useNavigate } from "react-router-dom";

interface TodaysGoalProps {
  trend: IGameSession[];
  total: number;
  goalText: string;
}

export const TodaysGoal: React.FC<TodaysGoalProps> = ({
  trend,
  total,
  goalText = "Complete your daily training goal to keep your streak alive!",
}) => {
  const navigate = useNavigate();
  const today = new Date();
  const completed = countSessionsToday(trend, today);
  const progress = (completed / total) * 100;
  const isComplete = completed >= total;

  const handlePlay = () => {
    navigate('/dashboard/games')
  }

  return (
    <div
      className="bg-white h-64 hover:cursor-pointer transition-colors rounded-lg shadow-md p-5 
      border border-gray-200 flex flex-col justify-center items-center gap-4 w-full"
    >
      {isComplete ? (
        <div className="flex flex-col text-center justify-center items-center gap-3">
          {/* Success State */}
          <FaCheckCircle className="text-green-500 text-6xl" />
          <p className="font-semibold text-gray-700 text-xl">
            You're caught up for today!
          </p>
          <p className="text-lg text-gray-500">
            Come back tomorrow for more or try out more games.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center gap-3 w-full">
          {/* Ongoing State */}
          <p className="font-semibold text-gray-700 text-2xl">Today's Task</p>
          <p className="text-base text-gray-500 leading-snug">{goalText}</p>

          <ProgressBar value={progress} />

          <p className="text-lg text-gray-500">
            {completed} / {total} sessions completed
          </p>

          {/* Green Games Button */}
          <button 
            onClick={handlePlay}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md"
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
};
