import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from '../../config/axiosConfig';
import { GuessWhatMetricsTable } from '../../compnents/Games/GuessWhatGame/components/GuessWhatMetricsTable';
import { StroopMetricsTable } from '../../compnents/Games/StroopGame/components/StroopMetricsTable';
import { useDispatch } from 'react-redux';
import { forceEndGuessWhatGame } from '../../redux/slices/games-slice/guessWhat';
import { forceEndStroopGame } from '../../redux/slices/games-slice/stroop';
import { Loader } from '../../compnents/Loader';
import { BsArrowBarLeft } from 'react-icons/bs';

interface IGuessWhatMetric {
    level: number;
    attempt: number;
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
    mmseScore: number;
    createdAt: string;
    updatedAt: string; 
    __v: number;
}


export const PerformancePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sessionId } = useParams<{ sessionId: string }>();
    const [session, setSession] = useState<IGameSession | null>(null);
    const [showLoader, setShowLoader] = useState(true); // ✅ Add this line


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
            case "guess what":
                dispatch(forceEndGuessWhatGame());
                navigate("/dashboard/stats");
                break;

            case "stroop":
                dispatch(forceEndStroopGame());
                navigate("/dashboard/stats");
                break;

            default:
                break;
        }
    }

    const handleMetricTableChoice = (gameTitle: string) => {
        if (!session) return;
        switch (gameTitle) {
            case "guess what":
                return <GuessWhatMetricsTable 
                    metrics={session.metrics as IGuessWhatMetric[]} 
                    totalScore={session.totalScore}
                    mmseScore = {session.mmseScore}
                />
            
            case "stroop":
                return <StroopMetricsTable 
                    metrics={session.metrics as IStroopMetric} 
                    totalScore={session.totalScore}
                    mmseScore={session.mmseScore}
                    />
        
            default:
                break;
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowLoader(false);
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    if (showLoader || !session) {
        return <Loader />;
    }

    return (
        <div className='p-10 flex flex-col justify-center items-center'>
            { session && handleMetricTableChoice(session.gameTitle)}

            <button
                className='mt-4 flex flex-row justify-center items-center bg-green-700 hover:bg-green-600 text-white font-semibold text-md rounded-md p-3 transition-colors'
                onClick={() => handleReturnButtonClick(session.gameTitle)}
            >
                <BsArrowBarLeft style={{fontSize:30}}/> Games hub
            </button>
        </div>
    );
}
