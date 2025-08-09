import React from "react";
import { Link } from "react-router-dom";
import { capitalizeWords, formatSmartDate } from "../../utils/helpers";
import { IGame } from "../Dashboard/Games";
import { IGameSession } from "../Dashboard/UserStats";
import { RecentGameCard } from "../../compnents/RecentGameCard";

interface RecentActivityProps {
  recentSessions: IGameSession[];
  games: IGame[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  recentSessions,
  games,
}) => {
  // Group sessions by game title so we don't repeat the same game
  const uniqueGameTitles = Array.from(
    new Set(recentSessions.map((s) => s.gameTitle.toLowerCase()))
  );

  const recentlyPlayedGames = uniqueGameTitles
    .map((title) => games.find((g) => g.title.toLowerCase() === title))
    .filter((g): g is IGame => Boolean(g))
    .slice(0, 5); // limit to 5 games

  return (
    <div className="space-y-8">
      {/* Recently Played Games */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-gray-700">Recent Activity</p>
          <Link
            to="/dashboard/games"
            className="text-sm text-green-600 hover:text-green-800 font-medium"
          >
            More Games →
          </Link>
        </div>

        {recentlyPlayedGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {recentlyPlayedGames.map((game) => (
              <RecentGameCard key={game.title} game={game} text="Play again" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No games played yet.</p>
        )}
      </div>

      {/* Recent Sessions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          {/* <p className="font-semibold text-gray-700">Recent Sessions</p>
          <Link
            to="/dashboard/history"
            className="text-sm text-green-600 hover:text-green-800 font-medium"
          >
            View All →
          </Link> */}
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          {recentSessions && recentSessions.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Game</th>
                  <th className="pb-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session) => (
                  <tr key={session._id} className="border-t">
                    <td className="py-2">
                      {formatSmartDate(new Date(session.updatedAt))}
                    </td>
                    <td className="py-2">
                      {capitalizeWords(session.gameTitle)}
                    </td>
                    <td className="py-2">{session.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No sessions recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
