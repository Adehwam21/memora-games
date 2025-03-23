import { GuessWhatInitConfig } from "../game/gameModes/GuessWhat/types";
import { Card } from "../game/InterfacesAndClasses/Card";
import API from "../config/axiosConfig";
import { Metric } from "../types/props";

// Helper functions
export function initializeGameState(config: GuessWhatInitConfig, level: number) {
    const numImages = level + config.basePairs;
    const imagesToMemorize = shuffleArray([...Array(config.imageSet.length).keys()]).slice(0, numImages);
    
    const memorizationTime = Math.max(config.minMemorizationTime, config.defaultMemorizationTime - level * 1000);
    
    return {
        level,
        cards: generateCards(imagesToMemorize, config.imageSet),
        currentImagesToFind: selectImagesToFind(imagesToMemorize, config.imageSet, level <= 3 ? 1 : level <= 6 ? 2 : 3),
        isMemorizationPhase: true,
        memorizationTime,
        timeLeft: Math.floor(memorizationTime / 1000),
        levelStartTime: 0,
        levelEndTime: 0,
        attempts: 0,
        maxAttempts: 3,
    };
}

function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

function generateCards(imgIdx: number[], imageSet: string[]): Card[] {
    return shuffleArray(imgIdx.map((index, id) => ({ id, image: imageSet[index], matched: false })));
}

function selectImagesToFind(imagesToMemorize: number[], imageSet: string[], numImagesToFind: number): string[] {
    return shuffleArray(imagesToMemorize.map(index => imageSet[index])).slice(0, numImagesToFind);
}


export const updateGameSessionMetrics = async (sessionId: string, metrics: Metric[]) => {
    try {
        const response = await API.put(`/game/game-session/update/${sessionId}`, { metrics: metrics });


        if (response.status !== 200) {
            throw new Error("Failed to send game metrics");
        } else {
            console.log("Game metrics sent successfully", response.data);
        }
    } catch (error) {
        console.error("Error sending game metrics", error);
    }
}
