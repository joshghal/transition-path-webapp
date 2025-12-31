'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage as ChatMessageType, ChatSource } from '@/lib/types';

interface ChatMessageProps {
  message: ChatMessageType;
  onSourceClick?: (source: ChatSource) => void;
  onSuggestedClick?: (question: string) => void;
  disabled?: boolean;
}

const CLAUSE_TYPE_LABELS: Record<string, string> = {
  interest: 'Interest & Rates',
  facility_terms: 'Facility Terms',
  events_of_default: 'Events of Default',
  security: 'Security',
  prepayment: 'Prepayment',
  margin_ratchet: 'Margin Ratchet',
  conditions_precedent: 'Conditions Precedent',
  representations: 'Representations',
  fees: 'Fees',
  verification: 'Verification',
  reporting_covenant: 'Reporting',
  kpi_definition: 'KPI Definition',
  spt_definition: 'SPT Definition',
  use_of_proceeds: 'Use of Proceeds',
  general: 'General',
};

export default function ChatMessage({ message, onSourceClick, onSuggestedClick, disabled }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`${isUser ? 'flex justify-end' : ''}`}>
      {isUser ? (
        // User message - minimal right-aligned bubble
        <div className="max-w-[85%] bg-verdex-50 text-gray-800 px-4 py-2.5 rounded-2xl rounded-br-sm">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      ) : (
        // Assistant message - with markdown support
        <div className="space-y-3">
          <div className="prose prose-sm prose-gray max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Customize heading styles
                h1: ({ children }) => (
                  <h1 className="text-base font-semibold text-gray-900 mt-4 mb-2 first:mt-0">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm font-semibold text-gray-900 mt-3 mb-2 first:mt-0">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-medium text-gray-800 mt-2 mb-1 first:mt-0">{children}</h3>
                ),
                // Paragraphs
                p: ({ children }) => (
                  <p className="text-sm text-gray-700 leading-relaxed mb-2 last:mb-0">{children}</p>
                ),
                // Lists
                ul: ({ children }) => (
                  <ul className="text-sm text-gray-700 space-y-1 my-2 ml-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="text-sm text-gray-700 space-y-1 my-2 ml-1 list-decimal list-inside">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="flex gap-2">
                    <span className="text-verdex-500 flex-shrink-0">•</span>
                    <span>{children}</span>
                  </li>
                ),
                // Strong/Bold
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                // Emphasis/Italic
                em: ({ children }) => (
                  <em className="italic text-gray-600">{children}</em>
                ),
                // Code inline
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  if (isBlock) {
                    return (
                      <code className="block bg-gray-50 text-gray-800 text-xs p-3 rounded-lg overflow-x-auto my-2 font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="bg-gray-100 text-gray-800 text-xs px-1.5 py-0.5 rounded font-mono">
                      {children}
                    </code>
                  );
                },
                // Code blocks
                pre: ({ children }) => (
                  <pre className="bg-gray-50 rounded-lg overflow-hidden my-2">{children}</pre>
                ),
                // Links
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-verdex-600 hover:text-verdex-700 underline"
                  >
                    {children}
                  </a>
                ),
                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-verdex-200 pl-3 my-2 text-gray-600 italic">
                    {children}
                  </blockquote>
                ),
                // Tables
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3">
                    <table className="min-w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-50">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-gray-100">{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-gray-50/50">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 text-gray-600 border-b border-gray-100">
                    {children}
                  </td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Sources - minimal text links */}
          {message.sources && message.sources.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-gray-400">Sources:</span>
              {message.sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => onSourceClick?.(source)}
                  className="text-xs text-verdex-600 hover:text-verdex-700 hover:underline transition-colors"
                >
                  {CLAUSE_TYPE_LABELS[source.clauseType] || source.clauseType.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          )}

          {/* Suggested questions - simple list */}
          {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              {message.suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => !disabled && onSuggestedClick?.(question)}
                  disabled={disabled}
                  className={`block w-full text-left text-sm py-1 transition-colors ${
                    disabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:text-verdex-600'
                  }`}
                >
                  <span className={disabled ? 'text-gray-200 mr-2' : 'text-gray-300 mr-2'}>→</span>
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
