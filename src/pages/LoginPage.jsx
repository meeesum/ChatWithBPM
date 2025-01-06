import React, { useState } from 'react';
import { FaEnvelope, FaKey, FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import LogoImage from '..\assets\images\Logo.png';
import DataProtectionImage from '..\assets\images\Data_protection.jpg';

const LoginPage = () => {
  // States for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Dummy login credentials
  const validEmail = 'test@g';
  const validPassword = '12';

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate credentials
    if (email === validEmail && password === validPassword) {
      // Save user data to localStorage to persist login state
      const userData = { username: 'JohnDoe', profileImage: '/path/to/image.jpg' }; // Example user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Successful login, navigate to the ChatPage
      navigate('/chatspage');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden px-4 md:px-12 mt-20">
      <div className="flex w-full max-w-6xl p-8">
        {/* Left Side */}
        <div className="w-full md:w-1/3 p-6 space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={LogoImage} alt="Logo" className="h-20" />
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username/Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-left">Username / Email</label>
              <div className="flex items-center border rounded-md p-2">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  id="email"
                  placeholder="Username / Email"
                  className="w-full px-2 py-1 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-left">Password</label>
              <div className="flex items-center border rounded-md p-2">
                <FaKey className="text-gray-400 mr-3" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-2 py-1 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Remember Me */}
            <div className="flex items-center text-sm">
              <input type="checkbox" id="remember" className="mr-2 w-5 h-5" />
              <label htmlFor="remember" className="ml-2 text-sm">Remember me</label>
            </div>

            {/* Save my login info text */}
            <div className="text-sm text-gray-500 ml-7 mt-2">
              <label htmlFor="save-info" className="ml-2">Save my login info for the next time</label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </form>

          {/* Don't have an account? Sign up Button */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Or Divider */}
          <div className="relative my-6">
            <hr className="border-t-2 border-gray-300 w-full" />
            <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 px-4 bg-white">or</span>
            <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent h-1" />
          </div>

          {/* Social Sign-In */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center text-blue-500 border border-blue-500 py-2 rounded-md hover:bg-blue-100">
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
            <button className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              <FaFacebook className="mr-2" />
              Sign in with Facebook
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-2/3 pl-6 flex flex-col items-center">
          <h2 className="text-5xl font-semibold text-gray-800 mb-2 text-center">
            Securely Upload Your Document and Get Instant Feedback!
          </h2>
          <img src={DataProtectionImage} className="w-full h-full max-w-lg mx-auto" alt="Data Protection" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
