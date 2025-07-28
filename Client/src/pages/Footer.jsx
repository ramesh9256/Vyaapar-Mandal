import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">व्यापार मंडल</h2>
          <p className="mt-2 text-sm leading-6">
            "एकता में शक्ति" – व्यापारियों का एक संगठित मंच।  
            Local businesses ke liye ek strong support system jo unity aur growth promote karta hai.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="hover:text-white transition-all">🏠 Home</a></li>
            <li><a href="/about" className="hover:text-white transition-all">ℹ️ About Us</a></li>
            <li><a href="/member" className="hover:text-white transition-all">👥 Members</a></li>
            <li><a href="/contact" className="hover:text-white transition-all">📞 Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact Info</h3>
          <div className="mt-3 space-y-2 text-sm">
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Sikar, Rajasthan, India</p>
            <p className="flex items-center gap-2"><FaPhoneAlt /> +91-9876543210</p>
            <p className="flex items-center gap-2"><FaEnvelope /> vyapaar@mandal.org</p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
          <p className="text-sm mt-2 mb-3">Subscribe to get latest updates & news.</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Vyapaar Mandal. All Rights Reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition-all text-lg"><FaFacebookF /></a>
          <a href="#" className="hover:text-white transition-all text-lg"><FaInstagram /></a>
          <a href="#" className="hover:text-white transition-all text-lg"><FaTwitter /></a>
          <a href="mailto:vyapaar@mandal.org" className="hover:text-white transition-all text-lg"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
