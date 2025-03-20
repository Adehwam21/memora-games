import { motion } from "framer-motion";
import { playSound } from "../../utils/sound";
import { selectCardThunk } from "../../redux/gameSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface CardProps {
    index: number;
    id: number;
    image: string;
    matched: boolean;
}

const Card = ({ index, id, image, matched }: CardProps) => {
    const dispatch = useDispatch<AppDispatch>(); // ✅ Move inside the component
  

    const handleClick = async () => {
        if (!matched) {
            try {
                const isMatch: boolean = await dispatch(selectCardThunk(id)).unwrap();
                playSound(isMatch ? "/sounds/correct.mp3" : "/sounds/wrong.mp3");
            } catch (error) {
                console.error("Error selecting card:", error);
            }
        }
    };

    return (
        <motion.div
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
