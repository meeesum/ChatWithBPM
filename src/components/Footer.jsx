import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        {/* Left side - Logo or Text */}
        <div className="text-lg">
          <span>&copy; {new Date().getFullYear()} BPMNGenie. All rights reserved.</span>
        </div>

        {/* Right side - Links */}
        <div className="flex space-x-6">
          <a href="/privacy-policy" className="hover:text-gray-400 transition">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-gray-400 transition">Terms of Service</a>
          <a href="/contact" className="hover:text-gray-400 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
