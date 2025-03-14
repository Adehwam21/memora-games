import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Import your store's RootState type
import { startGame } from "../redux/gameSlice"; // Import Redux actions
import API from "../config/axiosConfig";
import GuessWhat from "./Games/GuessWhatGame";

export const GameRoom: React.FC = () => {
    const dispatch = useDispatch();
    const { config, isPlaying } = useSelector((state: RootState) => state.guessWhat); // Select state from Redux

    const handleStartGame = async () => {
        try {
            const response = await API.post('/game/game-session', { gameType: "guessWhat" });

            dispatch(startGame({
                sessionId: response.data.gameSession.sessionId,
                config: response.data.gameSession.initConfig,
            }));
        } catch (error) {
            console.error("Failed to start game:", error);
        }
    };

    return (
        <div>
            <button 
                onClick={handleStartGame} 
                className="p-2 bg-blue-500 text-white hover:cursor-pointer m-2 rounded"
                disabled={isPlaying}
            >
                {isPlaying ? "Game In Progress..." : "Start GuessWhat Game"}
            </button>

            {config && <GuessWhat />}
        </div>
    );
};
