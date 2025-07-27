import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">व्यापार मंडल</h2>
          <p className="mt-2 text-sm">
            "एकता में शक्ति" – व्यापारियों का एक संगठित मंच।  
            Local businesses ke liye ek strong support system.
          </p>
        </div>

        {/* Center Section - Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-white">Useful Links</h3>
          <a href="/" className="hover:text-white">🏠 Home</a>
          <a href="/about" className="hover:text-white">ℹ️ About</a>
          <a href="/member" className="hover:text-white">👥 Members</a>
          <a href="/contact" className="hover:text-white">📞 Contact</a>
        </div>

        {/* Right Section - Social */}
        <div>
          <h3 className="text-lg font-semibold text-white">Connect with Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-300 hover:text-white text-xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-300 hover:text-white text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-300 hover:text-white text-xl"><FaTwitter /></a>
            <a href="mailto:vyapaar@mandal.org" className="text-gray-300 hover:text-white text-xl"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Vyapaar Mandal. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
