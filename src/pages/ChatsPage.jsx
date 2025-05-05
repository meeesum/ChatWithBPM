import React, { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import { FaSearch, FaPlus, FaComments, FaTimes } from "react-icons/fa";
import {
  fetchChats,
  fetchChatMessages,
  sendQuery,
  uploadBPMN,
} from "../Services/chatService";
import { RiCoinsLine } from "react-icons/ri";

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [description, setDescription] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile drawer

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
        if (data.length > 0) setSelectedChatId(data[0].id);
      } catch (error) {
        console.error("Error loading chats:", error);
      }
    };
    loadChats();
    console.log("\n\n\n in des \n", description);
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedChatId) return;
      try {
        const chat = chats.find((c) => c.id === selectedChatId);
        if (chat) setDescription(chat.description);
        const data = await fetchChatMessages(selectedChatId);
        setMessages(data);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };
    loadMessages();
  }, [selectedChatId]);

  const handleSendMessage = async () => {
    const trimmed = newMessage.trim();
    if (!trimmed || !selectedChatId) return;

    const newQuery = {
      id: `temp-user-${Date.now()}`,
      text: trimmed,
      response: "Processing query...",
      created_at: Date.now(),
    };

    setMessages((prev) => [...prev, newQuery]);
    setNewMessage("");

    try {
      const response = await sendQuery(selectedChatId, trimmed);

      const finalMessage = {
        id: response.data.id,
        text: response.data.text,
        response: response.data.response,
        created_at: response.data.created_at,
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === newQuery.id ? finalMessage : msg))
      );
    } catch (error) {
      console.error("Error sending query:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newQuery.id
            ? { ...msg, response: "Failed to get response. Please try again." }
            : msg
        )
      );
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await uploadBPMN(file);
        const updatedChats = [response, ...chats];
        setChats(updatedChats);
        setSelectedChatId(response.bpmid);
        const data = await fetchChatMessages(response.bpmid);
        setMessages(data);
        setDescription(response.description);

        
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleChatDeleted = (deletedChatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== deletedChatId));
    if (selectedChatId === deletedChatId) {
      setSelectedChatId(null);
      setMessages([]);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative mt-6 overflow-hidden h-screen flex flex-col md:flex-row">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between p-3">
        <button onClick={() => setIsSidebarOpen(true)} className="flex items-center text-blue-500 font-bold">
        <FaComments className="mr-2 " />

          Chats
        </button>
     
      </div>

      {/* Sidebar Drawer - Mobile */}
      <div
        className={`fixed bottom-0 left-0 overflow-hidden h-full w-64 bg-white  transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "z-40 translate-x-0" : "-translate-x-full"
        } md:w-[30%] md:block shadow-lg border-r`}
      >
        {/* Close Button - Mobile only */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <span className="font-bold text-lg">Chats</span>
          <button onClick={() => setIsSidebarOpen(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-4">
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
            onClick={() =>
              document.getElementById("file-upload-new-chat").click()
            }
            className="mt-4 w-full flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <FaPlus className="mr-2" /> Start New Chat
          </button>
          <input
            type="file"
            accept=".bpmn"
            className="hidden"
            id="file-upload-new-chat"
            onChange={handleFileUpload}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <ChatList
            chats={filteredChats}
            selectedChatId={selectedChatId}
            onSelectChat={(id) => {
              setSelectedChatId(id);
              setIsSidebarOpen(false); // Hide drawer on select
            }}
            onChatDeleted={handleChatDeleted}
          />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col w-full md:w-[70%] overflow-hidden">
        <div className="border px-4 py-4 max-h-28 overflow-y-auto">
          {description}
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {selectedChatId ? (
            <Chat messages={messages} />
          ) : (
            <div className="text-gray-500 flex items-center justify-center h-full">
              No chats exist. Upload a BPMN to start.
            </div>
          )}
        </div>
        <div className="bg-white p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 p-2 rounded-md"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>

      {/* Backdrop overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ChatsPage;


// import React, { useState, useEffect } from "react";
// import ChatList from "../components/ChatList";
// import Chat from "../components/Chat";
// import { FaSearch, FaPlus } from "react-icons/fa";
// import {
//   fetchChats,
//   fetchChatMessages,
//   sendQuery,
//   uploadBPMN,
// } from "../Services/chatService";

// const ChatsPage = () => {
//   const [chats, setChats] = useState([]);
//   const [selectedChatId, setSelectedChatId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     const loadChats = async () => {
//       try {
//         const data = await fetchChats();
//         setChats(data);
//         if (data.length > 0) setSelectedChatId(data[0].id);
//       } catch (error) {
//         console.error("Error loading chats:", error);
//       }
//     };
//     loadChats();
//   }, []);

//   useEffect(() => {
//     const loadMessages = async () => {
//       if (!selectedChatId) return;
//       try {
//         const chat = chats.find((c) => c.id === selectedChatId);
//         if (chat) setDescription(chat.description);
//         const data = await fetchChatMessages(selectedChatId);
//         setMessages(data);
//       } catch (error) {
//         console.error("Error loading messages:", error);
//       }
//     };
//     loadMessages();
//   }, [selectedChatId]);

//   useEffect(() => {
    
//   }, [messages]);
  
//   const handleSendMessage = async () => {
//     const trimmed = newMessage.trim();
//     if (!trimmed || !selectedChatId) return;

//     const newQuery = {
//       id: `temp-user-${Date.now()}`,
//       text: trimmed,
//       response: "Processing query...",
//       created_at: Date.now(),
//     };

   
//     setMessages((prev) => [...prev, newQuery]);
//     setNewMessage("");

//     try {
//       const response = await sendQuery(selectedChatId, trimmed);

//       console.log("in sendMessage");
//       console.log(response);

//       const finalMessage = {
//         id: response.data.id ,
//         text: response.data.text, 
//         response: response.data.response,
//         created_at:response.data.creates_at ,
//       };

//       setMessages((prev) =>
//         prev.map((msg) => (msg.id === newQuery.id ? finalMessage : msg))
//       );
//     } catch (error) {
//       console.error("Error sending query:", error);
//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === loadingMessage.id
//             ? { ...msg, content: "Failed to get response. Please try again." }
//             : msg
//         )
//       );
//     }
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         const response = await uploadBPMN(file);
//         const updatedChats = [response, ...chats];
//         setChats(updatedChats);
//         setSelectedChatId(response.bpmid);
//         const data = await fetchChatMessages(response.bpmid);
//         setMessages(data);
//         setDescription(response.description);
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     }
//   };

//   const handleChatDeleted = (deletedChatId) => {
//     setChats((prev) => prev.filter((chat) => chat.id !== deletedChatId));
//     if (selectedChatId === deletedChatId) {
//       setSelectedChatId(null);
//       setMessages([]);
//     }
//   };

//   const filteredChats = chats.filter((chat) =>
//     chat.title?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex mt-10 bottom-0 left-0 w-screen overflow-hidden">
//       {/* Sidebar */}
//       <div className="w-[30%] bg-gray-50 border-r shadow-lg flex flex-col h-screen">
//         <div className="p-4 bg-gray-50">
//           <div className="flex items-center w-full border border-gray-300 rounded-md">
//             <FaSearch className="ml-2 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search Chats"
//               className="w-full p-2 pl-8 border-0 rounded-md focus:outline-none"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={() =>
//               document.getElementById("file-upload-new-chat").click()
//             }
//             className="mt-4 w-full flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             <FaPlus className="mr-2" /> Start New Chat
//           </button>
//           <input
//             type="file"
//             accept=".bpmn"
//             className="hidden"
//             id="file-upload-new-chat"
//             onChange={handleFileUpload}
//           />
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           <ChatList
//             chats={filteredChats}
//             selectedChatId={selectedChatId}
//             onSelectChat={setSelectedChatId}
//             onChatDeleted={handleChatDeleted}
//           />
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex flex-col flex-grow h-screen w-[70%]">
//         <div className="border px-4 py-4 overflow-y-auto h-28">{description}</div>
//         <div className="flex-1 overflow-y-auto p-6">
//           {selectedChatId ? (
//             <Chat messages={messages} />
//           ) : (
//             <div className="text-gray-500 flex items-center justify-center h-full">
//               No chats exist. Upload a BPMN to start.
//             </div>
//           )}
//         </div>
//         <div className="bg-white p-4 border-t bottom-0 left-0 flex items-center">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             className="flex-grow border border-gray-300 p-2 rounded-md"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//           />
//           <button
//             onClick={handleSendMessage}
//             className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatsPage;
