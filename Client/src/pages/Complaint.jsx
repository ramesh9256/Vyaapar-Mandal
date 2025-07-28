import React, { useState, useEffect, useContext } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Complaint = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post('/complaints', { subject, description }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (response.status === 201) {
        alert('Complaint filed successfully');
        setSubject('');
        setDescription('');
      }
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        if (error.response.status === 401) {
          alert('Unauthorized: Please log in');
        } else if (error.response.status === 400) {
          alert('Bad Request: ' + error.response.data.msg);
        } else {
          alert('Error filing complaint: ' + error.response.data.msg);
        }
      } else {
        alert('Error filing complaint: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get('/complaints');
        setComplaints(res.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      const res = await API.put(`/complaints/${complaintId}/status`, { status: newStatus });
      if (res.status === 200) {
        alert('Complaint status updated');
        setComplaints(prev => prev.map(complaint =>
          complaint._id === complaintId ? { ...complaint, status: newStatus } : complaint
        ));
      }
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Complaint Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl mb-12"
      >
        <h2 className="text-2xl font-bold text-center mb-6">📝 File a Complaint</h2>
        <form onSubmit={handleSubmitComplaint}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </motion.div>

      {/* Complaints Table (Admin View) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">📋 All Complaints</h2>
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-6 py-2 text-left font-medium text-gray-600">Subject</th>
                <th className="px-6 py-2 text-left font-medium text-gray-600">Filed By</th>
                <th className="px-6 py-2 text-left font-medium text-gray-600">Status</th>
                <th className="px-6 py-2 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <motion.tr
                  key={complaint._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-2">{complaint.subject}</td>
                  <td className="px-6 py-2">
                    {complaint.filedBy ? complaint.filedBy.name : 'Unknown'}
                  </td>
                  <td className="px-6 py-2">
                    <span
                      className={`px-2 py-1 rounded-md text-white text-xs font-semibold ${
                        complaint.status === 'Pending'
                          ? 'bg-yellow-500'
                          : complaint.status === 'In Progress'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    {user && user.role === 'admin' && complaint.status !== 'Resolved' && (
                      <button
                        onClick={() => handleStatusChange(complaint._id, 'Resolved')}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-transform transform hover:scale-105"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Complaint;
