import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../redux/slices/auth-slice/authSlice";
import { WeeklyProgress } from "../components/WeeklyProgress";
import { IStats } from "./UserStats";
import { TodaysGoal } from "../components/TodaysGoal";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import { RecentActivity } from "../components/RecentActivity";
import { IGame } from "./Games";
import { calculateAvgMMSEByGameType } from "../../utils/game/dashboardUtils";

export interface IGameSession {
  _id: string;
  userId: string;
  ssid: string;
  metrics?: [];
  sessionDate: string;
  gameTitle: string;
  totalScore: number;
  mmseScore: number;
  updatedAt: Date;
}

interface HomeProps {
  user: User;
  stats: IStats;
  games: IGame[];
}

const Home: React.FC<HomeProps> = ({ user, stats, games }) => {
  const isProfileComplete = user.age && user.educationLevel;

  // Greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const averageMmseByGameType = calculateAvgMMSEByGameType(stats.trendData)

  return (
    <div className="p-5 pt-10 flex flex-col gap-20">
      {/* Profile warning */}
      {!isProfileComplete && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg border border-yellow-300">
          <p className="flex flex-col text-md p-3 font-medium">
            ⚠️ Your profile is incomplete. Please complete your profile to
            improve the accuracy of your MMSE scores.{" "}
            <a
              href="/dashboard/settings"
              className="underline text-yellow-900 hover:text-yellow-700"
            >
              Click here to complete it.
            </a>
          </p>
        </div>
      )}

      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="gap-3">
          <h1 className="text-3xl text-green-800 font-bold">
            {greeting}, {user.username}!
          </h1>
          <p className="text-gray-500 mt-1">
            Ready to give your brain a workout today?
          </p>
        </div>
        <DateTimeDisplay />
      </div>

      {/* Goals + Weekly Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TodaysGoal
          trend = {stats.trendData}
          total={3}
          goalText="Complete 3 sessions to stay on track!"
        />
        <WeeklyProgress trend={stats.trendData}
        />
      </div>

      {/* Recent Activity */}
      <div>
        <RecentActivity recentSessions={stats.recentSessions} games={games}/>
      </div>

      {/* Stats Overview */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-gray-700">Stats Overview</p>
          <Link
            to="/dashboard/stats"
            className="text-sm text-green-600 hover:text-green-800 font-medium"
          >
            Detailed Stats →
          </Link>
        </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            {averageMmseByGameType.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="text-gray-500 text-sm">
                    <th className="text-left py-1">Game Type</th>
                    <th className="text-right py-1">Avg MMSE</th>
                  </tr>
                </thead>
                <tbody>
                  {averageMmseByGameType.map((stat, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="py-2">{stat.gameType}</td>
                      <td className="py-2 text-right font-medium">{stat.avgMMSE}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <p className="text-gray-500">No games played yet.</p>
              )}
          </div>
      </div>
    </div>
  );
};

export default Home;
