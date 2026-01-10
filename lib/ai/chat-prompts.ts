// Chat System Prompts for Transition Finance Assistant

import { getDocumentReferencesForAI } from '@/lib/data/document-links';

export const CHAT_SYSTEM_PROMPT = `You are a helpful assistant specializing in transition finance documentation, particularly for African infrastructure projects.

Your expertise includes:
- LMA (Loan Market Association) clause templates and best practices
- Sustainability-linked loan structures and margin ratchets
- KPI and SPT (Sustainability Performance Target) definitions
- ESG reporting and verification requirements
- Paris Agreement alignment and SBTi (Science Based Targets initiative) frameworks
- Development Finance Institution (DFI) requirements

When answering questions:
1. Be concise and practical - focus on actionable guidance
2. Reference specific clause types when relevant (e.g., margin_ratchet, kpi_definition, verification)
3. Explain technical terms briefly when first using them
4. If you're uncertain, say so rather than guessing
5. When users ask for official documents and OFFICIAL DOCUMENT REFERENCES are provided in context, use ONLY those exact links

CRITICAL - DOCUMENT LINKS:
- NEVER make up or guess URLs. Only use URLs explicitly provided in the OFFICIAL DOCUMENT REFERENCES section.
- If a document is mentioned but no URL is provided for it, say "I don't have a direct link to this document" instead of creating a fake URL.
- Do NOT generate URLs like "https://www.lma.eu.com/page/..." or any other made-up links.

FORMAT YOUR RESPONSES USING MARKDOWN:
- Use **bold** for key terms and important points
- Use bullet points for lists
- Use numbered lists for sequential steps
- Use headers (##) to organize longer responses
- Use \`code\` for clause references or technical terms
- Keep paragraphs short and scannable
- When providing document links, ONLY use URLs from OFFICIAL DOCUMENT REFERENCES - never invent URLs

You have access to relevant clause excerpts that will be provided as context. Use these to ground your answers in actual documentation.

IMPORTANT: Always respond with valid JSON in this exact format:
{
  "response": "Your markdown-formatted answer here...",
  "suggestedQuestions": ["Follow-up question 1?", "Follow-up question 2?"]
}

The suggestedQuestions should be 2-3 natural follow-up questions the user might want to ask based on your response.`;

// Keywords that indicate user is asking for document references
const DOCUMENT_REQUEST_KEYWORDS = [
  'document', 'pdf', 'full text', 'complete', 'official', 'download',
  'link to', 'where can i find', 'access', 'take me to', 'show me the',
  'principles document', 'guidance document', 'original'
];

/**
 * Check if user message is asking for document references
 */
export function isDocumentRequest(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return DOCUMENT_REQUEST_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
}

export function buildUserPrompt(
  userMessage: string,
  clauseContext: string,
  conversationHistory: { role: string; content: string }[]
): string {
  let prompt = '';

  // Add relevant clauses as context
  if (clauseContext) {
    prompt += `RELEVANT CLAUSE EXCERPTS:\n${clauseContext}\n\n---\n\n`;
  }

  // Add official document references if user is asking for documents
  if (isDocumentRequest(userMessage)) {
    prompt += `OFFICIAL DOCUMENT REFERENCES (provide these links when user asks for full documents):\n${getDocumentReferencesForAI()}\n\n---\n\n`;
  }

  // Add conversation history (last 6 messages max to save tokens)
  const recentHistory = conversationHistory.slice(-6);
  if (recentHistory.length > 0) {
    prompt += 'CONVERSATION HISTORY:\n';
    for (const msg of recentHistory) {
      const role = msg.role === 'user' ? 'User' : 'Assistant';
      // For assistant messages, just show the response text, not the full JSON
      let content = msg.content;
      if (msg.role === 'assistant') {
        try {
          const parsed = JSON.parse(msg.content);
          content = parsed.response || msg.content;
        } catch {
          // Keep original content
        }
      }
      prompt += `${role}: ${content}\n`;
    }
    prompt += '\n---\n\n';
  }

  prompt += `USER QUESTION: ${userMessage}`;

  return prompt;
}

export function formatClausesForContext(
  clauses: { id: string; content: string; metadata: { clauseType?: string; source?: string } }[],
  maxChars: number = 3000
): string {
  if (clauses.length === 0) return '';

  let context = '';
  let charCount = 0;

  for (const clause of clauses) {
    const clauseText = `[${clause.metadata.clauseType || 'general'}] ${clause.content.substring(0, 500)}${clause.content.length > 500 ? '...' : ''}\n\n`;

    if (charCount + clauseText.length > maxChars) break;

    context += clauseText;
    charCount += clauseText.length;
  }

  return context.trim();
}
