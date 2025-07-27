import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import API from '../utils/axios' // Make sure this path is correct

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.message) {
      toast.error("Name and message are required!")
      return
    }

    setLoading(true)

    try {
      const res = await API.post('/contact/send', formData)
      toast.success('Message sent successfully!')
      setFormData({ name: '', email: '', phone: '', message: '' })

      // Scroll to top after submit
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      toast.error('Failed to send message.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
          संपर्क करें / Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Vyapaar Mandal से जुड़ने के लिए या कोई भी सुझाव देने के लिए नीचे फॉर्म भरें।
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700">नाम / Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition focus:scale-[1.01]"
            />
          </div>
          <div>
            <label className="block text-gray-700">ईमेल / Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition focus:scale-[1.01]"
            />
          </div>
          <div>
            <label className="block text-gray-700">फोन / Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition focus:scale-[1.01]"
            />
          </div>
          <div>
            <label className="block text-gray-700">संदेश / Message</label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition focus:scale-[1.01]"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white px-6 py-2 rounded-md font-medium shadow transition ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {loading ? 'Sending...' : '📩 Send Message'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default Contact
