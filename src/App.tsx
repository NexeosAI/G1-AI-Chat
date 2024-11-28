import { ErrorBoundary } from '@/components/chat/ErrorBoundary';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ChatContainer />
        <Toaster />
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;