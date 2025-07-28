// src/pages/VerifyOTP.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const VerifyOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      const res = await API.post('/auth/reset-password',{ withCredentials: true }, {
        email: state?.email,
        otp,
        newPassword,
      });
      setMsg(res.data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP or something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl text-center text-pink-600 font-bold mb-4">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-3 border rounded-lg text-sm"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 border rounded-lg text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-medium py-2 rounded-lg"
          >
            Reset Password
          </button>
        </form>
        {msg && <p className="text-green-600 text-sm mt-4">{msg}</p>}
        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyOTP;
