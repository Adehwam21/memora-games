"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGuessWhatSessionForMMSEPrediction = exports.formatGuessWhatParticipantSession = void 0;
const json2csv_1 = require("json2csv");
const average = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
const formatGuessWhatParticipantSession = (sessions) => {
    const formatted = sessions.map((session) => {
        var _a;
        const metrics = session.metrics || [];
        const totalLevels = metrics.length;
        const averageAttempts = average(metrics.map((m) => m.attempt));
        const averageErrors = average(metrics.map((m) => m.levelErrors));
        const averageAccuracy = average(metrics.map((m) => m.accuracy));
        const averageResponseTime = average(metrics.map((m) => m.totalResponseTime));
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
            mmseScore: (_a = session.mmseScore) !== null && _a !== void 0 ? _a : ""
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
    const parser = new json2csv_1.Parser({ fields });
    const guessWhatSessionCSV = parser.parse(formatted);
    return guessWhatSessionCSV;
};
exports.formatGuessWhatParticipantSession = formatGuessWhatParticipantSession;
const formatGuessWhatSessionForMMSEPrediction = (session) => {
    const metrics = session.metrics || [];
    const averageAttempts = average(metrics.map((m) => m.attempt));
    const averageErrors = average(metrics.map((m) => m.levelErrors));
    const averageAccuracy = average(metrics.map((m) => m.accuracy));
    const averageResponseTime = average(metrics.map((m) => m.totalResponseTime));
    return {
        age: session.age || 68,
        educationLevel: session.educationLevel || "none",
        averageAttempts: Number(averageAttempts.toFixed()),
        averageLevelErrors: Number(averageErrors.toFixed()),
        averageAccuracy: Number(averageAccuracy.toFixed(2)),
        averageResponseTime: Number(averageResponseTime.toFixed(2)),
    };
};
exports.formatGuessWhatSessionForMMSEPrediction = formatGuessWhatSessionForMMSEPrediction;
//# sourceMappingURL=guessWhatUtils.js.map