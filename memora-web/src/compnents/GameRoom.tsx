import React, { useState } from "react";
import axios from "../config/axiosConfig"
import GuessWhat from "./Games/GuessWhatGame";
import { GuessWhatInitConfig } from "../game/gameModes/GuessWhat/types";


export const GameRoom: React.FC = () => {
    const [config, setConfig] = useState<GuessWhatInitConfig | null>(null);

    const handleStartGame = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/api/v1/game/game-session", {
                gameType: "guessWhat",
            });

            setConfig(response.data.gameSession.initConfig);
        } catch (error) {
            console.error("Failed to start game:", error);
        }
    };

    return (
        <div>
            <button onClick={handleStartGame} className="p-2 bg-blue-500 text-white hover:cursor-pointer m-2 rounded">
                GuessWhat Game
            </button>

            {config && <GuessWhat config={config} />}
        </div>
    );
};
