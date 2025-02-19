import { useEffect, useState } from "react";
import { GuessWhatGame } from "../../game/gameModes/GuessWhat/GuessWhatGame";
import { GuessWhatInitConfig } from "../../game/gameModes/GuessWhat/types";
import { Card } from "../../game/InterfacesAndClasses/Card";

export default function GuessWhat({ config }: { config: GuessWhatInitConfig }) {
    const [game, setGame] = useState<GuessWhatGame | null>(null);
    const [gameState, setGameState] = useState<any>(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (!config) return;
        const newGame = new GuessWhatGame(config);
        setGame(newGame);
        setGameState(newGame.getCurrentGameState());
        newGame.start();
    }, [config]);



    // Timer for Memorization Phase
    useEffect(() => {
        if (!gameState?.isMemorizationPhase) return;

        setTimer(Math.floor(gameState.memorizationTime / 1000));
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0; // Timer reaches 0
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup
    }, [gameState?.isMemorizationPhase]);



    const handleCardClick = (cardId: number) => {
        if (!game) return;
        if (game.selectCard(cardId)) {
            setGameState(game.getCurrentGameState());
        }
    };

    if (!gameState) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Memory Matching Game</h1>
            <p className="text-sm"> Level: {gameState.level}</p>

            {gameState.isMemorizationPhase ? (
                <p className="text-lg">Memorization Phase: {timer}s left</p>
            ) : (
                <div>
                    <p className="text-lg">Find These Images:</p>
                    <div className="flex flex-row justify-center items-center space-x-3">
                        {gameState.currentImagesToFind.map((image: string, index: number) => (
                            <img key={index} src={image} alt="Find" className="w-4 h-4" />
                        ))}
                    </div>
                    <div className="flex flex-row space-x-3 justify-center items-center">
                        {gameState.cards.map((card: Card) => (
                            <button key={card.id} className={`p-4 border rounded m-5 ${card.matched ? "bg-green-300" : "bg-gray-200"}`} onClick={() => handleCardClick(card.id)} disabled={card.matched}>
                                {card.matched ? "✓" : "?"}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
