import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from '../../config/axiosConfig';

import MetricsTable from '../../compnents/Games/MetricsTable';

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
    createdAt: string;
    updatedAt: string; 
    __v: number;
}


export const PerformancePage: React.FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const [session, setSession] = useState<IGameSession | null>(null);

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await API.get(`/game/game-session/${sessionId}`)
                if (response.status === 200){
                    console.log("GameSession", response.data)
                    setSession(response.data!.gameSession);
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
            }
        };

        if (sessionId) fetchSessionData();
    }, [sessionId]);

    if (!session) return <p>Loading session data...</p>;

    return (
        <div className='p-10'>
            <MetricsTable metrics={session.metrics}/>
            {/* <div className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
                <h1 className="text-xl font-bold mb-4">Game Session Performance</h1>
                <p className="text-lg font-semibold">Session ID: {session._id}</p>
                <p className="text-md">Accuracy: {session.accuracy}%</p>
                <p className="text-md">Total Errors: {session.totalErrors}</p>
                <p className="text-md">Total Response Time: {session.totalResponseTime} sec</p>
                <p className="text-md">Attempts: {session.attempts}</p>
                <p className="text-md">Final Level Reached: {session.level}</p>
            </div> */}
        </div>
    );
}
