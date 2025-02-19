// Optimized GuessWhatGame.ts
import { BaseGame } from "../../InterfacesAndClasses/Base";
import { Card } from "../../InterfacesAndClasses/Card";
import { GuessWhatInitConfig } from "./types";

export class GuessWhatGame extends BaseGame {
    private config: GuessWhatInitConfig;
    private cards: Card[] = [];
    private imagesToMemorize: number[] = [];
    private levelStartTime = 0;
    private currentImagesToFind: string[] = [];
    private attempts = 0;
    private isMemorizationPhase = true;
    
    public maxAttempts = 3;
    public memorizationTime: number;

    constructor(config: GuessWhatInitConfig) {
        super(config.maxLevels, config.name);
        this.config = config;
        this.memorizationTime = config.defaultMemorizationTime;
        this.initializeLevel();
    }

    private initializeLevel(): void {
        const numImages = this.currentLevel + this.config.basePairs;
        this.imagesToMemorize = this.shuffleArray([...Array(this.config.imageSet.length).keys()]).slice(0, numImages);
        this.attempts = 0;
        this.cards = this.generateCards(this.imagesToMemorize);
        this.memorizationTime = Math.max(this.config.minMemorizationTime, this.memorizationTime - this.currentLevel * 1500);
        this.isMemorizationPhase = true;
    }

    start(): void {
        this.isMemorizationPhase = true;
        setTimeout(() => {
            this.isMemorizationPhase = false;
            this.levelStartTime = Date.now();
            const numImagesToFind = this.currentLevel <= 3 ? 1 : this.currentLevel <= 6 ? 2 : 3;
            this.currentImagesToFind = this.shuffleArray(this.imagesToMemorize.map(index => this.config.imageSet[index])).slice(0, numImagesToFind);
        }, this.memorizationTime);
    }

    reset(): void {
        this.currentLevel = 1;
        this.initializeLevel();
    }

    nextLevel(): void {
        if (this.currentLevel < this.maxLevels) {
            this.currentLevel++;
            this.initializeLevel();
            this.start();
        }
    }

    getCurrentGameState() {
        return {
            level: this.currentLevel,
            cards: this.cards.map(({ id, image, matched }) => ({ id, image, matched })),
            currentImagesToFind: this.currentImagesToFind,
            isMemorizationPhase: this.isMemorizationPhase,
            memorizationTime: this.memorizationTime,
        };
    }

    selectCard(cardId: number): boolean {
        if (this.isMemorizationPhase || !this.currentImagesToFind.length) return false;

        const card = this.cards.find(card => card.id === cardId);
        if (!card || card.matched) return false;

        this.attempts++;
        if (this.currentImagesToFind.includes(card.image)) {
            card.matched = true;
            this.currentImagesToFind = this.currentImagesToFind.filter(image => image !== card.image);
            if (!this.currentImagesToFind.length) this.endLevel();
            return true;
        }

        if (this.attempts >= this.maxAttempts) this.endLevel();
        return false;
    }

    private endLevel(): void {
        const correctGuesses = this.cards.filter(card => card.matched).length;
        const accuracy = correctGuesses / this.imagesToMemorize.length;
        const sessionErrors = this.attempts - correctGuesses;
        const responseTime = Math.floor((Date.now() - this.levelStartTime) / 1000) - this.memorizationTime;

        fetch("/api/storeGameMetrics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: "some_user_id",
                level: this.currentLevel,
                accuracy,
                sessionErrors,
                responseTime
            })
        });

        setTimeout(() => this.nextLevel(), 5000);
    }

    private generateCards(imgIdx: number[]): Card[] {
        return this.shuffleArray(imgIdx.map((index, id) => ({ id, image: this.config.imageSet[index], matched: false })));
    }

    private shuffleArray<T>(array: T[]): T[] {
        return array.sort(() => Math.random() - 0.5);
    }
}
