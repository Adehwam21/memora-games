import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FormProps, LoginFormData } from '../../types/props';


const Login: React.FC<FormProps> = () => {
  const API_BASE_URL = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, formData);
      
      if (response.status == 200) {
        const { token } = response.data;
        toast.success(response.data!.message)
        localStorage.setItem('token', token);
        setTimeout(() => navigate('/lobby'), 1000);
        setFormData({ username: '', password: '' });
      }
      
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (error: any) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        toast.error(error.response.data.message);
      } else if (status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred on the server. Try again later.');
      }
    } else if (error.request) {
      toast.error('Internal server error. Try again later.');
    } else {
      toast.error('An error occurred. Check your internet connection or try again later.');
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
