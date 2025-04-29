/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/auth-slice/authSlice';
import API from '../../config/axiosConfig';
import { FormProps, LoginFormData } from '../../types/props';

const Login: React.FC<FormProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await API.post('/auth/login', formData);

      if (response.status === 200) {
        const { token, user, message } = response.data;
        toast.success(message);

        // Store token in local storage (for persistence)
        localStorage.setItem('token', token);

        // Dispatch Redux action
        dispatch(loginSuccess({ token, user }));

        setTimeout(() => navigate('/dashboard/home'), 1000);
        setFormData({ username: '', password: '' });
      }
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed.'));
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="text-black p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogIn}>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full px-3 py-2 rounded-lg bg-transparent border border-black focus:border-gold focus:outline-none"
            required
          />
        </div>
        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg bg-transparent border border-black focus:border-gold focus:outline-none"
            required
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <MdVisibilityOff className="text-gold" /> : <MdVisibility className="text-gold" />}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-800 py-2 text-white rounded-lg transition-all duration-200"
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
