import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { decrementTimer, revealCards, setLevelStartTime } from "../../redux/gameSlice";
import { motion } from "framer-motion";
import { Card } from "../../game/InterfacesAndClasses/Card";

export default function GuessWhatTimer({ imagesToMemorize }: { imagesToMemorize: Card[] }) {
    const dispatch = useDispatch();
    const timeLeft = useSelector((state: RootState) => state.guessWhat.gameState?.timeLeft);
    const totalTime = useSelector((state: RootState) => state.guessWhat.gameState?.memorizationTime) || 1;

    useEffect(() => {
        if (timeLeft === undefined || timeLeft < 0) return; // Prevent unnecessary calls

        if (timeLeft === 0) {
            const startTime = Date.now();

            dispatch(setLevelStartTime(startTime));
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
            {/* Progress Bar */}
            <div className="w-full h-10 bg-gray-300 rounded overflow-hidden mt-4 relative">
                {/* Progress fill */}
                <div
                    className={`h-full ${progressColor} transition-all duration-1000`}
                    style={{ 
                        width: `${progressPercentage}%`,
                        transition: "width 1s linear"
                    }}
                ></div>
    
                {/* Static time text */}
                <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-lg">
                    {timeLeft}s
                </span>
            </div>

            <p className="flex justify-center items-center text-lg my-6 font-semibold">Memorize these images and their positions</p>
    
            <div className="grid grid-cols-3 gap-10 mt-3">
                {imagesToMemorize.map((card) => (
                    <div key={card.id} className="bg-white rounded-lg p-5 shadow flex justify-center items-center text-center">
                        <motion.img
                            src={card.image}
                            alt="Card"
                            className="w-16 h-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
