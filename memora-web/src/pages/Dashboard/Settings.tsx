import React, { useState } from 'react';
import { updateUserSuccess, User } from '../../redux/slices/auth-slice/authSlice';
import API from '../../config/axiosConfig';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useAppDispatch } from '../../redux/store';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const dispatch = useAppDispatch()
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    age: user.age || '',
    gender: user.gender || '',
    educationLevel: user.educationLevel || '',
    smokingStatus: user.smokingStatus || false,
    drinkingStatus: user.drinkingStatus || false,
    currentPassword: '',
    newPassword: '',
  });

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

    const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        age: formData.age,
        gender: formData.gender,
        educationLevel: formData.educationLevel,
        smokingStatus: formData.smokingStatus,
        drinkingStatus: formData.drinkingStatus,
      };

      const res = await API.put(`/users/profile`, payload);
      if (res.status === 200) {
        const {user}= res.data
        dispatch(updateUserSuccess({user}));
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error(err);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.put(`/auth/users/change-password/${user.userId}`, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (res.status === 200) {
        toast.success("Password changed successfully!");
        setFormData((prev) => ({ ...prev, currentPassword: '', newPassword: '' }));
      }
    } catch (err) {
      toast.error("Failed to change password.");
      console.error(err);
    }
  };

  return (
    <div className="p-5 pt-10">
      <h1 className="text-3xl font-bold font-poppins mb-2">Settings</h1>
      <p className="text-gray-600 mb-6">View or update your profile.</p>

      {/* Profile Info */}
      <section className="bg-white p-6 rounded-lg shadow mb-6 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input type="text" value={user.username} disabled className="w-full p-2 border rounded bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={user.email} disabled className="w-full p-2 border rounded bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm mb-1">Enter your age</label>
            <input
              type="number"
              name="age"
              min={8}
              value={formData.age}
              onChange={handleChange}
              disabled={!!user.age}
              className="w-full p-2 border rounded"
              placeholder="e.g.65"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={!!user.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Education Level</label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Level</option>
              <option value="none">None</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="postsecondary">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
          </div>

          <div className="flex flex-col ml-1 gap-4">
            <label className="flex items-center gap-2">
              <input className="w-4 h-4 transform scale-150 border-2 border-gray-400 rounded-sm" type="checkbox" name="smokingStatus" checked={formData.smokingStatus} onChange={handleChange} />
              <span>Smoker </span>
            </label>
            <label className="flex items-center gap-2">
              <input className="w-4 h-4 transform scale-150 border-2 border-gray-400 rounded-sm" type="checkbox" name="drinkingStatus" checked={formData.drinkingStatus} onChange={handleChange} />
              <span>Drinks Alcohol</span>
            </label>
          </div>

          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
            Update Profile
          </button>
        </form>
      </section>

      {/* Password Update */}
      <section className="bg-white p-6 max-w-3xl rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className='relative'>
            <label className="block text-sm mb-1">Current Password</label>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              />
              <span
                className="absolute top-9 right-3 cursor-pointer"
                onClick={toggleCurrentPasswordVisibility}
                >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

          <div className='relative'>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              />
              <span
                className="absolute top-9 right-3 cursor-pointer"
                onClick={toggleNewPasswordVisibility}
                >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
          </div>
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
            Change Password
          </button>
        </form>
      </section>
    </div>
  );
};

export default Settings;
