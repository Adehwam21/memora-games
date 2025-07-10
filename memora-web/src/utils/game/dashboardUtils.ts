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

// Get total number of sessions
export const getTotalSessions = (sessions: IGameSession[]): number => {
  return Array.isArray(sessions) ? sessions.length : 0;
};

// Get average total score
export const getAverageScore = (sessions: IGameSession[]): number => {
  if (!Array.isArray(sessions) || sessions.length === 0) return 0;
  const total = sessions.reduce((sum, session) => sum + (session.totalScore || 0), 0);
  return Math.round(total / sessions.length) || 0;
};

// Get best total score
export const getBestScore = (sessions: IGameSession[]): number => {
  if (!Array.isArray(sessions) || sessions.length === 0) return 0;
  return Math.max(...sessions.map(session => session.totalScore || 0));
};

export const getBestMMSEScore = (sessions: IGameSession[]): number => {
  if (!Array.isArray(sessions) || sessions.length === 0) return 0;
  return Math.max(...sessions.map(session => session.mmseScore || 0));
};

// Get average MMSE score
export const getAverageMMSE = (sessions: IGameSession[]): number => {
  if (!Array.isArray(sessions) || sessions.length === 0) return 0;
  const total = sessions.reduce((sum, session) => sum + (session.mmseScore || 0), 0);
  return Math.round(total / sessions.length) || 0;
};

// Group sessions by game title
export const groupSessionsByGame = (
  sessions: IGameSession[]
): Record<string, IGameSession[]> => {
  if (!Array.isArray(sessions)) return {};
  return sessions.reduce((acc, session) => {
    const title = session.gameTitle || 'Unknown';
    if (!acc[title]) acc[title] = [];
    acc[title].push(session);
    return acc;
  }, {} as Record<string, IGameSession[]>);
};

// Get the most recent 3 sessions (assumes already sorted)
export const getLatestSessions = (sessions: IGameSession[]): IGameSession[] => {
  if (!Array.isArray(sessions) || sessions.length === 0) return [];
  return sessions.slice(-3).reverse();
};

// Get MMSE trend (sorted by session date)
export const getMMSETrend = (
  sessions: IGameSession[]
): { date: string; mmseScore: number }[] => {
  if (!Array.isArray(sessions) || sessions.length === 0) return [];
  return sessions
    .filter(s => s.sessionDate && typeof s.mmseScore === 'number')
    .sort(
      (a, b) => new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime()
    )
    .map((s) => ({
      date: new Date(s.sessionDate).toLocaleDateString(),
      mmseScore: s.mmseScore,
    }));
};

export const computeStats = (gameSessions: IGameSession[]) => {
  return {
    totalSessions: getTotalSessions(gameSessions) || 0,
    avgMMSEScore : getAverageMMSE(gameSessions) || 0,
    bestMMSEScore: getBestMMSEScore(gameSessions) || 0,
    recentSessions : getLatestSessions(gameSessions)
  }
}
