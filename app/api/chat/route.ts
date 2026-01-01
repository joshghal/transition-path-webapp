import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/embeddings';
import { searchDocuments } from '@/lib/pinecone';
import { callChatAI, parseJSONResponse } from '@/lib/ai/chat-handler';
import {
  CHAT_SYSTEM_PROMPT,
  buildUserPrompt,
  formatClausesForContext
} from '@/lib/ai/chat-prompts';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface ChatRequestBody {
  message: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

interface ChatResponseBody {
  response: string;
  sources: {
    id: string;
    clauseType: string;
    preview: string;
    score: number;
  }[];
  suggestedQuestions: string[];
  provider: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Step 1: Generate embedding for the user's question
    let queryEmbedding: number[];
    try {
      queryEmbedding = await generateEmbedding(message);
    } catch (error) {
      console.error('Embedding generation failed:', error);
      // Continue without RAG if embedding fails
      queryEmbedding = [];
    }

    // Step 2: Search Pinecone for relevant clauses
    let relevantClauses: {
      id: string;
      score: number;
      content: string;
      metadata: { clauseType?: string; source?: string };
    }[] = [];

    if (queryEmbedding.length > 0) {
      try {
        relevantClauses = await searchDocuments(queryEmbedding, { topK: 5 });
      } catch (error) {
        console.error('Pinecone search failed:', error);
        // Continue without RAG context
      }
    }

    // Step 3: Build context from retrieved clauses
    const clauseContext = formatClausesForContext(relevantClauses);

    // Step 4: Build the prompt with context and history
    const userPrompt = buildUserPrompt(message, clauseContext, history);

    // Step 5: Call ASI1-mini
    const aiResult = await callChatAI({
      messages: [
        { role: 'system', content: CHAT_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      maxTokens: 1500
    });

    if (!aiResult.success || !aiResult.content) {
      // Fallback response if AI fails
      return NextResponse.json<ChatResponseBody>({
        response: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or try rephrasing your question.",
        sources: [],
        suggestedQuestions: [
          "What are the key components of a transition loan?",
          "How do I structure KPIs for sustainability-linked lending?"
        ],
        provider: 'fallback',
        error: aiResult.error
      });
    }

    // Step 6: Parse AI response
    const parsed = parseJSONResponse<{
      response: string;
      suggestedQuestions: string[];
    }>(aiResult.content);

    const responseText = parsed?.response || aiResult.content;
    const suggestedQuestions = parsed?.suggestedQuestions || [
      "Can you explain more about this?",
      "What clauses should I look at next?"
    ];

    // Step 7: Format sources for response
    const sources = relevantClauses.slice(0, 6).map(clause => ({
      id: clause.id,
      clauseType: clause.metadata.clauseType || 'general',
      preview: clause.content.substring(0, 100) + '...',
      score: clause.score
    }));

    return NextResponse.json<ChatResponseBody>({
      response: responseText,
      sources,
      suggestedQuestions: suggestedQuestions.slice(0, 6),
      provider: 'asi1'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        response: "Something went wrong. Please try again.",
        sources: [],
        suggestedQuestions: [],
        provider: 'error'
      },
      { status: 500 }
    );
  }
}
