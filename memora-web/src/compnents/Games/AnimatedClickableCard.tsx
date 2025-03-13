import { motion } from "framer-motion";

interface CardProps {
    index: number;
    id: number;
    image: string;
    matched: boolean;
    onClick: () => void;
}

const Card = ({ index, id, image, matched, onClick }: CardProps) => {
    return (
        <motion.div
            key={id}
            className={`p-6 border rounded-lg ${matched ? "bg-green-400" : "bg-gray-200"} ${matched ? "pointer-events-none opacity-50" : ""}`}
            onClick={matched ? undefined : onClick} // Don't trigger onClick if matched
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
