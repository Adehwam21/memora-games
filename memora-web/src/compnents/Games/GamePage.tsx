/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/axiosConfig";

import { GameRunner } from "./GameRunner";
import { gameConfigs, GameKey } from "../../config/gameConfigs";

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { game } = useParams(); // 'guess-what', 'stroop', etc.

    const gameKey = game as GameKey;
    const gameConfig = gameKey ? gameConfigs[gameKey] : undefined;

    // Always call hooks unconditionally
    const selector = gameConfig ? gameConfig.getSlice : () => ({});
    const { config, isPlaying, sessionId, gameEnded, metrics, totalScore } = useSelector(selector) as any;

    // TODO: Ensure you provide this with your model, for now hardcoded mmse score is being used
    const mmseScore = gameConfig && totalScore !== undefined ? gameConfig.computeScore(totalScore) : 0;

    useEffect(() => {
        // Update game session with metrics when game has ended
        if (gameEnded && !isPlaying && sessionId) {
        API.put(`/game-session/update/${sessionId}`, { metrics, totalScore, mmseScore })
            .then(() => navigate(`/game/performance/${sessionId}`))
            .catch((err) => console.error("Failed to update session", err));
        }
    }, [gameEnded, isPlaying, sessionId, metrics, totalScore, mmseScore, navigate]);

    if (!gameConfig) return <div>Invalid game: {game}</div>;

    const handleStartGame = async () => {
        try {
        const response = await API.post("/game-session/", {
            gameTitle: gameConfig.gameTitle,
        });

        dispatch(
            gameConfig.startGameAction({
                sessionId: response.data.gameSession._id,
                ...(game === "guess-what"
                ? { guessWhatConfig: response.data.gameSession.initConfig }
                : { stroopGameConfig: response.data.gameSession.initConfig }),
            } as any) // optional: cast to any to suppress edge errors, but should be safe
        );

        } catch (error) {
        console.error("Failed to start game:", error);
        }
    };

    return (
        <div className="flex flex-row w-full h-screen bg-green-50 p-4 gap-4">
        {/* Left Panel */}
        <div className="flex flex-col w-1/2 p-10 bg-white rounded-md shadow text-[#3e3e3e]">
            <h2 className="text-4xl font-bold mb-2 capitalize">{gameConfig.gameTitle}</h2>
            <p className="text-lg mb-4">{gameConfig.description}</p>

            <button
            onClick={handleStartGame}
            className="p-2 bg-green-500 w-1/2 text-white font-bold hover:bg-green-700 rounded"
            disabled={isPlaying}
            >
            {isPlaying ? "Game In Progress..." : "Start Game"}
            </button>
        </div>

        {/* Right Panel */}
        <div className="flex w-full bg-[#9c6144cc] rounded-md text-[#EADEB8]">
            {config && (
                <GameRunner
                    sessionId={sessionId!}
                    guessWhatConfig={game === "guess-what" ? config : null}
                    stroopGameConfig={game === "stroop" ? config : null}
                />)}
        </div>
        </div>
    );
};
