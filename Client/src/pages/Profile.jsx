import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import Cookies from 'js-cookie';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        console.error('failed to fetch profile', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {user ? (
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-6xl text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>

            <div className="w-full space-y-3">
              <button
                onClick={() => navigate('/edit-profile')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">User data not found</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
