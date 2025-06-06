
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (input: string) => void;
  isLoading: boolean;
  isChatInitialized: boolean;
}

const SendIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

const LoadingSpinnerIcon: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, isChatInitialized }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isChatInitialized) return;
    onSendMessage(input);
    setInput('');
  };

  const isDisabled = isLoading || !isChatInitialized;

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-700 border-t border-slate-600 flex items-center space-x-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={!isChatInitialized ? "初始化中，請稍候..." : "請問有什麼想知道的呢？"}
        className="flex-grow p-3 bg-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder-slate-400 disabled:opacity-50"
        disabled={isDisabled}
      />
      <button
        type="submit"
        className="p-3 bg-sky-600 text-white rounded-lg hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-12 h-12"
        disabled={isDisabled}
      >
        {isLoading ? <LoadingSpinnerIcon /> : <SendIcon />}
      </button>
    </form>
  );
};
