
import React from 'react';
import { ChatMessage, MessageSender } from '../types';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-400">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

const BotIcon: React.FC = () => (
 <span className="text-2xl">🤖</span>
);


export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;
  const isBot = message.sender === MessageSender.BOT;
  const isSystem = message.sender === MessageSender.SYSTEM;

  const bubbleAlignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser 
    ? 'bg-sky-600 text-white' 
    : isBot 
    ? 'bg-slate-700 text-slate-100'
    : 'bg-red-700 text-red-100 text-center w-full'; // System messages
  
  const textAlignment = isSystem ? 'text-center' : isUser ? 'text-right' : 'text-left';

  if (isSystem) {
    return (
      <div className={`flex ${bubbleAlignment} mb-2`}>
        <div className={`max-w-full md:max-w-[80%] p-3 rounded-lg shadow-md ${bubbleColor} ${textAlignment}`}>
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex items-end gap-2 ${bubbleAlignment} mb-2`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
          <BotIcon />
        </div>
      )}
      <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-md ${bubbleColor} ${textAlignment}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        {/* Optional: timestamp */}
        {/* <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </p> */}
      </div>
      {isUser && (
         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};
