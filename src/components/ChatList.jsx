import React from 'react';

const ChatList = ({ chats, selectedChatId, onSelectChat }) => {
  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={`p-4 cursor-pointer ${
            chat.id === selectedChatId ? 'bg-blue-100' : 'hover:bg-gray-100'
          }`}
        >
          <h3 className="font-semibold">{chat.name}</h3>
          <p className="text-sm text-gray-500">{chat.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
