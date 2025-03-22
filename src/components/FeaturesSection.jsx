import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Descriptions",
      description: "Transform BPMN diagrams into clear, natural language explanations.",
    },
    {
      icon: "⚙️",
      title: "Seamless Workflow Integration",
      description: "Analyze and enhance your workflows effortlessly.",
    },
    {
      icon: "📂",
      title: "Quick XML Upload",
      description: "Upload BPMN files instantly for immediate insights.",
    },
    {
      icon: "💬",
      title: "Context-Aware Chat",
      description: "Interact with our AI to get answers tailored to your processes.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-100 text-center">
      {/* Heading and Subheading */}
      <div className="max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Our Features</h2>
        <p className="text-gray-600 mt-2">
          Discover how BPMNGenie can simplify and transform your business process management.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="text-5xl mb-6">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 mt-4">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* View All Features Button */}
      {/* <div className="mt-12">
        <button className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300">
          View All Features
        </button>
      </div> */}
    </section>
  );
};

export default FeaturesSection;
