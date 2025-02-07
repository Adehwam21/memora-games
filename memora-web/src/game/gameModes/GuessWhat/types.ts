export interface GuessWhatInitConfig {
    name: string;
    maxLevels: number;
    defaultMemorizationTime: number;
    memorizationTimeReductionPerLevel: number;
    minMemorizationTime: number;
    basePairs: number;
    imageSet: [];
}
