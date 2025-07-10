import React from 'react';
import { User } from '../../redux/slices/auth-slice/authSlice';
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

export interface IStats {
  totalSessions: number,
  avgMMSEScore: number,
  bestMMSEScore: number,
  recentSessions: IGameSession[]
}

interface HomeProps {
  user: User;
  stats: IStats;
}

const UserStats: React.FC<HomeProps> = ({ user, stats }) => {
  const isProfileComplete = user.age && user.educationLevel

  return (
    <div className="p-5 pt-10 flex flex-col">
      {!isProfileComplete && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-10 border border-yellow-300 ">
          <p className="flex flex-col text-md p-3 font-medium">
            ⚠️ Your profile is incomplete. Please complete your profile to improve the accuracy of your MMSE scores.
            <a href="/dashboard/settings" className="underline text-yellow-900 hover:text-yellow-700">
              Click here to complete it.
            </a>
          </p>
        </div>
      )}

      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-3xl text-green-800 font-bold">Your Stats</h1>
        <p className="text-gray-500 mt-2">Here's a quick overview of your progress.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-base-100 p-10 rounded-sm shadow-md">
          <h2 className="text-sm text-gray-500 font-semibold mb-2">Total Sessions</h2>
          <p className="text-3xl text-green-800 font-bold">{stats.totalSessions || 0}</p>
        </div>
        <div className="bg-base-100 p-10 rounded-sm shadow-md">
          <h2 className="text-sm text-gray-500 font-semibold mb-2">Average MMSE Score</h2>
          <p className="text-3xl text-green-800 font-bold">{stats.avgMMSEScore || 0}</p>
        </div>
        <div className="bg-base-100 p-10 rounded-sm shadow-md">
          <h2 className="text-sm text-gray-500 font-semibold mb-2">Best MMSE Score</h2>
          <p className="text-3xl text-green-800 font-bold">{stats.bestMMSEScore || 0}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-base-100 p-10 rounded-sm shadow-md mb-6 overflow-x-auto">
        <h2 className="text-2xl text-green-800  font-bold mb-4">Recent Games</h2>
        {stats.recentSessions ? (
          <table className="table w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Date</th>
                <th className="pb-2">Game</th>
                <th className="pb-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentSessions.map((session) => (
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

export default UserStats;
