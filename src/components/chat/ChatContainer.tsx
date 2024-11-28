import { useChatStore } from '@/lib/store';
import { useScrollToBottom } from '@/lib/hooks/useScrollToBottom';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { Loader2 } from 'lucide-react';

export function ChatContainer() {
  const { messages, isLoading, error } = useChatStore();
  const bottomRef = useScrollToBottom<HTMLDivElement>([messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        {error && (
          <div className="p-4 text-sm text-destructive">
            Error: {error.message}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <ChatInput />
    </div>
  );
}