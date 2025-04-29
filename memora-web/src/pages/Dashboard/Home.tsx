import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="p-4 flex flex-col ">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, Aaron! 👋</h1>
        <p className="text-gray-500 mt-2">Here's a quick overview of your progress.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-base-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Games Played</h2>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-base-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Avg. Score</h2>
          <p className="text-3xl font-bold">85%</p>
        </div>
        <div className="bg-base-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Best Performance</h2>
          <p className="text-3xl font-bold">98%</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-md mb-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
        <table className="table w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Date</th>
              <th className="pb-2">Game</th>
              <th className="pb-2">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2">April 24, 2025</td>
              <td className="py-2">Memory Match</td>
              <td className="py-2">92%</td>
            </tr>
            <tr className="border-t">
              <td className="py-2">April 22, 2025</td>
              <td className="py-2">Guess What?</td>
              <td className="py-2">87%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Start Game Button */}
      <div className="flex justify-center">
        <button className="btn text-white bg-green-500 btn-lg">Start New Game</button>
      </div>
    </div>
  )
}

export default Home;
