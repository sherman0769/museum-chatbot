
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, MessageSender } from './types';
import { GEMINI_MODEL_NAME, BOT_SYSTEM_PROMPT, INITIAL_BOT_MESSAGE, BOT_ERROR_MESSAGE } from './constants';
import { ChatWindow } from './components/ChatWindow';
import { sendMessageToGemini, initializeChat } from './services/geminiService';
import type { Chat } from '@google/genai'; // Ensure type import for Chat

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const geminiChatRef = useRef<Chat | null>(null);
  const [isChatInitialized, setIsChatInitialized] = useState<boolean>(false);

  const addMessage = useCallback((text: string, sender: MessageSender) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { id: Date.now().toString(), text, sender, timestamp: Date.now() },
    ]);
  }, []);
  
  useEffect(() => {
    const initAndGreet = async () => {
      if (!process.env.API_KEY) {
        console.error("API_KEY is not set in environment variables.");
        addMessage("抱歉，目前無法連接到服務。請確認API金鑰已設定。", MessageSender.SYSTEM);
        setIsChatInitialized(true); // Mark as initialized to prevent retries, even if failed
        return;
      }
      try {
        setIsLoading(true);
        const chat = initializeChat(process.env.API_KEY, GEMINI_MODEL_NAME, BOT_SYSTEM_PROMPT);
        geminiChatRef.current = chat;
        addMessage(INITIAL_BOT_MESSAGE, MessageSender.BOT);
        setIsChatInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Gemini chat:", error);
        addMessage("初始化聊天服務失敗，請稍後再試。", MessageSender.SYSTEM);
        setIsChatInitialized(true); // Mark as initialized to prevent retries
      } finally {
        setIsLoading(false);
      }
    };

    if (!isChatInitialized) {
       initAndGreet();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMessage, isChatInitialized]); // Ensure addMessage is stable or included if it changes


  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim() || isLoading || !geminiChatRef.current) {
      if(!geminiChatRef.current && isChatInitialized) {
         addMessage("聊天服務尚未準備好或設定錯誤，請稍後再試。", MessageSender.SYSTEM);
      }
      return;
    }

    addMessage(userInput, MessageSender.USER);
    setIsLoading(true);

    try {
      const botResponseText = await sendMessageToGemini(geminiChatRef.current, userInput);
      addMessage(botResponseText, MessageSender.BOT);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      addMessage(BOT_ERROR_MESSAGE, MessageSender.BOT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-white">
      <div className="w-full max-w-2xl h-[calc(100vh-4rem)] min-h-[400px] bg-slate-800 shadow-2xl rounded-xl flex flex-col overflow-hidden border border-slate-600">
        <header className="bg-slate-700 p-4 text-center shadow-md">
          <h1 className="text-2xl font-bold text-sky-400">博物館智能客服小博 🏛️</h1>
          <p className="text-sm text-slate-300">幽默風趣，為您解惑！</p>
        </header>
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isChatInitialized={isChatInitialized}
        />
      </div>
      <footer className="text-center mt-4 text-xs text-slate-400">
        Powered by Gemini API
      </footer>
    </div>
  );
};

export default App;
