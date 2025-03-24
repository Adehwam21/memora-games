import { motion } from "framer-motion";
import { useState } from "react";
import { playSound } from "../../utils/sound";
import { selectCardThunk } from "../../redux/thunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface CardProps {
    index: number;
    id: number;
    image: string;
    matched: boolean;
}

const Card = ({ index, id, image, matched }: CardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [wrongSelection, setWrongSelection] = useState(false);

    const handleClick = async () => {
        if (!matched && !wrongSelection) {
            try {
                const isMatch: boolean = await dispatch(selectCardThunk(id)).unwrap();

                if (isMatch) {
                    playSound("/sounds/correct.mp3");
                } else {
                    playSound("/sounds/wrong.mp3");
                    setWrongSelection(true);
                }
            } catch (error) {
                console.error("Error selecting card:", error);
            }
        }
    };

    return (
        <motion.div
            className={`p-6 border rounded-lg flex justify-center items-center text-center text-5xl text-white font-bold transition-colors ${
                matched
                    ? "bg-green-400 pointer-events-none opacity-50"
                    : wrongSelection
                    ? "bg-red-500"
                    : "bg-blue-400"
            }`}
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
                    className="w-16 h-16"
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
