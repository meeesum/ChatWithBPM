import React from "react";
import { FaTrash } from "react-icons/fa";

const ChatList = ({ chats, selectedChatId, onSelectChat, onDeleteChat }) => {
  return (
    <div className="relative  space-y-2">
      {chats.length === 0 ? (
        <p className="text-red-500 text-center">
          No chats exist in chat list. Upload a BPMN to start.
        </p>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex justify-between items-center px-3 py-2 h-12 rounded-md cursor-pointer w-full
              ${
                chat.id === selectedChatId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
          >
            <span
              onClick={() => onSelectChat(chat.id)}
              title={chat.title}
              className="flex-grow truncate mr-2"
            >
              {chat.title}
            </span>
            <button
              onClick={() => onDeleteChat(chat.id)}
              className="p-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
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
