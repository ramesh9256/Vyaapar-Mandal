// src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');
        try {
            const res = await API.post('/auth/forgot-password', { email });
            setMsg(res.data.message || "OTP sent to your email");
            // Navigate to OTP verify page with email as state
            navigate('/verify-otp', { state: { email } });
        } catch (err) {
            console.log(err.response?.data);
            setError(err.response?.data?.msg || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
            <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl text-center text-pink-600 font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border rounded-lg text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white font-medium py-2 rounded-lg"
                    >
                        Send OTP
                    </button>
                </form>
                {msg && <p className="text-green-600 text-sm mt-4">{msg}</p>}
                {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
