import { useCallback } from 'react';
import { useChatStore } from '../store';
import { toast } from 'sonner';
import { UI_CONFIG } from '../constants';

export function useChat() {
  const { sendMessage, isLoading, error } = useChatStore();

  const handleSendMessage = useCallback(async (content: string) => {
    if (content.length > UI_CONFIG.MAX_INPUT_LENGTH) {
      toast.error(`Message exceeds maximum length of ${UI_CONFIG.MAX_INPUT_LENGTH} characters`);
      return;
    }

    try {
      await sendMessage(content);
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
      console.error('Chat error:', err);
    }
  }, [sendMessage]);

  return {
    sendMessage: handleSendMessage,
    isLoading,
    error,
  };
}