import React from "react";
import GuessWhat from "./Games/GuessWhatGame";
import axios from "axios";


export const GameRoom: React.FC = () => {
    const handleStartGame = () => {
        axios.get()
    }
    return (
        <div>
            <button>

            </button>
            <GuessWhat/>
        </div>
    )
};