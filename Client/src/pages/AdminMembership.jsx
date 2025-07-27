import React, { useEffect, useState } from 'react';
import API from '../utils/axios';

const AdminMembership = () => {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await API.get('/membership/all');
        setApps(res.data);
      } catch {
        setError('Failed to fetch applications');
      }
    }
    fetchApps();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/membership/${id}`, { status });
      setApps(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    } catch {
      alert('Error updating status');
    }
  };

  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Membership Applications</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {['Name','Email','Phone','Address','Business','Applied At','Status','Action'].map(h => (
                <th key={h} className="px-4 py-2 text-left text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app._id} className="border-b">
                <td className="px-4 py-2">{app.name}</td>
                <td className="px-4 py-2">{app.email}</td>
                <td className="px-4 py-2">{app.phone}</td>
                <td className="px-4 py-2">{app.address}</td>
                <td className="px-4 py-2">{app.businessName || '-'}</td>
                <td className="px-4 py-2">{new Date(app.appliedAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white ${
                    app.status === 'Pending' ? 'bg-yellow-500' :
                    app.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'
                  }`}>{app.status}</span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  {app.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(app._id, 'Approved')}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(app._id, 'Rejected')}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMembership;
