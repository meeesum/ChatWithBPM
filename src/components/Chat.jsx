import React, { useEffect, useRef } from "react";

const Chat = ({ messages }) => {
  const chatEndRef = useRef(null);

  // Scroll to the latest message when messages update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto px-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (

            <div>
            <div key={index} className={`mb-3 flex  justify-end`}>
              <p
                className={`inline-block max-w-[80%] p-3 rounded-lg shadow-md bg-blue-500 text-white `}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              >
                
              </p>
            </div>

            <div key={index} className={`mb-3 flex justify-start`}>
              <p
                className={`inline-block max-w-[80%] p-3 rounded-lg shadow-md bg-gray-200 text-gray-800`}
                dangerouslySetInnerHTML={{ __html: msg.response }}
              >
              
              </p>
            </div>
            </div>

          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">No messages yet. Send a message to start the conversation.</div>
        )}
        {/* Invisible div to maintain scroll position */}
        <div ref={chatEndRef}></div>
      </div>
    </div>
  );
};

export default Chat;
