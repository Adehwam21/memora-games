"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatStroopSessionForMMSEPrediction = exports.formatStroopParticipantSession = exports.generateStroopQuestions = void 0;
const json2csv_1 = require("json2csv");
const stroopColors = {
    Red: '#FF0000',
    Blue: '#0000FF',
    Green: '#008000',
    Yellow: '#FFFF00',
    Black: '#000000',
};
const generateStroopQuestions = (count) => {
    const colorEntries = Object.entries(stroopColors);
    const questions = [];
    for (let i = 0; i < count; i++) {
        const [text, textColor] = colorEntries[Math.floor(Math.random() * colorEntries.length)];
        // 50% chance of being correct
        const shouldBeCorrect = Math.random() < 0.5;
        let fontColor;
        if (shouldBeCorrect) {
            fontColor = textColor;
        }
        else {
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
exports.generateStroopQuestions = generateStroopQuestions;
const formatStroopParticipantSession = (sessions) => {
    const formatted = sessions.map((s) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return {
            ssid: s.ssid,
            sessionDate: new Date(Number(s.sessionDate)).toISOString(),
            age: s.age || "",
            educationLevel: s.educationLevel || "",
            totalQuestions: (_b = (_a = s.metrics) === null || _a === void 0 ? void 0 : _a.questions) !== null && _b !== void 0 ? _b : "",
            attempts: (_d = (_c = s.metrics) === null || _c === void 0 ? void 0 : _c.attempts) !== null && _d !== void 0 ? _d : "",
            errors: (_f = (_e = s.metrics) === null || _e === void 0 ? void 0 : _e.errors) !== null && _f !== void 0 ? _f : "",
            accuracy: (_h = (_g = s.metrics) === null || _g === void 0 ? void 0 : _g.accuracy) !== null && _h !== void 0 ? _h : "",
            averageResponseTime: (_l = (_k = (_j = s.metrics) === null || _j === void 0 ? void 0 : _j.averageResponseTime) === null || _k === void 0 ? void 0 : _k.toFixed(2)) !== null && _l !== void 0 ? _l : "",
            mmseScore: (_m = s.mmseScore) !== null && _m !== void 0 ? _m : ""
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
    const parser = new json2csv_1.Parser({ fields });
    const stroopSessionCSV = parser.parse(formatted);
    return stroopSessionCSV;
};
exports.formatStroopParticipantSession = formatStroopParticipantSession;
const formatStroopSessionForMMSEPrediction = (session) => {
    const metrics = session.metrics || [];
    return {
        age: session.age || 68,
        educationLevel: session.educationLevel || "none",
        attempts: metrics.attempts.toFixed(),
        errors: metrics.errors.toFixed(),
        accuracy: metrics.accuracy.toFixed(2),
        averageResponseTime: metrics.averageResponseTime.toFixed(2),
    };
};
exports.formatStroopSessionForMMSEPrediction = formatStroopSessionForMMSEPrediction;
//# sourceMappingURL=stroopUtils.js.map