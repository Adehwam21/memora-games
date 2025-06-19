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
    Purple: '#800080',
    Orange: '#FFA500',
    Brown: '#A52A2A',
    Black: '#000000',
};


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
