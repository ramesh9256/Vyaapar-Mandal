import React, { useEffect, useState, useContext } from 'react';
import API from '../utils/axios';
import { AuthContext } from '../context/AuthContext';

const Announcements = () => {
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ title: '', content: '' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await API.get('/announcements');
        setAnnouncements(res.data);
      } catch (err) {
        console.error('Failed to fetch announcements', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    setSubmitLoading(true);
    setMessage('');
    try {
      const res = await API.post('/announcements/create', form);
      setAnnouncements(prev => [res.data.announcement, ...prev]);
      setForm({ title: '', content: '' });
      setMessage('Announcement created successfully');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to create announcement');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="text-center py-6">Loading announcements...</div>;

  console.log("User object:", user);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Announcements</h1>


      {/* Change this condition based on your actual user object */}
      {(user?.isAdmin || user?.role === 'admin') && (
        <div className="mb-8 p-6 border rounded shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">Create New Announcement</h2>
          {message && <p className="mb-4 text-green-600">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              rows={4}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={submitLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {submitLoading ? 'Creating...' : 'Create Announcement'}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">No announcements found.</p>
        ) : (
          announcements.map(({ _id, title, content, postedBy, createdAt }) => (
            <div key={_id} className="p-6 border rounded shadow bg-white">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700 mb-4">{content}</p>
              <div className="text-sm text-gray-500">
                Posted by {postedBy?.name || 'Unknown'} on {new Date(createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>    
    </div>
  );
};

export default Announcements;
