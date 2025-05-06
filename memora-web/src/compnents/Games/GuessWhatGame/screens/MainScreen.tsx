import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
    resumeGame,
    restartGame,
    nextLevel
} from "../../../../redux/slices/games-slice/guessWhat";
import { GameHUD } from "../../GameHUD";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import LevelTimer from "../components/LevelTimer";
import PauseScreen from "./PauseScreen";

const MainScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isPaused, gameState, config } = useSelector((state: RootState) => state.guessWhat);

    const handleResume = () => {
        dispatch(resumeGame()); // Resume the game
    };

    const handleRestart = () => {
        dispatch(restartGame());
    };


    // Timer and Game State Management
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
        <div className="flex flex-col rounded-md text-[#EADEB8] bg-[#9c6144cc] w-[full] h-full">
            {isPaused && (
                <PauseScreen
                    onResume={handleResume}
                    onRestart={handleRestart}
                />
            )}
            <div>
                <LevelTimer
                    shouldRun={!isPaused}
                    isMemorizationPhase={gameState.isMemorizationPhase}
                    onTick={(seconds) => console.log("Elapsed:", seconds)}
                    onReset={() => console.log("Timer reset due to memorization phase.")}
                />
            </div>
            <div>
                <GameHUD gameTitle={config!.title} />
            </div>
            <div className="relative max-w-full h-[46rem] overflow-hidden flex justify-center items-center">
            <AnimatePresence mode="wait">
                {gameState.isMemorizationPhase ? (
                <motion.div
                    key="screen1"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full h-full"
                >
                    <Screen1 imagesToMemorize={gameState.cards} />
                </motion.div>
                ) : (
                <motion.div
                    key="screen2"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full h-full"
                >
                    <Screen2 currentImagesToFind={gameState.currentImagesToFind} cards={gameState.cards} />
                </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>
    );
}

export default MainScreen;
