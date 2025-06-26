
import { User } from '../../redux/slices/auth-slice/authSlice';

export interface IGameSession {
  _id: string;
  userId: string;
  ssid: string;
  metrics?: [];
  sessionDate: string;
  gameTitle: string;
  totalScore: number;
  mmseScore: number;
  updatedAt: Date;
}

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {

  return (
    <div className="p-5 pt-10 flex flex-col">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {user.username}! 👋</h1>
        <p className="text-gray-500 mt-2">Here's a quick overview of your progress.</p>
      </div>
    </div>
  );
};

export default Home;
