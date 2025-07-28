import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../utils/axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: 'member',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register',{ withCredentials: true }, formData);
      alert(res.data.msg);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center px-4 md:px-20 py-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-8 select-none">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-5 font-medium select-none">{error}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
