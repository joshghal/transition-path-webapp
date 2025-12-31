'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType, ChatSource, ChatResponse } from '@/lib/types';
import ChatMessage from './ChatMessage';

interface ChatPanelProps {
  onSourceClick?: (source: ChatSource) => void;
  isOpen: boolean;
  onToggle: () => void;
  initialMessage?: string | null;
  onInitialMessageHandled?: () => void;
}

const STARTER_PROMPTS = [
  "How do I define ESG KPIs for a transition loan?",
  "What clauses are needed for sustainability-linked pricing?",
  "Show me verification requirements for SPTs"
];

export default function ChatPanel({ onSourceClick, isOpen, onToggle, initialMessage, onInitialMessageHandled }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageProcessed = useRef(false);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle initial message from trigger
  useEffect(() => {
    if (initialMessage && isOpen && !initialMessageProcessed.current) {
      initialMessageProcessed.current = true;
      handleSend(initialMessage);
      onInitialMessageHandled?.();
    }
    if (!isOpen) {
      initialMessageProcessed.current = false;
    }
  }, [initialMessage, isOpen]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    setError(null);

    // Add user message
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build history for API (excluding the message we just added)
      const history = messages.map(m => ({
        role: m.role,
        content: m.role === 'assistant'
          ? JSON.stringify({ response: m.content, suggestedQuestions: m.suggestedQuestions || [] })
          : m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content.trim(),
          history
        })
      });

      const data: ChatResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        sources: data.sources,
        suggestedQuestions: data.suggestedQuestions
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');

      // Add error message
      const errorMessage: ChatMessageType = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
        suggestedQuestions: ["Try asking again", "Rephrase your question"]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  // Handle suggested question click - scroll to bottom
  const handleSuggestedClick = (question: string) => {
    if (isLoading) return;
    handleSend(question);
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-white border-l border-t border-b border-gray-200 rounded-l-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="font-semibold text-gray-900">Ask AI</h2>
        <div className="flex items-center gap-2">
          <kbd className="hidden sm:inline-block text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
            ⌘J
          </kbd>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600 p-1 -mr-1 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 min-h-0">
        {messages.length === 0 ? (
          // Empty state with starter prompts
          <div className="h-full flex flex-col justify-center">
            <p className="text-sm text-gray-400 mb-4">Try asking:</p>
            <div className="space-y-2">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="block w-full text-left text-sm text-gray-600 hover:text-verdex-600 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Messages
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onSourceClick={onSourceClick}
                onSuggestedClick={handleSuggestedClick}
                disabled={isLoading}
              />
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex-shrink-0">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-verdex-400 focus:bg-white transition-colors disabled:opacity-50"
          />
          <button
            onClick={() => handleSend(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 text-gray-400 hover:text-verdex-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
