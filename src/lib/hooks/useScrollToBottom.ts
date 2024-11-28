import { useEffect, useRef, MutableRefObject } from 'react';

export function useScrollToBottom<T extends HTMLElement>(
  deps: any[] = []
): MutableRefObject<T | null> {
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, deps);

  return bottomRef;
}