'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatTriggerProps {
  onSubmit: (message: string) => void;
  isOpen: boolean;
}

export default function ChatTrigger({ onSubmit, isOpen }: ChatTriggerProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  // Hide when panel is open
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* Subtle glow */}
          <div
            className={`absolute -inset-0.5 bg-gradient-to-r from-verdex-200 via-teal-200 to-verdex-200 rounded-xl blur transition-opacity duration-300 ${
              isFocused ? 'opacity-60' : 'opacity-0'
            }`}
          />

          {/* Input container */}
          <div className={`relative flex items-center bg-white border rounded-xl shadow-lg transition-all duration-200 ${
            isFocused ? 'border-verdex-300 shadow-xl' : 'border-gray-200'
          }`}>
            {/* AI sparkle icon */}
            <div className="pl-4 pr-2">
              <svg
                className={`w-4 h-4 transition-colors ${isFocused ? 'text-verdex-500' : 'text-gray-300'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask AI about clauses, KPIs, transition finance..."
              className="flex-1 py-3 pr-3 text-sm text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
            />

            {/* Keyboard hint or submit */}
            <div className="pr-3">
              {value.trim() ? (
                <button
                  type="submit"
                  className="text-xs font-medium text-verdex-600 hover:text-verdex-700 px-2 py-1 rounded transition-colors"
                >
                  Ask
                </button>
              ) : (
                <kbd className="hidden sm:inline-block text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                  ⌘J
                </kbd>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
