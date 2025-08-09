import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ProgressBar } from "./Progress";
import { countSessionsToday } from "../../utils/game/dashboardUtils";
import { IGameSession } from "../Dashboard/UserStats";

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

  const today = new Date();
  const completed = countSessionsToday(trend, today)
  const progress = (completed / total) * 100;
  const isComplete = completed >= total;

  return (
    <div className="bg-white h-64 hover:cursor-pointer transition-colors rounded-lg shadow-md p-5 border
    border-gray-200 flex flex-col items-center gap-3 w-full text-center justify-center">
      {isComplete ? (
        <>
          {/* Success State */}
          <FaCheckCircle className="text-green-500 text-6xl" />
          <p className="font-semibold text-gray-700 text-xl">
            You're caught up for today!
          </p>
          <p className="text-lg text-gray-500">
            Come back tomorrow for more or try out more games.
          </p>
        </>
      ) : (
        <>
          {/* Ongoing State */}
          <p className="font-semibold text-gray-700 text-3xl">Today's task</p>
          <p className="text-xl text-gray-500 leading-snug">{goalText}</p>
          <ProgressBar value={progress}/>
          <p className="text-lg text-gray-500">
            {completed} / {total} sessions completed
          </p>
        </>
      )}
    </div>
  );
};
