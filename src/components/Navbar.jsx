import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import UserImage from '../assets/images/user_image.jpeg';
import LogoImage from '../assets/images/logo.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // State for mobile menu toggle

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-10">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={LogoImage} alt="BPMNGenie Logo" className="w-18 h-14" />
            <span className="text-2xl font-bold">BPMNGenie</span>
          </Link>

          {/* Toggle Button for Mobile */}
          <button
            className="text-white text-2xl lg:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <FaTimes /> : <FaBars />}
          </button>

          {/* Menu Items */}
          <div
            className={`flex-col lg:flex-row lg:static absolute top-full left-0 w-full bg-gray-900 lg:bg-transparent transition-all duration-300 ${
              showMenu ? 'flex' : 'hidden'
            } lg:flex lg:space-x-6 lg:justify-end`} 
          >
            <Link
              to="/"
              className="block px-6 py-4 text-lg hover:text-gray-400 transition"
              onClick={() => setShowMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/chatspage"
              className="block px-6 py-4 text-lg hover:text-gray-400 transition"
              onClick={() => setShowMenu(false)}
            >
              Chats
            </Link>
            {isLoggedIn ? (
              <>
                <img
                  src={UserImage}
                  alt="Account"
                  className="block w-12 h-12 rounded-full cursor-pointer mx-auto lg:mx-0"
                />
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMenu(false);
                  }}
                  className="block px-6 py-4 text-lg hover:text-gray-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-6 py-4 text-lg hover:text-gray-400 transition"
                onClick={() => setShowMenu(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Content Padding */}
      <div className="pt-[60px] lg:pt-[70px]"></div>
    </>
  );
};

export default Navbar;
