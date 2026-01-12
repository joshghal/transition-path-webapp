import { NextRequest, NextResponse } from 'next/server';
import { callChatAI, parseJSONResponse } from '@/lib/ai/chat-handler';

export interface ClauseInsightRequest {
  clauseId: string;
  content: string;
  clauseType?: string;
  documentType?: string;
}

export interface ClauseInsight {
  summary: string;
  example: string;
}

const SYSTEM_PROMPT = `You are an expert in LMA loan documentation. Analyze clause text and provide:

1. KEY POINTS: 2-3 bullet points (each under 15 words) explaining what this clause does and why it matters
2. ADAPTED CLAUSE: Write a short clause adaptation example for an African renewable energy project. Do NOT use strict numbers - use descriptive placeholders like [Borrower], [Target Year], [Baseline Year], [Target Percentage], [Basis Points]. This is a template example that users will customize. Keep it 2-4 sentences max.

Keep it simple. No jargon. Be practical. The adapted clause should be flexible enough to apply to various projects.

Respond in JSON:
{
  "summary": "• First key point\\n• Second key point\\n• Third point (optional)",
  "example": "The [Borrower] shall achieve [Target Percentage] reduction in GHG emissions from the [Baseline Year] levels by [Target Year]. Upon verified achievement, the Margin shall decrease by [Basis Points Reduction]; upon failure, the Margin shall increase by [Basis Points Increase]."
}`;

export async function POST(request: NextRequest) {
  try {
    const body: ClauseInsightRequest = await request.json();
    const { clauseId, content, clauseType, documentType } = body;

    if (!clauseId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: clauseId and content' },
        { status: 400 }
      );
    }

    // Build context for the AI
    const contextParts = [];
    if (clauseType) contextParts.push(`Clause Type: ${clauseType.replace(/_/g, ' ')}`);
    if (documentType) contextParts.push(`Document Type: ${documentType.replace(/_/g, ' ')}`);

    const userMessage = `${contextParts.length > 0 ? contextParts.join('\n') + '\n\n' : ''}Clause Text:
${content}

Provide a summary and practical example for this clause.`;

    const result = await callChatAI({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.3,
      maxTokens: 400
    });

    if (!result.success || !result.content) {
      console.error('AI call failed:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to generate insight' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    const insight = parseJSONResponse<ClauseInsight>(result.content);

    if (!insight || !insight.summary || !insight.example) {
      console.error('Failed to parse AI response:', result.content);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      clauseId,
      insight,
      duration: result.duration
    });

  } catch (error) {
    console.error('Clause insight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
