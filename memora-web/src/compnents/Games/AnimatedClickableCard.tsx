import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { playSound } from "../../utils/sound";

interface CardProps {
    index: number;
    id: number;
    image: string;
    matched: boolean;
    onClick: () => void;
}

const Card = ({ index, id, image, matched, onClick }: CardProps) => {
    const [wasMatched, setWasMatched] = useState(false);

    const handleClick = () => {
        if (!matched) {
            onClick();
        }
    };

    // Detect when the card becomes matched
    useEffect(() => {
        if (matched && !wasMatched) {
            playSound("/sounds/correct.mp3");
            setWasMatched(true); // Prevent playing sound multiple times
        }
    }, [matched, wasMatched]);

    return (
        <motion.div
            key={id}
            className={`p-6 border rounded-lg flex justify-center items-center text-center text-5xl text-white font-bold 
                ${matched ? "bg-green-400 pointer-events-none opacity-50" : "bg-blue-400"}`}
            onClick={handleClick}
            initial={{ scale: 1 }}
            animate={{
                scale: matched ? 1.1 : 1,
                opacity: matched ? 0.8 : 1,
                rotateY: matched ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
        >
            {matched ? (
                <motion.img
                    src={image}
                    alt="Card"
                    className="w-12 h-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            ) : (
                `${index + 1}`
            )}
        </motion.div>
    );
};

export default Card;
