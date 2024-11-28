import { create } from 'zustand';
import { ChatState, Message } from './types';
import { sendMessage } from './api';

interface ChatStore extends ChatState {
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  sendMessage: async (content: string) => {
    set({ isLoading: true, error: null });

    try {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        content,
        role: 'user',
        timestamp: Date.now(),
        status: 'sent',
      };

      set((state) => ({
        messages: [...state.messages, userMessage],
      }));

      const response = await sendMessage([...get().messages, userMessage]);
      
      set((state) => ({
        messages: [...state.messages, response],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error as Error,
        isLoading: false,
      });
    }
  },

  clearMessages: () => {
    set({ messages: [], error: null });
  },
}));