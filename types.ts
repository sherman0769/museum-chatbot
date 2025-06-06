
export enum MessageSender {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system' // For error messages or initial messages not from Gemini directly
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: number;
}
