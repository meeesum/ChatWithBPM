import React from 'react';

const ChatList = ({ chats, selectedChatId, onSelectChat }) => {
  return (
    <div className="overflow-y-auto h-[calc(100vh-180px)]">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={`p-4 cursor-pointer ${
            chat.id === selectedChatId
              ? 'bg-blue-100 border-l-4 border-blue-500'
              : 'hover:bg-gray-100'
          }`}
        >
          <h3 className="font-semibold text-base truncate">{chat.name}</h3>
          <p className="text-sm text-gray-500 truncate">
            {chat.lastMessage || 'No messages yet'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
