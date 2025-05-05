import React from "react";
import { FaTrash } from "react-icons/fa";

const ChatList = ({ chats, selectedChatId, onSelectChat, onDeleteChat }) => {
  return (
    <div className="relative p-4 space-y-2">
      {chats.length === 0 ? (
        <p className="text-red-500 text-center">
          No chats exist in chat list. Upload a BPMN to start.
        </p>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex justify-between items-center p-3 rounded-md cursor-pointer ${
              chat.id === selectedChatId
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <span
              onClick={() => onSelectChat(chat.id)}
              className="flex-grow cursor-pointer"
            >
              {chat.title}
            </span>
            <button
              onClick={() => onDeleteChat(chat.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
            >
               <FaTrash />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatList;
