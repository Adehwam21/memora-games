import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; // Import your store's RootState type
import { startGame } from "../../../redux/slices/games-slice/guessWhat"; // Import Redux actions
import API from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { computeMmseScore } from "../../../utils/game/guessWhatUtils";
import { GameRunner } from "../GameRunner";

export const GameRoom: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { config, isPlaying, sessionId } = useSelector((state: RootState) => state.guessWhat); // Select state from Redux
    const gameEnded = useSelector((state: RootState) => state.guessWhat.gameEnded)
    
    const metrics = useSelector((state: RootState) => state.guessWhat.metrics);
    const mmseScore = computeMmseScore(metrics);

    useEffect(() => {
        if (gameEnded && !isPlaying) {
            API.put(`/game/game-session/update/${sessionId}`, { metrics, mmseScore })
                .then(() => {
                    navigate(`/game/performance/${sessionId}`);
                })
                .catch((error) => console.error("Failed to update game session:", error));
        }
    }, [navigate, gameEnded, isPlaying, sessionId, metrics, mmseScore]);
    
    

    const handleStartGame = async () => {
        try {
            const response = await API.post('/game/game-session', { gameTitle: "guessWhat" });

            dispatch(startGame({
                sessionId: response.data.gameSession!._id,
                config: response.data.gameSession.initConfig,
            }));
        } catch (error) {
            console.error("Failed to start game:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
            <button 
                onClick={handleStartGame} 
                className="p-2 bg-blue-500 text-white hover:cursor-pointer m-2 rounded"
                disabled={isPlaying}
            >
                {isPlaying ? "Game In Progress..." : "Start GuessWhat Game"}
            </button>

            {config && <GameRunner sessionId={sessionId!} config={config} />}
        </div>
    );
};
