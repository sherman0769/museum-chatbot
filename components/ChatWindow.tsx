
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatInput } from './ChatInput';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (input: string) => void;
  isLoading: boolean;
  isChatInitialized: boolean;
  inputPlaceholder: string;
  loadingPlaceholder: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isLoading,
  isChatInitialized,
  inputPlaceholder,
  loadingPlaceholder,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex-grow p-6 space-y-4 overflow-y-auto custom-scrollbar bg-slate-800">
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        isChatInitialized={isChatInitialized}
        inputPlaceholder={inputPlaceholder}
        loadingPlaceholder={loadingPlaceholder}
      />
    </div>
  );
};
