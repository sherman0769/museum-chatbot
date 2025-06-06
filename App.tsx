
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, MessageSender } from './types';
import { GEMINI_MODEL_NAME } from './constants';
import { ChatWindow } from './components/ChatWindow';
import { LanguageSelector } from './components/LanguageSelector';
import { locales, Language } from './locales';
import { sendMessageToGemini, initializeChat } from './services/geminiService';
import type { Chat } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const geminiChatRef = useRef<Chat | null>(null);
  const [isChatInitialized, setIsChatInitialized] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('zh-TW');

  const t = locales[language];

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
        addMessage(t.serviceUnavailable, MessageSender.SYSTEM);
        setIsChatInitialized(true); // Mark as initialized to prevent retries, even if failed
        return;
      }
      try {
        setIsLoading(true);
        const chat = initializeChat(process.env.API_KEY, GEMINI_MODEL_NAME, t.systemPrompt);
        geminiChatRef.current = chat;
        addMessage(t.initialBotMessage, MessageSender.BOT);
        setIsChatInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Gemini chat:", error);
        addMessage(t.initFailure, MessageSender.SYSTEM);
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
         addMessage(t.notReady, MessageSender.SYSTEM);
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
      addMessage(t.botErrorMessage, MessageSender.BOT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-white">
      <div className="w-full max-w-2xl h-[calc(100vh-4rem)] min-h-[400px] bg-slate-800 shadow-2xl rounded-xl flex flex-col overflow-hidden border border-slate-600">
        <header className="bg-slate-700 p-4 text-center shadow-md space-y-2">
          <h1 className="text-2xl font-bold text-sky-400">{t.headerTitle}</h1>
          <p className="text-sm text-slate-300">{t.tagline}</p>
          <LanguageSelector
            language={language}
            onChange={setLanguage}
            label={t.languageLabel}
          />
        </header>
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isChatInitialized={isChatInitialized}
          inputPlaceholder={t.inputPlaceholder}
          loadingPlaceholder={t.loadingPlaceholder}
        />
      </div>
      <footer className="text-center mt-4 text-xs text-slate-400">
        {t.poweredBy}
      </footer>
    </div>
  );
};

export default App;
