import React, { useState, useEffect, useContext } from 'react';
import API from '../utils/axios';  // Adjust based on your axios instance
import { useNavigate } from 'react-router-dom';  // Updated import
import { AuthContext } from '../context/AuthContext';  // Assuming user context exists

const Complaint = () => {
  // State for creating a complaint
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // For redirect after successful complaint submission
  const navigate = useNavigate();  // Updated to useNavigate

  // Access user data from context
  const { user } = useContext(AuthContext);  // Assuming you are storing user data in AuthContext

  // Handle complaint creation
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
      // Log the error to get more info
      console.error("Error details:", error);

      if (error.response) {
        // Check if it's a 400 or 401 error
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

  // Fetch all complaints (Admin view)
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

  // Handle status update (Admin only)
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

      {/* Complaint Filing Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">File a Complaint</h2>
        <form onSubmit={handleSubmitComplaint}>
          <div className="mb-4">
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>

      {/* Admin Complaint List */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">All Complaints</h2>
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-2 text-left">Subject</th>
                <th className="px-6 py-2 text-left">Filed By</th>
                <th className="px-6 py-2 text-left">Status</th>
                <th className="px-6 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id} className="border-b">
                  <td className="px-6 py-2">{complaint.subject}</td>
                  {/* Check if filedBy is null or undefined before accessing its name */}
                  <td className="px-6 py-2">
                    {complaint.filedBy ? complaint.filedBy.name : 'Unknown'}  {/* Fallback value */}
                  </td>
                  <td className="px-6 py-2">
                    <span
                      className={`px-2 py-1 rounded-md text-white ${complaint.status === 'Pending' ? 'bg-yellow-500' :
                          complaint.status === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-2">
                    {/* Only show "Mark as Resolved" button if user is an admin */}
                    {user && user.role === 'admin' && complaint.status !== 'Resolved' && (
                      <button
                        onClick={() => handleStatusChange(complaint._id, 'Resolved')}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Complaint;
