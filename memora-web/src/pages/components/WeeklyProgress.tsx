import React from "react";
import { IGameSession } from "../Dashboard/UserStats";
import { calculateBestStreak, calculateCurrentStreak, generateCalendarData } from "../../utils/game/dashboardUtils"; // adjust path

interface WeeklyProgressProps {
  trend?: IGameSession[]
}

const dummyCalendarDay = [
  {day: "Mon", completed: false},
  {day: "Tue", completed: false},
  {day: "Wed", completed: false},
  {day: "Thu", completed: false},
  {day: "Fri", completed: false},
  {day: "Sat", completed: false},
  {day: "Sun", completed: false},
]

export const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ trend }) => {
    const safeTrend = trend && trend.length ? trend : [];
  // Ensure trend sessions are sorted oldest to newest before passing
  const sortedTrend = [...safeTrend].sort(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  );

  const today = new Date();
  const calendarData = generateCalendarData(safeTrend, 7, today) || dummyCalendarDay; 
  const bestStreak = calculateBestStreak(sortedTrend) || 0;
  const currentStreak = calculateCurrentStreak(sortedTrend) || 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
      {/* Streak Info */}
      <div className="flex justify-center items-center space-x-10">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            Current Streak
          </span>
          <span className="text-5xl font-extrabold text-gray-500 drop-shadow-sm">
            {currentStreak}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            Best Streak
          </span>
          <span className="text-5xl font-extrabold text-green-700 drop-shadow-sm">
            {bestStreak}
          </span>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="flex justify-between gap-5 max-w-md">
        {calendarData.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <span
              className={`text-sm font-medium duration-200 ${
                day.completed
                  ? "text-green-600"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            >
              {day.day}
            </span>
            <div
              className={`w-2 h-2 mt-2 rounded-full border-2 ${
                day.completed
                  ? "bg-green-500 border-green-500 scale-110"
                  : "bg-gray-200 border-gray-300"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
