import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from '../../config/axiosConfig';

import MetricsTable from '../../compnents/Games/GuessWhatGame/MetricsTable';
import { useDispatch } from 'react-redux';
import { forceEndGame } from '../../redux/slices/games-slice/guessWhat';

interface IGameMetric {
    _id: string;
    level: number;
    attempt: number;
    accuracy: number;
    levelErrors: number;
    totalResponseTime: number;
}

interface IGameSession {
    _id: string;
    userId: string;
    gameType: string;
    ssid: string;
    sessionDate: string; 
    metrics: IGameMetric[];
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
                const response = await API.get(`/game/game-session/${sessionId}`)
                if (response.status === 200){
                    setSession(response.data!.gameSession);
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
            }
        };

        if (sessionId) fetchSessionData();
    }, [sessionId]);

    const handleReturnButtonClick = () => {
        dispatch(forceEndGame())
        navigate("/lobby")
    }

    if (!session) return <p>Loading session data...</p>;

    return (
        <div className='p-10'>
            <MetricsTable metrics={session.metrics}/>
            <div className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
                <p className="text-lg font-semibold">Mini-Mental State Score (MMSE) : {session.mmseScore}</p>
            </div>

            <button onClick={handleReturnButtonClick}>Go Home</button>
        </div>
    );
}
