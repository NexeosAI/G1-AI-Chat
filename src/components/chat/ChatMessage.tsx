import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 p-4',
        isUser ? 'bg-muted/50' : 'bg-background'
      )}
    >
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-2">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        {message.metadata && (
          <div className="flex gap-2 text-xs text-muted-foreground">
            {message.metadata.model && (
              <span>Model: {message.metadata.model}</span>
            )}
            {message.metadata.tokenCount && (
              <span>Tokens: {message.metadata.tokenCount}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}