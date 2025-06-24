"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStroopQuestions = void 0;
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
//# sourceMappingURL=stroopUtils.js.map