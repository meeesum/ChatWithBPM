import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import { FaSearch, FaBars } from 'react-icons/fa';

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showChatList, setShowChatList] = useState(false);

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
    setChats(dummyChats);
    if (dummyChats.length > 0) {
      setSelectedChatId(dummyChats[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      setMessages(dummyMessages[selectedChatId] || []);
    }
  }, [selectedChatId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newUserMessage = { role: 'user', content: newMessage };
    const aiResponse = {
      role: 'ai',
      content: `AI response to: "${newMessage}" (Simulated response)`,
    };

    setMessages((prev) => [...prev, newUserMessage, aiResponse]);
    setNewMessage('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
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
    setShowChatList(false); // Close chat list on new chat creation (mobile)
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Navbar */}
      <div className="h-[60px] bg-blue-500 text-white flex items-center px-4 mt-6 lg:hidden">
        <button
          className="p-2 bg-white text-blue-500 rounded-md"
          onClick={() => setShowChatList(!showChatList)}
        >
          <FaBars />
        </button>
        <h1 className="ml-4 text-xl font-bold">Chat Application</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow lg:flex-row flex-col">
        {/* Chat List Sidebar */}
        <div
          className={`fixed top-[60px] left-0 h-full w-[320px] bg-gray-50 border-r shadow-lg transform ${
            showChatList ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 lg:static lg:translate-x-0 lg:w-[320px] lg:block mt-5 hidden`}
        >
          <div className="p-4 sticky top-0 bg-gray-50">
            <div className="flex items-center w-full border border-gray-300 rounded-md">
              <FaSearch className="ml-2 text-gray-500" />
              <input
                type="text"
                placeholder="Search Chats"
                className="w-full p-2 pl-8 border-0 rounded-md focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={handleNewChat}
              className="w-full px-4 py-2 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600"
            >
              New Chat
            </button>
          </div>
          <ChatList
            chats={filteredChats}
            selectedChatId={selectedChatId}
            onSelectChat={(chatId) => {
              setSelectedChatId(chatId);
              setShowChatList(false); // Close chat list on mobile when a chat is selected
            }}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-grow flex flex-col p-6 bg-white lg:ml-[320px]">
          {selectedChatId ? (
            <>
              <Chat messages={messages} />
              <div className="flex items-center mt-auto sticky bottom-0 bg-white p-4 border-t">
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
    </div>
  );
};

export default ChatsPage;
