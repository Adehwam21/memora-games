import React from 'react';
import Card from '../../compnents/Card';

export interface IGame {
  title: string;
  gametype: string;
  coverPhoto: string;
  description: string;
  stars?: number;
}

interface IGames {
  games: IGame[];
}

const Games: React.FC<IGames> = ({ games }) => {
  return (
    <main>
      <div className='p-5 pt-10'>
        <h1 className='text-3xl font-poppins font-bold'>Browse our collection of Games</h1>
        <p className='mt-4 text-gray-600'>Feel free to play any game of your choice</p>
      </div>

      <div className="flex flex-wrap gap-4 p-5 justify-start">
        {games?.map((game, index) => (
          <div key={index} className="w-[240px] h-[240px] sm:w-[200px] lg:w-[200px]">
            <Card game={game} />
          </div>
        ))}
      </div>

    </main>
  );
};

export default Games;
