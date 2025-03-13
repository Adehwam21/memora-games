import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { decrementTimer, revealCards } from "../../redux/gameSlice";
import { Card } from "../../game/InterfacesAndClasses/Card";

export default function GuessWhatTimer({ imagesToMemorize }: { imagesToMemorize: Card[] }) {
    const dispatch = useDispatch();
    const timeLeft = useSelector((state: RootState) => state.guessWhat.gameState?.timeLeft);
    const totalTime = useSelector((state: RootState) => state.guessWhat.gameState?.memorizationTime) || 1;

    useEffect(() => {
        if (timeLeft === undefined || timeLeft <= 0) {
            dispatch(revealCards());
            return;
        }

        const interval = setInterval(() => {
            dispatch(decrementTimer());
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, dispatch]);

    // Calculate progress percentage
    const progressPercentage = (timeLeft! / Math.floor(totalTime / 1000)) * 100;

    let progressColor = "bg-green-500"; 
    if (progressPercentage <= 50) progressColor = "bg-yellow-400"; // Change to yellow
    if (progressPercentage <= 20) progressColor = "bg-red-500"; 

    return (
        <div>
            <p className="text-lg font-semibold">Memorization Phase</p>
            <p className="text-lg">You have: {timeLeft}s left</p>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-gray-300 rounded overflow-hidden mt-2">
                <div
                    className={`h-full ${progressColor} transition-all duration-1000`}
                    style={{ 
                        width: `${progressPercentage}%`,
                        transition: "width 1s linear"
                    }}
                ></div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
                {imagesToMemorize.map((card) => (
                    <img key={card.id} src={card.image} alt="Memorize" className="w-16 h-16" />
                ))}
            </div>
        </div>
    );
}
