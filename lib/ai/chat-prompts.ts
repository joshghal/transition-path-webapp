// Chat System Prompts for Transition Finance Assistant

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

FORMAT YOUR RESPONSES USING MARKDOWN:
- Use **bold** for key terms and important points
- Use bullet points for lists
- Use numbered lists for sequential steps
- Use headers (##) to organize longer responses
- Use \`code\` for clause references or technical terms
- Keep paragraphs short and scannable

You have access to relevant clause excerpts that will be provided as context. Use these to ground your answers in actual documentation.

IMPORTANT: Always respond with valid JSON in this exact format:
{
  "response": "Your markdown-formatted answer here...",
  "suggestedQuestions": ["Follow-up question 1?", "Follow-up question 2?"]
}

The suggestedQuestions should be 2-3 natural follow-up questions the user might want to ask based on your response.`;

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
