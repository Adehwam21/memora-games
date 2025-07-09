
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
  const isProfileComplete = user.age && user.educationLevel;

  return (
    <div className="p-5 pt-10 flex flex-col">
      {!isProfileComplete && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-10 border border-yellow-300">
          <p className="flex flex-col text-md p-3 font-medium">
            ⚠️ Your profile is incomplete. Please complete your profile to improve the accuracy of your MMSE scores. {" "}
            <a href="/dashboard/settings" className="underline text-yellow-900 hover:text-yellow-700">
              Click here to complete it.
            </a>
          </p>
        </div>
      )}

      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {user.username}! 👋</h1>
        <p className="text-gray-500 mt-2">Here's a quick overview of your progress.</p>
      </div>
    </div>
  );
};

export default Home;
