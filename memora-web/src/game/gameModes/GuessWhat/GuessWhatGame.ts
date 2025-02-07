import { BaseGame } from "../../InterfacesAndClasses/Base";
import { Card } from "../../InterfacesAndClasses/Card";
import { GuessWhatInitConfig } from "./types";

/**
 * `GuessWhatGame` class extends `BaseGame` and implements the logic for a memory-matching game.
 * Players first memorize the card images before selecting the correct matches.
 */
export class GuessWhatGame extends BaseGame {
    private config: GuessWhatInitConfig;
    private cards: Card[];
    private images: string[];
    private imagesToMemorize: number[]; // Contain a list of image indexes that have been selected for current level
    private memorizationTime: number;
    private currentImagesToFind: string[];
    private attempts: number;
    private maxAttempts: number;
    private isMemorizationPhase: boolean;

    constructor(config: GuessWhatInitConfig) {
        super(config.maxLevels, config.name);
        this.config = config;
        this.images = this.config.imageSet;
        this.imagesToMemorize = [];
        this.cards = [];
        this.currentImagesToFind = [];
        this.isMemorizationPhase = true;
        this.memorizationTime = this.config.defaultMemorizationTime;
        this.attempts = 0;
        this.maxAttempts = 3;
        this.initializeLevel();
    }

    private initializeLevel(): void {
        const numImages = this.currentLevel + this.config.basePairs;
        this.imagesToMemorize = this.shuffleArray([...Array(this.images.length).keys()]).slice(0, numImages);
        this.attempts = 0
    
        this.cards = this.generateCards(this.imagesToMemorize);
        this.memorizationTime = Math.max(this.config.minMemorizationTime, this.memorizationTime - this.currentLevel * 1500);
        this.isMemorizationPhase = true;
    }

    start(): void {
        this.isMemorizationPhase = true;
        setTimeout(() => {
            this.isMemorizationPhase = false;
            let numImagesToFind = this.currentLevel <= 3 ? 1 : this.currentLevel <= 6 ? 2 : 3;
            this.currentImagesToFind = this.shuffleArray(this.imagesToMemorize.map(index => this.images[index])).slice(0, numImagesToFind);
        }, this.memorizationTime);
    }

    reset(): void {
        this.currentLevel = 1;
        this.initializeLevel();
    }

    nextLevel() {
        if (this.currentLevel < this.maxLevels ){
            this.currentLevel += 1;
            this.initializeLevel();
        }
    }

    getGameState() {
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

        const card = this.cards.find((c) => c.id === cardId);
        if (!card || card.matched) return false;

        if (this.currentImagesToFind.includes(card.image)) {
            card.matched = true;
            this.currentImagesToFind = this.currentImagesToFind.filter(image => image !== card.image);
            if (this.currentImagesToFind.length === 0) {
                this.nextLevel();
            }
            return true;
        }

        return false;
    }

    private generateCards(imgIdx: number[]): Card[] {
        let id = 0;
        return this.shuffleArray(
            imgIdx.map((index) => ({
                id: id++,
                image: this.images[index],
                matched: false
            }))
        );
    }

    private shuffleArray<T>(array: T[]): T[] {
        return array.sort(() => Math.random() - 0.5);
    }
}
