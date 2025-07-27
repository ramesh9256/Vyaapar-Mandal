import React, { useState, useEffect } from 'react';
import API from '../utils/axios';
import Cookies from 'js-cookie';

const Member = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const token = Cookies.get('token');
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchAll = async () => {
      try {
        if (token) {
          const userRes = await API.get('/auth/me');
          setUser(userRes.data);
        }

        const membersRes = await API.get('/members');
        setMembers(membersRes.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token]);

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await API.put(`/members/${id}`, updatedData);
      setMembers(members.map((m) => (m._id === id ? res.data.updated : m)));
      alert('Member updated successfully');
    } catch (err) {
      setError('Error updating member');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/members/${id}`);
      setMembers(members.filter((m) => m._id !== id));
      alert('Member deleted successfully');
    } catch (err) {
      setError('Error deleting member');
    }
  };

  // 💡 If still loading
  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  // ❌ If not logged in, show login card
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to log in to access the member management panel.</p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Login Now
          </a>
        </div>
      </div>
    );
  }

  // ✅ Main member panel if token is valid
  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">Member Management</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Name</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Email</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Role</th>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-700">{member.name}</td>
                <td className="px-6 py-4 text-gray-700">{member.email}</td>
                <td className="px-6 py-4 text-gray-700">{member.role}</td>
                <td className="px-6 py-4">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✏️ Edit Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Update Member: {selectedMember.name}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedMember._id, {
                  name: e.target.name.value,
                  email: e.target.email.value,
                  role: e.target.role.value,
                });
                setSelectedMember(null);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  defaultValue={selectedMember.name}
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue={selectedMember.email}
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  defaultValue={selectedMember.role}
                  name="role"
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Update Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
