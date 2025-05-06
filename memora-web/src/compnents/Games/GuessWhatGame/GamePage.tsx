import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import API from "../../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

// Map game titles to config
import { startGame as startGuessWhatGame } from "../../../redux/slices/games-slice/guessWhat";
import { computeMmseScore as computeGuessWhatMmse } from "../../../utils/game/guessWhatUtils";
import { GameRunner as GuessWhatGameRunner } from "../GameRunner";

// Add more mappings as needed
const gameConfigs = {
    "guess what": {
        startGameAction: startGuessWhatGame,
        computeScore: computeGuessWhatMmse,
        GameRunner: GuessWhatGameRunner,
        gameTitle: "Guess What",
        description: "A memory recognition game to evaluate visual attention and recall.",
    },
    // Add other games here...
};

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { game } = useParams(); // dynamic param from URL like /game/guess-what

    console.log(game)
    const gameConfig = gameConfigs[game as keyof typeof gameConfigs];

    const { config, isPlaying, sessionId, gameEnded, metrics } = useSelector(
        (state: RootState) => state.guessWhat // change this based on game if needed
    );

    const mmseScore = gameConfig.computeScore(metrics);

    useEffect(() => {
        if (gameEnded && !isPlaying) {
        API.put(`/game-session/update/${sessionId}`, { metrics, mmseScore })
            .then(() => {
            navigate(`/game/performance/${sessionId}`);
            })
            .catch((error) => console.error("Failed to update game session:", error));
        }
    }, [navigate, gameEnded, isPlaying, sessionId, metrics, mmseScore]);

    const handleStartGame = async () => {
        try {
            const response = await API.post("/game-session/", {
                gameTitle: gameConfig.gameTitle.toLowerCase(),
            });

            console.log(response)

            dispatch(
                gameConfig.startGameAction({
                sessionId: response.data!.gameSession!._id!,
                config: response.data!.gameSession!.initConfig!,
                })
            );
        } catch (error) {
        console.error("Failed to start game:", error);
        }
    };

    const GameRunnerComponent = gameConfig.GameRunner;

    return (
        <div className="flex flex-row w-full h-screen bg-green-50 p-4 gap-4">
        {/* Left Panel */}
            <div className="flex flex-col w-1/2 p-10 bg-white rounded-md shadow text-[#3e3e3e]">
                <h2 className="text-4xl font-bold mb-2">{gameConfig.gameTitle}?</h2>
                <p className="text-lg mb-4">{gameConfig.description}</p>

                <button
                    onClick={handleStartGame}
                    className="p-2 bg-green-500 w-1/2 text-white hover:bg-green-700 rounded"
                    disabled={isPlaying}
                >
                {isPlaying ? "Game In Progress..." : `Start ${gameConfig.gameTitle}`}
                </button>
            </div>

        {/* Right Panel */}
            <div className="flex w-full bg-[#9c6144cc] rounded-md text-[#EADEB8]">
                {config! && <GameRunnerComponent sessionId={sessionId!} config={config} />}
            </div>
        </div>
    );
};
