import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../utils/axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      const { token, user } = res.data;
      login(user, token);
      alert('Login Successful!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-sm sm:max-w-sm md:max-w-md p-5 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-6">Login</h2>

       <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
            />
          </div>

          {/* Forgot Password link */}
          {/* <div className="text-right text-sm">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div> */}

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg text-sm"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-4 text-sm font-medium">{error}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
