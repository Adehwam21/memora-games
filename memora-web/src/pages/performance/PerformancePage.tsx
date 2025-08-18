import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import API from '../../config/axiosConfig';
import { GuessWhatMetricsTable } from '../../compnents/Games/GuessWhatGame/components/GuessWhatMetricsTable';
import { StroopMetricsTable } from '../../compnents/Games/StroopGame/components/StroopMetricsTable';
import { FeedbackForm } from '../../compnents/Forms/FeedbackForm';
import { useDispatch } from 'react-redux';
import { forceEndGuessWhatGame } from '../../redux/slices/games-slice/guessWhat';
import { forceEndStroopGame } from '../../redux/slices/games-slice/stroop';
import { Loader } from '../../compnents/Loader';
import { BsArrowLeft } from 'react-icons/bs';
import toast from 'react-hot-toast';


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
    const [showLoader, setShowLoader] = useState(true);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await API.get(`/game-session/${sessionId}`);
                if (response.status === 200) {
                    setSession({...response.data!.gameSession, gameType: response.data?.initConfig?.type});
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
            }
        };

        if (sessionId) fetchSessionData();
    }, [sessionId]);

    const endGameAndGoHome = () => {
        if (!session) return;
        switch (session.gameTitle) {
            case "guess what":
                dispatch(forceEndGuessWhatGame());
                break;
            case "stroop":
                dispatch(forceEndStroopGame());
                break;
            default:
                break;
        }
        navigate("/dashboard/stats");
    };

    const handleReturnButtonClick = () => {
        setShowFeedback(true); // Show feedback form first
    };

    const handleFeedbackSubmit = () => {
        toast.success("Thanks for your feedback!");
        endGameAndGoHome();
    };

    const handleFeedbackSkip = () => {
        endGameAndGoHome();
    };

    const handleMetricTableChoice = (gameTitle: string) => {
        if (!session) return null;
        switch (gameTitle) {
            case "guess what":
                return <GuessWhatMetricsTable 
                    metrics={session.metrics as IGuessWhatMetric[]} 
                    totalScore={session.totalScore}
                    mmseScore={session.mmseScore}
                />;
            case "stroop":
                return <StroopMetricsTable 
                    metrics={session.metrics as IStroopMetric} 
                    totalScore={session.totalScore}
                    mmseScore={session.mmseScore}
                />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    if (showLoader || !session) {
        return <Loader />;
    }

    if (showFeedback && session) {
        return (
            <FeedbackForm
                game={session.gameTitle}
                mmseScore={String(session.mmseScore)}
                onSubmit={handleFeedbackSubmit}
                onSkip={handleFeedbackSkip}
            />
        );
    }

    return (
        <div className='p-10 flex flex-col justify-center items-center'>
            { session && handleMetricTableChoice(session.gameTitle)}

            <button
                className='mt-4 flex flex-row justify-center gap-2 items-center bg-green-700 hover:bg-green-600 text-white font-semibold text-md rounded-md p-3 transition-colors'
                onClick={handleReturnButtonClick}
            >
                <BsArrowLeft style={{fontSize:20}}/> View Detailed Stats
            </button>
        </div>
    );
};
