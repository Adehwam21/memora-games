import React, { useEffect, useState } from 'react';
import API from '../../config/axiosConfig';
import { User } from '../../redux/slices/auth-slice/authSlice';
import { getAverageMMSE, getBestMMSEScore, getLatestSessions, getTotalSessions } from '../../utils/game/dashboardUtils';
import { capitalizeWords, formatSmartDate } from '../../utils/helpers';

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
}

const Profile: React.FC<HomeProps> = ({ user }) => {
  const [gameSessions, setGameSessions] = useState<IGameSession[]>([]);

  useEffect(() => {
    const fetchGameSessions = async () => {
      try {
        const response = await API.get(`/game-session/user/complete/${user.userId}`);
        if (response.data?.gameSessions) {
          setGameSessions(response.data.gameSessions);
        } else {
          console.log("Couldn't fetch game sessions");
        }
      } catch (error) {
        console.error("Error fetching game sessions:", error);
      }
    };

    fetchGameSessions();
  }, [user]);

  // Utility Computations
  const totalSessions = getTotalSessions(gameSessions);
  const avgMMSEScore = getAverageMMSE(gameSessions);
  const bestMMSEScore = getBestMMSEScore(gameSessions);
  const recentSessions = getLatestSessions(gameSessions);

  return (
    <div className="p-5 pt-10 flex flex-col">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Your Stats</h1>
        <p className="text-gray-500 mt-2">Here's a quick overview of your progress.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-base-100 p-10 rounded-sm shadow-md">
          <h2 className="text-sm font-semibold mb-2">Games Played</h2>
          <p className="text-3xl font-bold">{totalSessions}</p>
        </div>
        <div className="bg-base-100 p-10 rounded-sm shadow-md">
          <h2 className="text-sm font-semibold mb-2">Avg. MMSE Score</h2>
          <p className="text-3xl font-bold">{avgMMSEScore}</p>
        </div>
        <div className="bg-base-100 p-10 rounded-sm shadow-md">
          <h2 className="text-sm font-semibold mb-2">Best MMSE Score</h2>
          <p className="text-3xl font-bold">{bestMMSEScore}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-base-100 p-10 rounded-sm shadow-md mb-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
        {recentSessions ? (
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
                  <td className="py-2">{capitalizeWords(session.gameTitle)}</td>
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
  );
};

export default Profile;
