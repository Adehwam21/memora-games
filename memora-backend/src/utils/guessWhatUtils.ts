import { Parser } from "json2csv";
import { IGameSession } from "../models/gameSession.model";

const average = (arr: any[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
export const formatGuessWhatParticipantSession = (sessions: IGameSession[]) => {

      const formatted = sessions.map((session) => {
      const metrics: any = session.metrics || [];
      const totalLevels = metrics.length;

      const averageAttempts = average(metrics.map((m: { attempt: any; }) => m.attempt));
      const averageErrors = average(metrics.map((m: { levelErrors: any; }) => m.levelErrors));
      const averageAccuracy = average(metrics.map((m: { accuracy: any; }) => m.accuracy));
      const averageResponseTime = average(metrics.map((m: { totalResponseTime: any; }) => m.totalResponseTime));

      return {
        ssid: session.ssid,
        sessionDate: new Date(Number(session.sessionDate)).toISOString(),
        age: session.age || "",
        educationLevel: session.educationLevel || "",
        totalLevel: totalLevels,
        averageAttempts: averageAttempts.toFixed(),
        averageLevelErrors: averageErrors.toFixed(),
        averageAccuracy: averageAccuracy.toFixed(2),
        averageResponseTime: averageResponseTime.toFixed(2),
        mmseScore: session.mmseScore ?? ""
      };
    });

    const fields = [
      "ssid",
      "sessionDate",
      "age",
      "educationLevel",
      "totalLevel",
      "averageAttempts",
      "averageLevelErrors",
      "averageAccuracy",
      "averageResponseTime",
      "mmseScore"
    ];

    const parser = new Parser({ fields });
    const guessWhatSessionCSV = parser.parse(formatted);

    return guessWhatSessionCSV;
}