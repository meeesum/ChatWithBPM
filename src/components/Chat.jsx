import React from 'react';

const Chat = ({ messages }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto mb-4 px-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <p
              className={`inline-block max-w-[80%] p-3 rounded-lg shadow-md ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
