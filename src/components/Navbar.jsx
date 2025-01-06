import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserImage from '../assets/images/user_image.jpg';

const Navbar = () => {
  // Check if the user is logged in from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On component mount, check localStorage for user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  // Logout function to clear localStorage and set login state to false
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-6 py-4 fixed w-full top-0 left-0 z-10 mb-20">
      <Link to="/" className="text-2xl font-bold">
        BPMNGenie
      </Link>
      
      <div className="flex items-center space-x-6">
        {/* Home Button */}
        <Link to="/" className="text-lg hover:text-gray-400 transition">Home</Link>
        
        {/* Chat Button */}
        <Link to="/chatspage" className="text-lg hover:text-gray-400 transition">Chats</Link>
        
        {/* Account Image or Login Button */}
        {isLoggedIn ? (
          <>
            <img
              src={UserImage}
              alt="Account"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-lg hover:text-gray-400 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-lg hover:text-gray-400 transition">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
