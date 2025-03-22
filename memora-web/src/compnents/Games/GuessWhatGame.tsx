import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { revealCards, nextLevel, sendGameMetrics } from "../../redux/gameSlice";
import GuessWhatTimer from "./GuessWhatTimer";
import Card from "./AnimatedClickableCard";

export default function GuessWhat() {
    const dispatch = useDispatch<AppDispatch>();
    const metrics = useSelector((state: RootState) => state.guessWhat.metrics);
    const sessionId = useSelector((state: RootState) => state.guessWhat.sessionId);
    const gameState = useSelector((state: RootState) => state.guessWhat.gameState);
    const sessionEnded = !useSelector((state: RootState) => state.guessWhat.isPlaying);
    

    useEffect(() => {
        if (!sessionEnded || !gameState) return;

        dispatch(sendGameMetrics({ sessionId, performance: metrics }));
    }, [sessionId, sessionEnded, gameState, dispatch, metrics]);

    useEffect(() => {
        if (!gameState) return;
        setTimeout(() => dispatch(revealCards()), gameState.memorizationTime);
    }, [gameState, gameState?.memorizationTime, dispatch]); 

    useEffect(() => {
        if (!gameState) return;

        if (gameState.currentImagesToFind.length === 0 || gameState.attempts >= gameState.maxAttempts) {
            setTimeout(() => {
                dispatch(nextLevel());
            }, 1000);
        }
    }, [gameState, dispatch]); 

    if (!gameState) return <p>Loading...</p>;

    return (
        <div className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
            <h1 className="text-xl m-3 font-bold">Memory Matching Game</h1>
            <div className="flex justify-center space-x-12 items-center w-full">
                <p className="text-sm font-semibold">Level: {gameState.level}</p>
                <p className="text-sm font-semibold">
                    Difficulty: {gameState.level <= 3 ? "Easy" : gameState.level <= 6 ? "Medium" : "Hard"}
                </p>
                <p className="text-sm font-semibold text-red-500">
                    Attempts Left: {gameState.maxAttempts - gameState.attempts}
                </p>
            </div>

            {gameState.isMemorizationPhase ? (
                <GuessWhatTimer imagesToMemorize={gameState.cards} /> 
            ) : (
                <div>
                    <div className="flex justify-center items-center space-x-16 mt-7">
                        {gameState.currentImagesToFind.map((image, index) => (
                            <img key={index} src={image} alt="Find" className="w-16 h-16" />
                        ))}
                    </div>

                    <p className="flex justify-center items-center mt-5 text-lg text-center font-semibold">
                        Select the cards that match the images above
                    </p>

                    <div className="grid grid-cols-3 gap-5 mt-12 max-w-md mx-auto">
                        {gameState.cards.map((card, index) => (
                            <Card index={index} key={card.id} id={card.id} image={card.image} matched={card.matched} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
