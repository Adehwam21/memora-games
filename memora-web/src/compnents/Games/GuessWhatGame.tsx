import { useEffect, useState, useMemo } from "react";
import { GuessWhatGame } from "../../game/gameModes/GuessWhat/GuessWhatGame";
import { GuessWhatInitConfig } from "../../game/gameModes/GuessWhat/types";


export default function GuessWhat(config: GuessWhatInitConfig) {
    const [game] = useState(new GuessWhatGame(config));
    const [gameState, setGameState] = useState(game.getGameState());
    const [attemptCount, setattemptCount] = useState(0);
    const [timer, setTimer] = useState(gameState.memorizationTime / 1000);
    const [levelTime, setLevelTime] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);

    useEffect(() => {
        game.start();
        const interval = setInterval(() => {
            setTimer((t) => (t > 0 ? t - 1 : 0));
        }, 1000);

        setTimeout(() => {
            setGameState(game.getGameState());
            setStartTime(Date.now()); // Start tracking time after memorization
            clearInterval(interval);
        }, gameState.memorizationTime);

        return () => clearInterval(interval);
    }, []);

    const handleCardClick = (cardId: number) => {
        if (game.selectCard(cardId)) {
            setattemptCount((prevattemptCount) => prevattemptCount + 1);
            setGameState(game.getGameState());

            if (attemptCount + 1 === gameState.currentImagesToFind.length) {
                // Level completed, calculate time
                if (startTime) {
                    setLevelTime(Math.floor((Date.now() - startTime) / 1000));
                }
                setTimeout(() => {
                    game.nextLevel(); // Move to next level
                    setGameState(game.getGameState());
                    setattemptCount(0);
                    setStartTime(Date.now());
                }, 3000);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Memory Matching Game</h1>
            <p className="text-sm"> Level: {gameState.level}</p>

            {gameState.isMemorizationPhase ? (
                <div>
                    <p className="text-lg">Memorization Phase: {timer}s left</p>
                    <div className="flex flex-row space-x-3">
                        {gameState.cards.map((card) => (
                            <div key={card.id} className="p-4 border rounded bg-gray-200">
                                <img src={card.image} alt="Card" className="w-8 h-8" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <p className="text-lg">Find These Images:</p>
                    <p className="text-sm">Attempts: {attemptCount} / {gameState.currentImagesToFind.length}</p>
                    <p className="text-sm">Time Taken: {levelTime} seconds</p>

                    <div className="flex flex-row justify-center items-center space-x-3">
                        {gameState.currentImagesToFind.map((image, index) => (
                            <img key={index} src={image} alt="Find" className="w-4 h-4" />
                        ))}
                    </div>

                    <div className="flex flex-row space-x-3 justify-center items-center">
                        {gameState.cards.map((card) => (
                            <button
                                key={card.id}
                                className={`p-4 border rounded m-5 ${card.matched ? "bg-green-300" : "bg-gray-200"}`}
                                onClick={() => handleCardClick(card.id)}
                                disabled={card.matched}
                            >
                                {card.matched ? "✓" : "?"}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
