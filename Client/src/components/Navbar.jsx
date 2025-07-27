import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Handle logout and redirect to home
  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false); // Close mobile menu
  };

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">Vyapaar Mandal</Link>

      {/* Desktop Nav */}
      <div className="space-x-4 hidden md:flex">
        <Link to="/" className="nav-link text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/about" className="nav-link text-gray-700 hover:text-blue-500">About</Link>
        <Link to="/complaint" className="nav-link text-gray-700 hover:text-blue-500">Complaint</Link>
        <Link to="/contact" className="nav-link text-gray-700 hover:text-blue-500">Contact</Link>

        {user ? (
          <button onClick={handleLogout} className="nav-link text-gray-700 hover:text-blue-500">Logout</button>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 border rounded text-sm text-gray-700 hover:bg-blue-50">Login</Link>
            <Link to="/register" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Icon */}
      <div className="md:hidden flex items-center">
        <button
          ref={buttonRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-2xl text-blue-600"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out z-40 ${menuOpen ? 'block' : 'hidden'}`}
      >
        <div className="space-y-4 py-4 px-6">
          <Link to="/" className="block text-gray-700 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-500" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/complaint" className="block text-gray-700 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Complaint</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Contact</Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-gray-700 hover:text-blue-500"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block text-gray-700 hover:bg-blue-50 py-2" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block text-gray-700 hover:bg-blue-50 py-2" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>

      {/* User Dropdown */}
      {user && (
        <div className="hidden md:flex items-center space-x-4">
          <Link to={'/profile'}><FaUserCircle className="text-2xl text-blue-600" /></Link>
          <div className="relative group cursor-pointer">
            <div className="absolute right-0 top-8 bg-white shadow-md rounded hidden group-hover:block">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
