import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal } from 'lucide-react';
import { useChat } from '@/lib/hooks/useChat';

export function ChatInput() {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="min-h-[60px] resize-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={isLoading || !input.trim()}
      >
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
}