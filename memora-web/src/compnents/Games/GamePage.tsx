/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/axiosConfig";

import { GameRunner } from "./GameRunner";
import { gameConfigs, GameKey } from "../../config/gameConfigs";

interface ParticipantInfo {
    participantName: string,
    mmseScore: string,
    consent: boolean,
    age: number,
    educationLevel: string,
}

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { game } = useParams(); // 'guess-what', 'stroop', etc.
    const participantInfo:ParticipantInfo | any  = JSON.parse(localStorage.getItem("participantInfo") || "{}"); // Provided it was a reseach participation
    console.log(participantInfo)


    const gameKey = game as GameKey;
    const gameConfig = gameKey ? gameConfigs[gameKey] : undefined;

    // Always call hooks unconditionally
    const selector = gameConfig ? gameConfig.getSlice : () => ({});
    const { config, isPlaying, sessionId, gameEnded, metrics, totalScore } = useSelector(selector) as any;

    useEffect(() => {
        // Update game session with metrics when game has ended
        if (gameEnded && !isPlaying && sessionId) {
        API.put(`/game-session/update/${sessionId}`, { metrics, totalScore })
            .then(() => navigate(`/game/performance/${sessionId}`))
            .catch((err) => console.error("Failed to update session", err));
        }
    }, [gameEnded, isPlaying, sessionId, metrics, totalScore, navigate]);

    if (!gameConfig) return <div>Invalid game: {game}</div>;

    const handleStartGame = async () => {
        const participantInfoRaw = localStorage.getItem("participantInfo");
        const participantInfo = participantInfoRaw ? JSON.parse(participantInfoRaw) : null;

        const endpoint = participantInfo ? "/research-session" : "/game-session";

        try {
            const response = await API.post(endpoint, {
            gameTitle: gameConfig.gameTitle,
            ...(participantInfo && { participantInfo })  // only send if available
            });

            dispatch(
            gameConfig.startGameAction({
                sessionId: response.data.gameSession._id,
                ...(game === "guess-what"
                ? { guessWhatConfig: response.data.gameSession.initConfig }
                : { stroopGameConfig: response.data.gameSession.initConfig }),
            } as any)
            );

            localStorage.removeItem("participantInfo");
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
