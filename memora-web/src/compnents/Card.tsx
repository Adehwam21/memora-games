import React from 'react'
import { IGame } from '../pages/Dashboard/Games'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

interface CardProps {
  game: IGame
}

const Card: React.FC<CardProps> = ({ game: { title, gametype, description, coverPhoto } }) => {
  const navigate = useNavigate()

  // Format Guess What game title
  const formatedTitle = title.trim().replace(" ", "-")
  const handlePlayGame = () => {
    navigate(`/lobby/${formatedTitle.toLowerCase()}`)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col rounded-lg w-full max-w-[15rem] bg-base-100 shadow-lg overflow-hidden"
    >
      <figure>
        <img
          src={`/images/${coverPhoto}`}
          alt={title}
          className="h-24 w-full object-cover"
        />
      </figure>
      <div className="card-body p-3 text-left">
        <p className="text-sm text-gray-500 p-0 font-bold">{gametype.toUpperCase()}</p>
        <h2 className="card-title font-bold">{title}</h2>
        <p className="line-clamp-3 text-sm text-gray-600">{description}</p>
        <div className="card-actions flex-row mt-2">
          <button 
            onClick={handlePlayGame}
            className="btn border-none text-white font-bold text-lg bg-green-500 hover:bg-green-400 w-full"
          >
            Play
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Card;
