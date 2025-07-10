import React from 'react';
import Card from '../../compnents/Card';
import { User } from '../../redux/slices/auth-slice/authSlice';

export interface IGame {
  title: string;
  gametype: string;
  coverPhoto: string;
  description: string;
  stars?: number;
}

interface IGames {
  games: IGame[];
  user: User;
}


const Games: React.FC<IGames> = ({ games, user }) => {
  const isProfileComplete = user.age && user.educationLevel

  return (
    <main>
      {!isProfileComplete && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-10 border border-yellow-300 ">
          <p className="flex flex-col text-md p-3 font-medium">
            ⚠️ Your profile is incomplete. Please complete your profile to improve the accuracy of your MMSE scores.
            <a href="/dashboard/settings" className="underline text-yellow-900 hover:text-yellow-700">
              Click here to complete it.
            </a>
          </p>
        </div>
      )}
      <div className='p-5 pt-10'>
        <h1 className='text-3xl text-green-800  font-poppins font-bold'>Games</h1>
        <p className='mt-4 text-gray-600'>Browse our collection of Games</p>
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
