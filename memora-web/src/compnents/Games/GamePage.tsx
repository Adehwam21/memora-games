/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/axiosConfig";

import { GameRunner } from "./GameRunner";
import { gameConfigs, GameKey } from "../../config/gameConfigs";
import { MobileWarning } from "../MobilViewWarning";

interface ParticipantInfo {
  participantName: string;
  mmseScore: string;
  consent: boolean;
  age: number;
  educationLevel: string;
}

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { game } = useParams();
    const participantInfo: ParticipantInfo | any = JSON.parse(
        localStorage.getItem("participantInfo") || "{}"
    );

    const gameKey = game as GameKey;
    const gameConfig = gameKey ? gameConfigs[gameKey] : undefined;

    const selector = gameConfig ? gameConfig.getSlice : () => ({});
    const { config, isPlaying, sessionId, gameEnded, metrics, totalScore } =
        useSelector(selector) as any;

    useEffect(() => {
        if (gameEnded && !isPlaying && sessionId) {
        API.put(`/game-session/update/${sessionId}`, {
            metrics,
            totalScore,
        })
            .then(() => navigate(`/game/performance/${sessionId}`))
            .catch((err) => console.error("Failed to update session", err));
        }
    }, [gameEnded, isPlaying, sessionId, metrics, totalScore, navigate]);

    if (!gameConfig) return <div>Invalid game: {game}</div>;

    const handleStartGame = async () => {
        const endpoint = participantInfo?.participantName ? "/research-session" : "/game-session";
        
        try {
        const response = await API.post(endpoint, {
            gameTitle: gameConfig.gameTitle,
            ...(participantInfo && { participantInfo }),
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
        <div className="relative flex flex-col items-center justify-center w-full h-screen bg-green-50 p-4">
        <MobileWarning />

        {/* Overlay Start Panel */}
        {!isPlaying && (
            <div className="absolute z-20 max-w-3xl p-10 bg-white rounded-md shadow-lg text-[#3e3e3e]">
            <h2 className="text-4xl font-bold mb-2 capitalize">
                {gameConfig.gameTitle}
            </h2>
            <p className="text-lg mb-4">{gameConfig.description}</p>
            <button
                onClick={handleStartGame}
                className="p-2 bg-green-700 w-1/2 text-white font-bold hover:bg-green-500 rounded"
            >
                Start Game
            </button>
            </div>
        )}

        {/* Game Content */}
        {isPlaying && config && (
            <div className="flex w-full h-full bg-[#9c6144cc] rounded-md text-[#EADEB8] z-10">
            <GameRunner
                sessionId={sessionId!}
                guessWhatConfig={game === "guess-what" ? config : null}
                stroopGameConfig={game === "stroop" ? config : null}
            />
            </div>
        )}
        </div>
    );
};
