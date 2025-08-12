/* eslint-disable @typescript-eslint/no-explicit-any */
import { differenceInCalendarDays, format, isSameDay, startOfWeek, addDays,} from "date-fns";


export interface IGameSession {
  _id: string;
  userId: string;
  ssid: string;
  metrics?: [];
  sessionDate: string;
  gameTitle: string;
  initConfig: any;
  totalScore: number;
  mmseScore: number;
  updatedAt: Date;
}

export interface AvgMMSEByGameType {
  gameType: string;
  avgMMSE: string;
}

export interface CalendarDay {
  id: number;
  day: string;
  completed: boolean;
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
    recentSessions : getLatestSessions(gameSessions),
    trendData: gameSessions,
  }
}

export function countSessionsToday(sessions: IGameSession[], referenceDate = new Date()): number {
  return sessions?.filter(session => isSameDay(new Date(session.updatedAt), referenceDate))?.length || 0;
}

export function calculateBestStreak(sessions: IGameSession[]): number {
  if (!sessions || !sessions.length) return 0;

  let bestStreak = 0;
  let tempStreak = 1;

  for (let i = 1; i < sessions.length; i++) {
    const prevDate = new Date(sessions[i - 1].updatedAt);
    const currDate = new Date(sessions[i].updatedAt);

    const diff = differenceInCalendarDays(currDate, prevDate);

    if (diff === 1) {
      tempStreak++;
    } else if (diff > 1) {
      bestStreak = Math.max(bestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  return Math.max(bestStreak, tempStreak);
}

export function calculateCurrentStreak(sessions: IGameSession[]): number {
  if (!sessions || !sessions.length) return 0;

  let currentStreak = 1;

  // Start from the newest (last in array) and go backwards
  for (let i = sessions.length - 1; i > 0; i--) {
    const currentDate = new Date(sessions[i].updatedAt);
    const prevDate = new Date(sessions[i - 1].updatedAt);

    const diff = differenceInCalendarDays(currentDate, prevDate);

    if (diff === 1) {
      currentStreak++;
    } else if (diff > 1) {
      break; // streak broken
    }
  }

  return currentStreak;
}


export function generateCalendarData(
  sessions: IGameSession[],
  daysCount = 7,
  referenceDate = new Date()
): CalendarDay[] {
  
  // Always start week on Monday
  const weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 });

  return Array.from({ length: daysCount }).map((_, i) => {
    const date = addDays(weekStart, i);
    const day = format(date, "EEE"); // Mon, Tue, Wed...
    const completed = sessions.some((session) =>
      isSameDay(new Date(session.updatedAt), date)
    );
    return { id: i, day, completed };
  });
}


export function calculateAvgMMSEByGameType(sessions: IGameSession[]): AvgMMSEByGameType[] {
  if (!sessions || !sessions.length) return [];

  const totals: Record<string, { sum: number; count: number }> = {};

  sessions.forEach(session => {
    const key = session.initConfig.type || "Unknown";

    if (!totals[key]) {
      totals[key] = { sum: 0, count: 0 };
    }

    totals[key].sum += session.mmseScore;
    totals[key].count++;
  });

  return Object.entries(totals).map(([gameType, { sum, count }]) => ({
    gameType,
    avgMMSE: (sum / count).toFixed(1),
  }));
}



