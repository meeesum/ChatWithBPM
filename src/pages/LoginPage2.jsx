import React, { useState, useEffect } from 'react';

const ChatPage = () => {
  const [chats, setChats] = useState([
    {
      name: 'General',
      messages: [
        { role: 'user', content: 'Hello, how are you?' },
        { role: 'assistant', content: 'Hello! I am doing well, thank you for asking. How about yourself?' },
      ],
    },
    {
      name: 'Travel Plans',
      messages: [
        { role: 'user', content: 'I am planning a trip to Italy. Can you suggest some places to visit?' },
        { role: 'assistant', content: 'Certainly! Rome, Florence, and Venice are popular choices. Have you been to any of these before?' },
      ],
    },
  ]);

  const [currentChat, setCurrentChat] = useState(null);
  const [newChatName, setNewChatName] = useState('');
  const [newChatMessage, setNewChatMessage] = useState('');
  const [xmlData, setXmlData] = useState(null);

  useEffect(() => {
    // Load chats from local storage (if any)
    const savedChats = JSON.parse(localStorage.getItem('chats'));
    if (savedChats) {
      setChats(savedChats);
    }
  }, []);

  useEffect(() => {
    // Save chats to local storage
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const handleNewChat = () => {
    if (newChatName.trim() !== '') {
      const newChat = {
        name: newChatName,
        messages: [],
      };
      setChats([...chats, newChat]);
      setCurrentChat(newChat);
      setNewChatName('');
    }
  };

  const handleSendMessage = () => {
    if (currentChat && newChatMessage.trim() !== '') {
      const updatedMessages = [...currentChat.messages, { 
        role: 'user', 
        content: newChatMessage 
      }];
      setCurrentChat({ ...currentChat, messages: updatedMessages });
      setNewChatMessage('');
      // Here you would typically send the message to your backend 
      // for processing and receive the response to display
    }
  };

  const handleXmlUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const xmlString = e.target.result;
      setXmlData(xmlString);
      // Process the XML data and potentially use it for chat generation
    };

    reader.readAsText(file);
  };

  const handleChatSelection = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col"> 
      <div className="container mx-auto p-4 flex-grow"> {/* Added flex-grow */}
        <div className="flex">
          <div className="w-1/4 p-4 bg-white rounded-lg shadow-md mr-4"> 
            {/* Chat List */}
            <h2 className="text-2xl font-bold mb-4">Chats</h2>
            <input 
              type="text" 
              placeholder="New Chat Name" 
              value={newChatName} 
              onChange={(e) => setNewChatName(e.target.value)} 
              className="w-full px-3 py-2 mb-2 border rounded" 
            />
            <button 
              onClick={handleNewChat} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            >
              New Chat
            </button>
            <ul className="mt-4">
              {chats.map((chat) => (
                <li 
                  key={chat.name} 
                  onClick={() => handleChatSelection(chat)} 
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded mb-2" 
                >
                  {chat.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-3/4 p-4 bg-white rounded-lg shadow-md">
            {/* Chat Window */}
            {currentChat ? (
              <>
                <h3 className="text-2xl font-bold mb-4">{currentChat.name}</h3>
                <div className="chat-messages max-h-96 overflow-y-auto"> 
                  {currentChat.messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded mb-2 ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`} 
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
                <div className="flex mt-4">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={newChatMessage} 
                    onChange={(e) => setNewChatMessage(e.target.value)} 
                    className="flex-grow px-3 py-2 border rounded mr-2" 
                  />
                  <button 
                    onClick={handleSendMessage} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
                  >
                    Send
                  </button>
                  <label htmlFor="xmlUpload" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 10.5M12 10.5M14.25 10.5" />
                    </svg>
                    <span className="text-sm font-medium text-gray-500">Upload XML</span>
                  </label>
                  <input 
                    type="file" 
                    id="xmlUpload" 
                    accept=".xml" 
                    onChange={handleXmlUpload} 
                    className="hidden" 
                  />
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                Please select a chat.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;