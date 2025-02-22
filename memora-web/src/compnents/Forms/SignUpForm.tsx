import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FormProps } from '../../types/props';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const SignUp: React.FC<FormProps> = () => {
  const API_BASE_URL = import.meta.env.VITE_SERVER_URL;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<{ confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!strongPasswordRegex.test(formData.password)) {
      setFormErrors({
        confirmPassword: "Password must be at least 6 characters long and include at least one letter, one number, and one special character.",
      });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormErrors({ confirmPassword: "Passwords do not match" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, formData);
      console.log(response);

      response.status == 201 ? toast.success(response.data!.message) : toast.error(response.data!.message);
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("The email or username is already registered.");
      } else {
        toast.error("An error occurred. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
          className="w-full p-2 text-black rounded-lg border border-gray-700 focus:outline-none focus:border-black"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="w-full p-2 text-black rounded-lg border border-gray-700 focus:outline-none focus:border-black"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="w-full p-2 text-black rounded-lg border border-gray-700 focus:outline-none focus:border-black"
          />
          <span className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
            className="w-full p-2 text-black rounded-lg border border-gray-700 focus:outline-none focus:border-black"
          />
        </div>
        {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg ${loading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
