import React from 'react';
import { FaEnvelope, FaKey } from 'react-icons/fa';
import SignUpImage from '..\assets\images\signup_image.jpg'; // Use the correct path for your image
import LogoImage from '..\assets\images\Logo.png';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Card Container with Shadow */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-2xl flex">
        
        {/* Left Side (Image) */}
        <div className="w-2/3 h-full overflow-hidden">
          <img
            src={SignUpImage}
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/3 p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={LogoImage} alt="Logo" className="h-20" />
          </div>

          {/* Sign-Up Form */}
          <form className="space-y-6">
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
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-semibold mb-2 text-left">Confirm Password</label>
              <div className="flex items-center border rounded-md p-2">
                <FaKey className="text-gray-400 mr-3" />
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  className="w-full px-2 py-1 outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Sign Up
            </button>
          </form>

          {/* Or Divider */}
          <div className="relative my-6">
            <hr className="border-t-2 border-gray-300 w-full" />
            <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 px-4 bg-white">or</span>
          </div>

          {/* Social Sign-In */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center text-blue-500 border border-blue-500 py-2 rounded-md hover:bg-blue-100">
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Sign up with Facebook
            </button>
          </div>

          {/* Link to Sign In Page */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
