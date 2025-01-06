import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import { FaSearch } from 'react-icons/fa'; // Import Font Awesome search icon

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Dummy data for chats
  const dummyChats = [
    { id: 1, name: 'Retail Store BPMN' },
    { id: 2, name: 'Healthcare Workflow BPMN' },
    { id: 3, name: 'E-commerce Fulfillment BPMN' },
  ];

  const dummyMessages = {
    1: [
      { role: 'user', content: 'Uploaded a BPMN for a retail store.' },
      {
        role: 'ai',
        content:
          'The BPMN describes a retail store’s checkout process. Customers select items, proceed to payment, and receive receipts. Do you have any questions regarding this process?',
      },
    ],
    2: [
      { role: 'user', content: 'Uploaded a BPMN for a healthcare workflow.' },
      {
        role: 'ai',
        content:
          'This BPMN describes patient admission, consultation, and discharge processes in a healthcare facility. Feel free to ask any questions!',
      },
    ],
    3: [
      { role: 'user', content: 'Uploaded a BPMN for e-commerce fulfillment.' },
      {
        role: 'ai',
        content:
          'The BPMN outlines the order placement, packaging, shipping, and delivery processes in an e-commerce setup. Is there anything specific you would like to know?',
      },
    ],
  };

  useEffect(() => {
    // Load dummy chats and select the first chat by default
    setChats(dummyChats);
    if (dummyChats.length > 0) {
      setSelectedChatId(dummyChats[0].id);
    }
  }, []);

  useEffect(() => {
    // Load dummy messages for the selected chat
    if (selectedChatId) {
      setMessages(dummyMessages[selectedChatId] || []);
    }
  }, [selectedChatId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Simulate sending a user message and receiving an AI response
    const newUserMessage = { role: 'user', content: newMessage };
    const aiResponse = {
      role: 'ai',
      content: `AI response to: "${newMessage}" (Simulated response)`,
    };

    setMessages((prev) => [...prev, newUserMessage, aiResponse]);
    setNewMessage(""); // Clear input after sending message
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate user uploading an XML file and AI responding
      const newUserMessage = {
        role: 'user',
        content: `Uploaded file: ${file.name}`,
      };
      const aiResponse = {
        role: 'ai',
        content: `The AI has processed the uploaded BPMN file (${file.name}) and generated a natural language description. Do you have any questions regarding the workflow?`,
      };

      setMessages((prev) => [...prev, newUserMessage, aiResponse]);
    }
  };

  const handleNewChat = () => {
    const newChat = { id: Date.now(), name: 'New Chat' };
    setChats((prevChats) => [newChat, ...prevChats]);
    setSelectedChatId(newChat.id);
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter chats based on search term

  return (
    <div className="flex h-screen w-full">
      {/* Chat List - Fixed width with no padding or margin from the left */}
      <div className="w-[320px] bg-gray-50 border-r pl-0 ml-0">
        {/* Search Bar */}
        <div className="p-4">
          <div className="flex items-center w-full border border-gray-300 rounded-md">
            <FaSearch className="ml-2 text-gray-500" /> {/* Magnifying glass icon */}
            <input
              type="text"
              placeholder="Search Chats"
              className="w-full p-2 pl-8 border-0 rounded-md focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
            />
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full px-4 py-2 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600"
          >
            New Chat
          </button>
        </div>

        <ChatList
          chats={filteredChats} // Use filtered chats
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />
      </div>

      {/* Chat Area with no flex-grow */}
      <div className="w-full max-w-[calc(100%-320px)] p-6 bg-white">
        {selectedChatId ? (
          <>
            <Chat messages={messages} />
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow border border-gray-300 p-2 rounded-md"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newMessage.trim()) {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Send
              </button>
              <div className="ml-4">
                <input
                  type="file"
                  accept=".xml"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Upload XML
                </label>
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-500 flex items-center justify-center h-full">
            Select or create a chat to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
