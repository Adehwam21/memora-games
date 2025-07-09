import { Parser } from "json2csv";
import { IGameSession } from "../models/gameSession.model";
import axios from "axios";

const ai_server_url = process.env.AI_SERVER_URL! as string | "http://127.0.0.1:8000/api/v1"

export interface GWmmseScoreDto {
  age: number,
  averageAttempts: number,
  averageLevelErrors: number,
  averageAccuracy: number,
  averageResponseTime: number,
  educationLevel: string,
}

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
        educationLevel: session.educationLevel || "none",
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

export const formatGuessWhatSessionForMMSEPrediction = (session: IGameSession): GWmmseScoreDto => {

  const metrics: any = session.metrics || [];
  const averageAttempts = average(metrics.map((m: { attempt: any; }) => m.attempt));
  const averageErrors = average(metrics.map((m: { levelErrors: any; }) => m.levelErrors));
  const averageAccuracy = average(metrics.map((m: { accuracy: any; }) => m.accuracy));
  const averageResponseTime = average(metrics.map((m: { totalResponseTime: any; }) => m.totalResponseTime));

  return {
    age: session.age || 50,
    educationLevel: session.educationLevel || "none",
    averageAttempts: Number(averageAttempts.toFixed()),
    averageLevelErrors: Number(averageErrors.toFixed()),
    averageAccuracy: Number(averageAccuracy.toFixed(2)),
    averageResponseTime: Number(averageResponseTime.toFixed(2)),
  };
}

export const requestGuessWhatMMSEscore = async (data: GWmmseScoreDto) => {
  const res = await axios.post(`${ai_server_url}/game/predict-mmse/gw`, data);
  if (res.status !== 200){
    throw new Error("Couldn't make request to ai server")
  }

  return res.data.predicted_mmse
}