import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import image from '../assets/images.jpeg';
import API from '../utils/axios';
import { AuthContext } from '../context/AuthContext';

const About = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  const aboutData = {
    description: `व्यापार मंडल एक संगठित व्यापारियों का संगठन है, जो व्यापारिक हितों की रक्षा, सामाजिक उत्तरदायित्व और सामुदायिक विकास के लिए प्रतिबद्ध है। हमारा उद्देश्य व्यापारियों को एक साझा मंच प्रदान करना है जिससे वे एकजुट होकर अपने अधिकारों की रक्षा कर सकें और समाज में सकारात्मक योगदान दे सकें।`,
    mission: `व्यापारियों के हितों की रक्षा करना, संगठित प्रयासों के माध्यम से व्यापार में सुधार लाना, और छोटे एवं मध्यम व्यापारों को सहयोग प्रदान करना।`,
    vision: `एक डिजिटल, संगठित और सशक्त व्यापारी समुदाय का निर्माण करना जो आत्मनिर्भर भारत की दिशा में अग्रसर हो।`,
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await API.get('/feedback');
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to fetch feedbacks:', err);
      } finally {
        setLoadingFeedbacks(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setStatus('');
    try {
      const res = await API.post('/feedback', { message });
      setStatus('✅ Feedback sent successfully.');
      setMessage('');
      setFeedbacks(prev => [res.data.newFeedback, ...prev]);
    } catch (err) {
      setStatus('❌ Error sending feedback.');
      console.error('Feedback error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 py-10 px-4 md:px-20">
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-12"
      >
        About Us
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-2xl shadow-xl p-6 md:p-10"
      >
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src={image}
            alt="Vyapaar Mandal"
            className="w-full max-w-md rounded-xl shadow-md border"
          />
        </div>

        {/* Right: Text in Hindi */}
        <div className="space-y-6">
          <p className="text-lg md:text-xl leading-8 text-gray-700 whitespace-pre-line font-serif">
            {aboutData.description}
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">🎯 उद्देश्य</h2>
            <p className="text-base leading-relaxed font-serif">{aboutData.mission}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">👁️ दृष्टि</h2>
            <p className="text-base leading-relaxed font-serif">{aboutData.vision}</p>
          </div>
        </div>
      </motion.div>

      {/* Feedbacks Display */}
      <div className="max-w-3xl mx-auto mt-12">
        <h3 className="text-3xl font-semibold mb-6 text-center text-blue-700">Received Feedbacks</h3>
        {loadingFeedbacks ? (
          <p className="text-center text-gray-500">Loading feedbacks...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No feedback found.</p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="mb-5 p-5 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-800 mb-3 leading-relaxed">{fb.message}</p>
              <div className="text-sm text-gray-500 italic">
                By: <span className="font-medium">{fb.submittedBy?.name || 'Unknown'}</span> |{' '}
                {new Date(fb.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feedback Form */}
      {user && (
        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
            Give us your Feedback 📝
          </h3>
          {status && (
            <div
              className={`mb-4 text-center font-medium ${
                status.startsWith('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status}
            </div>
          )}
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Write your feedback here..."
              className="w-full border rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              {loading ? 'Sending...' : 'Send Feedback'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default About;
