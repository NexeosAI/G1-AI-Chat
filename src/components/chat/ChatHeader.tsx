import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useChatStore } from '@/lib/store';

export function ChatHeader() {
  const clearMessages = useChatStore((state) => state.clearMessages);

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div>
        <h1 className="text-xl font-bold">{APP_NAME}</h1>
        <p className="text-sm text-muted-foreground">{APP_DESCRIPTION}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={clearMessages}
        title="Clear chat"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </header>
  );
}