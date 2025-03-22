import React, { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import { FaSearch, FaPlus } from "react-icons/fa";
import { fetchChats, fetchChatMessages, sendQuery, uploadBPMN } from "../Services/chatService";

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [des, setDes] = useState("");

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats();
        if (Array.isArray(data)) {
          setChats(data);
          console.log(chats);
          if (data.length > 0) setSelectedChatId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    loadChats();
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      const loadMessages = async () => {
        try {
          const data = await fetchChatMessages(selectedChatId);
          const d= chats.find(i=>i.id===selectedChatId);
          setDes(d.description);
          if (Array.isArray(data)) setMessages(data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      loadMessages();
    }
  }, [selectedChatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await sendQuery(selectedChatId, newMessage);
      setMessages((prev) => [...prev, { role: "user", content: newMessage }, response]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await uploadBPMN(file);
        setChats((prev) => [response, ...prev]);
        setSelectedChatId(response.id);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleChatDeleted = (deletedChatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== deletedChatId));
    if (selectedChatId === deletedChatId) {
      setSelectedChatId(null); // Clear selected chat if it was deleted
      setMessages([]); // Clear messages UI
    }
  };
  

  

  const filteredChats = chats.filter((chat) => chat.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex mt-10   bottom-0 left-0 w-screen overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-[30%] bg-gray-50 border-r shadow-lg flex flex-col h-screen">
        {/* Search & New Chat */}
        <div className="p-4 bg-gray-50">
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

          <button
            onClick={() => document.getElementById("file-upload-new-chat").click()}
            className="mt-4 w-full flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FaPlus className="mr-2" /> Start New Chat
          </button>

          <input type="file" accept=".bpmn" className="hidden" id="file-upload-new-chat" onChange={handleFileUpload} />
        </div>

        {/* Scrollable Chat List */}
        <div className="flex-1 overflow-y-auto">
        <ChatList chats={filteredChats} selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} onChatDeleted={handleChatDeleted} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-grow h-screen w-[70%]">
      <div className="border px-4 py-4 overflow-y-auto h-28">
          {des}
        </div>

        {/* Scrollable Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedChatId ? <Chat messages={messages} /> : <div className="text-gray-500 flex items-center justify-center h-full">No chats exist. Upload a BPMN to start.</div>}
        </div>

        {/* Fixed Message Input */}
        <div className="bg-white p-4 border-t bottom-0 left-0 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 p-2 rounded-md"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Send
          </button>
          <div className="ml-4">
            <input type="file" accept=".bpmn" className="hidden" id="file-upload" onChange={handleFileUpload} />
            <label htmlFor="file-upload" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Upload XML
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
