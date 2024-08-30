import React, { useState } from 'react';
import { SendMessageIcon } from './icons';

const ChatBox = ({ messages, onSendMessage, setShowChat }) => {
  const [newMessage, setNewMessage] = useState('');
  const displayChat = false;

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full w-80 border-9 border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="font-semibold">Messages (1 new)</h3>
        <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowChat(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9996 10.9396L15.7121 7.22705L16.7726 8.28755L13.0601 12.0001L16.7726 15.7126L15.7121 16.7731L11.9996 13.0606L8.28706 16.7731L7.22656 15.7126L10.9391 12.0001L7.22656 8.28755L8.28706 7.22705L11.9996 10.9396Z" fill="#525866"/>
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full" />
              <div className={`mx-2 p-3 rounded-lg ${msg.sender === 'user' ? 'bg-[#F1F1F1]' : 'bg-[#C1FA6B]'}`}>
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs text-gray-500">{msg.name} • {msg.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 flex">
        <input
          type="text"
          placeholder="Enter text here..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button 
          onClick={handleSend}
          className="bg-[#C1FA6B] text-white px-4 py-2 rounded-r-md hover:bg-[#b1f151] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <SendMessageIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;