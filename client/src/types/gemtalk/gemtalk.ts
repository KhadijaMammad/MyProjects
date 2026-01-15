export interface ChatMessage {
  role: 'assistant' | 'user' | 'system' | string;
  content: string;
}

export interface GemTalk {
  id: number;
  topic: string;
  rounds: number;
  status: 'processing' | 'completed';
  chat_history?: ChatMessage[];
  createdAt: string;
}
