
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

export const initializeChat = (apiKey: string, modelName: string, systemPrompt: string): Chat => {
  if (!apiKey) {
    throw new Error("API_KEY is missing. Cannot initialize Gemini AI.");
  }
  const ai = new GoogleGenAI({ apiKey });
  const chat = ai.chats.create({
    model: modelName,
    config: {
      systemInstruction: systemPrompt,
      // Add other configs like temperature if needed
      // temperature: 0.7,
    },
  });
  return chat;
};

export const sendMessageToGemini = async (chatInstance: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chatInstance.sendMessage({ message });
    // Directly access the text property as per guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Consider more specific error handling or re-throwing for the component to handle
    if (error instanceof Error) {
      // You might want to return a user-friendly error message or a generic one
      // For now, re-throwing to let the UI decide specific message
      throw new Error(`Gemini API request failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred with the Gemini API.");
  }
};
