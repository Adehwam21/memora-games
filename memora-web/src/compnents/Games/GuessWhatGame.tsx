// components/GuessWhat.tsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { revealCards, selectCard, nextLevel, endGame } from "../../redux/gameSlice";
import GuessWhatTimer from './GuessWhatTimer';
import Card from './AnimatedClickableCard'; // Import the reusable Card component

export default function GuessWhat() {
    const dispatch = useDispatch();
    const gameState = useSelector((state: RootState) => state.guessWhat.gameState);
    const isPlaying = useSelector((state: RootState) => state.guessWhat.isPlaying);

    useEffect(() => {
        if (!gameState) return;
        setTimeout(() => dispatch(revealCards()), gameState.memorizationTime);
    }, [gameState, dispatch]);

    useEffect(() => {
        if (!gameState) return;

        // ✅ Move to next level if all correct images are found
        if (gameState.currentImagesToFind.length === 0 || gameState.attempts >= gameState.maxAttempts) {
            setTimeout(() => {
                dispatch(nextLevel());
            }, 1000);
        }
    }, [gameState?.currentImagesToFind.length, gameState?.attempts]);

    if (!isPlaying) {
        return (
            <div className="p-4">
                <h1 className="text-xl font-bold">Game Over!</h1>
                <p className="text-sm">Congratulations! You've completed all levels.</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => dispatch(endGame())}>
                    Restart Game
                </button>
            </div>
        );
    }

    if (!gameState) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Memory Matching Game</h1>
            <p className="text-sm">Level: {gameState.level}</p>
            <p className="text-sm font-semibold text-red-500">Attempts Left: {gameState.maxAttempts - gameState.attempts}</p>

            {gameState.isMemorizationPhase ? (
                <GuessWhatTimer imagesToMemorize={gameState.cards} />
            ) : (
                <div>
                    <p className="text-lg">Find these images:</p>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {gameState.currentImagesToFind.map((image, index) => (
                            <img key={index} src={image} alt="Find" className="w-10 h-10 rounded shadow-md" />
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {gameState.cards.map((card, index) => (
                            <Card
                                index={index}
                                key={card.id}
                                id={card.id}
                                image={card.image}
                                
                                matched={card.matched}
                                onClick={() => dispatch(selectCard(card.id))}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
