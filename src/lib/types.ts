export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  status: 'sending' | 'sent' | 'error';
  metadata?: {
    model?: string;
    processingTime?: number;
    tokenCount?: number;
  };
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
}

export interface APIConfig {
  apiKey: string;
  model: string;
  baseURL: string;
  timeout: number;
  maxRetries: number;
  headers: Record<string, string>;
}