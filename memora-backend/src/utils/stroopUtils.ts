import { Parser } from "json2csv";
import { IGameSession } from "../models/gameSession.model";

interface StroopQuestion {
  text: string; // The color word
  fontColor: string; // The color used to render it
  isCorrect: boolean; // Whether word matches color
}

const stroopColors: Record<string, string> = {
    Red: '#FF0000',
    Blue: '#0000FF',
    Green: '#008000',
    Yellow: '#FFFF00',
    Black: '#000000',
};

export interface StpMMSEScoreDto {
  age: number,
  attempts: number,
  errors: number,
  accuracy: number,
  averageResponseTime: number,
  educationLevel: string,
}


export const generateStroopQuestions = (count: 150): StroopQuestion[] => {
    const colorEntries = Object.entries(stroopColors);
    const questions: StroopQuestion[] = [];

    for (let i = 0; i < count; i++) {
        const [text, textColor] = colorEntries[Math.floor(Math.random() * colorEntries.length)];

        // 50% chance of being correct
        const shouldBeCorrect = Math.random() < 0.5;

        let fontColor: string;

        if (shouldBeCorrect) {
          fontColor = textColor;
        } else {
          // Pick a random color that is NOT the same as the text
          const otherColors = colorEntries.filter(([name]) => name !== text);
          fontColor = otherColors[Math.floor(Math.random() * otherColors.length)][1];
        }

        questions.push({
          text,
          fontColor,
          isCorrect: shouldBeCorrect,
        });
    }

    return questions;
};

export const formatStroopParticipantSession = (sessions: IGameSession[]) => {

  const formatted = sessions.map((s: any) => {
      return {
        ssid: s.ssid,
        sessionDate: new Date(Number(s.sessionDate)).toISOString(),
        age: s.age || "",
        educationLevel: s.educationLevel || "",
        totalQuestions: s.metrics?.questions ?? "",
        attempts: s.metrics?.attempts ?? "",
        errors: s.metrics?.errors ?? "",
        accuracy: s.metrics?.accuracy ?? "",
        averageResponseTime: s.metrics?.averageResponseTime?.toFixed(2) ?? "",
        mmseScore: s.mmseScore ?? ""
      };
  });

  const fields = [
    "ssid",
    "sessionDate",
    "age",
    "educationLevel",
    "totalQuestions",
    "attempts",
    "errors",
    "accuracy",
    "averageResponseTime",
    "mmseScore"
  ];

  const parser = new Parser({ fields });
  const stroopSessionCSV = parser.parse(formatted);

  return stroopSessionCSV;
}

export const formatStroopSessionForMMSEPrediction = (session: IGameSession): StpMMSEScoreDto => {

  const metrics: any = session.metrics || [];

  return {
    age: session.age || 68,
    educationLevel: session.educationLevel || "none",
    attempts: metrics.attempts.toFixed(),
    errors: metrics.errors.toFixed(),
    accuracy: metrics.accuracy.toFixed(2),
    averageResponseTime: metrics.averageResponseTime.toFixed(2),
  };
}