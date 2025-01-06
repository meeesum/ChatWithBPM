import React, { useState } from 'react';

const Chat = ({ messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <p
              className={`inline-block p-2 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      {/* <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow border rounded-l-md px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          Send
        </button>
      </form> */}
    </div>
  );
};

export default Chat;
