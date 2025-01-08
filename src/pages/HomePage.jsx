import React from 'react';
import { Link } from 'react-router-dom';
import FeaturesSection from '../components/FeaturesSection';
import HeroImage from '../assets/images/hero_image.png'; // Correct way to import image
import Navbar from '../components/Navbar';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-12">
        {/* Left Content */}
        <div className="max-w-md text-center md:text-left space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-snug">
            Simplify Your Workflow with AI-Powered Insights
          </h1>
          <p className="text-gray-600">
            Upload your BPMN XML files, and let our AI model provide natural language descriptions 
            and actionable insights for your business processes.
          </p>
          <div className="space-x-4">
            <Link
              to="/chatspage"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
            >
              Get Started
            </Link>
            <Link
              to="/"
              className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="max-w-lg mt-16 mr-10">
        <img
         src={HeroImage}
         alt="Workflow illustration"
         className="w-full rounded-md"
        />

        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose ProcessIQ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-blue-500 mb-4">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Transform complex BPMN XML files into easy-to-understand language with our cutting-edge AI.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-blue-500 mb-4">Context-Aware Queries</h3>
              <p className="text-gray-600">
                Ask questions and get precise answers based on the context of your uploaded models.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-blue-500 mb-4">Save and Manage Chats</h3>
              <p className="text-gray-600">
                Access your previous chats to continue discussions or revisit insights anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection />
    </div>
  );
};

export default Homepage;
