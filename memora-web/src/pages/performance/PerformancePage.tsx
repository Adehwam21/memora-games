import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from '../../config/axiosConfig';
import { GuessWhatMetricsTable } from '../../compnents/Games/GuessWhatGame/components/GuessWhatMetricsTable';
import { StroopMetricsTable } from '../../compnents/Games/StroopGame/components/StroopMetricsTable';
import { useDispatch } from 'react-redux';
import { forceEndGame } from '../../redux/slices/games-slice/guessWhat';
import { forceEndStroopGame } from '../../redux/slices/games-slice/stroop';

interface IGuessWhatMetric {
    level: number;
    attempts: number;
    accuracy: number;
    levelErrors: number;
    totalResponseTime: number;
    levelScore: number;
}

interface IStroopMetric {
    questions: number;
    attempts: number;
    averageResponseTime: number;
    errors: number;
    accuracy: number;
}

// Union type for metrics
type IGameMetric = IGuessWhatMetric[] | IStroopMetric;


interface IGameSession {
    _id: string;
    userId: string;
    gameTitle: string;
    gameType: string;
    ssid: string;
    sessionDate: string; 
    metrics: IGameMetric;
    totalScore: number;
    mmseScore: string;
    createdAt: string;
    updatedAt: string; 
    __v: number;
}


export const PerformancePage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { sessionId } = useParams<{ sessionId: string }>();
    const [session, setSession] = useState<IGameSession | null>(null);

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await API.get(`/game-session/${sessionId}`)
                if (response.status === 200){
                    setSession(response.data!.gameSession);
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
            }
        };

        if (sessionId) fetchSessionData();
    }, [sessionId]);

    const handleReturnButtonClick = (gameTitle: string) => {
        if (!session) return;
        switch (gameTitle) {
            case "guess-what":
                dispatch(forceEndGame());
                navigate("/dashboard/games");
                break;

            case "stroop":
                dispatch(forceEndStroopGame());
                navigate("/dashboard/games");
                break;

            default:
                break;
        }
    }

    const handleMetricTableChoice = (gameTitle: string) => {
        if (!session) return;
        switch (gameTitle) {
            case "guess-what":
                return <GuessWhatMetricsTable 
                    metrics={session.metrics as IGuessWhatMetric[]} 
                    totalScore={session.totalScore}
                />
            
            case "stroop":
                return <StroopMetricsTable 
                    metrics={session.metrics as IStroopMetric} 
                    totalScore={session.totalScore}/>
        
            default:
                break;
        }
    }

    if (!session) return <p>Loading session data...</p>;

    return (
        <div className='p-10'>
            { session && handleMetricTableChoice(session.gameTitle)}
            <div className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
                <p className="text-lg font-semibold">Equivalent MMSE Score: {session.mmseScore}</p>
            </div>

            <button
                className='mt-4 bg-green-500 hover:bg-green-400 text-white font-semibold text-lg py-2 rounded-md p-5 transition-colors'
                onClick={() => handleReturnButtonClick(session.gameTitle)}
            >
                Return to Dashboard
            </button>
        </div>
    );
}
