import React, { useState } from 'react';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const ApplyMembership = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', businessName: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/membership/apply', form);
      setMessage(res.data.msg || 'Application submitted!');
      setForm({ name: '', email: '', phone: '', address: '', businessName: '' });
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Membership Application</h2>
        {message && <div className="text-center mb-4 text-green-600">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name','email','phone','address','businessName'].map((key) => (
            <div key={key}>
              <label className="block text-gray-700 capitalize">{key === 'businessName' ? 'Business Name' : key}</label>
              <input
                name={key}
                type={key === 'email' ? 'email' : 'text'}
                value={form[key]}
                onChange={handleChange}
                required={['name', 'email'].includes(key)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyMembership;
