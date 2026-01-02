import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/ai/api-handler';

interface ClauseAdviceRequest {
  clause: {
    content: string;
    clauseType?: string;
    source?: string;
  };
  projectContext: {
    projectName: string;
    sector: string;
    country: string;
    eligibilityStatus: string;
    kpis?: { name: string; description: string }[];
    spts?: { name: string; target: string }[];
  };
}

const SYSTEM_PROMPT = `You are an expert in LMA (Loan Market Association) transition finance and sustainability-linked loans. Your role is to help African project developers understand how specific LMA clause templates relate to their projects.

Given a clause template and project context, provide practical, actionable guidance in JSON format:

{
  "relevanceScore": <1-10 score of how relevant this clause is to the project>,
  "relevanceSummary": "<1-2 sentence explanation of why this clause matters for this specific project>",
  "howToApply": "<Specific guidance on how to adapt this clause for the project, mentioning project-specific details like sector, KPIs, etc.>",
  "whenToUse": "<Conditions or scenarios when this clause should be included in the loan agreement>",
  "keyConsiderations": ["<consideration 1>", "<consideration 2>", "<consideration 3>"],
  "suggestedModifications": "<Any modifications to consider for African/transition finance context>",
  "contextualizedExample": "<The clause rewritten specifically for this project FROM THE BORROWER'S PERSPECTIVE. Replace all generic placeholders with actual project values.>"
}

CRITICAL FOR contextualizedExample:
- Write FROM THE PROJECT'S PERSPECTIVE as the Borrower
- Replace "[Borrower]" or "[Company]" with the actual project name
- Replace "[specify]", "[insert]", "[TBD]" with actual values from project context
- Use actual KPI names, SPT targets, country, and sector from the project
- Write as ready-to-use legal clause language the project can propose to lenders
- Example: Instead of "The Borrower shall achieve [X]% reduction", write "Kigali Solar Farm Ltd shall achieve 45% emissions reduction"

Keep responses concise and actionable. Focus on practical guidance for project developers negotiating with lenders.`;

export async function POST(request: NextRequest) {
  try {
    const body: ClauseAdviceRequest = await request.json();
    const { clause, projectContext } = body;

    if (!clause?.content || !projectContext?.projectName) {
      return NextResponse.json(
        { error: 'Clause content and project context are required' },
        { status: 400 }
      );
    }

    // Build context-rich prompt
    const userPrompt = `
## CLAUSE TEMPLATE
Type: ${clause.clauseType || 'General'}
Source: ${clause.source || 'LMA Template'}

${clause.content.substring(0, 2000)}

## PROJECT CONTEXT
- Project: ${projectContext.projectName}
- Sector: ${projectContext.sector}
- Country: ${projectContext.country}
- Eligibility Status: ${projectContext.eligibilityStatus}
${projectContext.kpis?.length ? `- KPIs: ${projectContext.kpis.map(k => k.name).join(', ')}` : ''}
${projectContext.spts?.length ? `- SPTs: ${projectContext.spts.map(s => `${s.name}: ${s.target}`).join('; ')}` : ''}

Provide practical guidance for this project developer on how to use this clause.`;

    const result = await callAI({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt,
      temperature: 0.3,
      maxTokens: 800,
      jsonMode: true,
    });

    if (result.success && result.parsed) {
      return NextResponse.json({
        success: true,
        advice: result.parsed,
        provider: result.provider,
      });
    }

    // Return a fallback response if AI fails
    return NextResponse.json({
      success: true,
      advice: {
        relevanceScore: 5,
        relevanceSummary: `This ${clause.clauseType?.replace(/_/g, ' ') || 'clause'} template provides standard LMA language that may need adaptation for your ${projectContext.sector} project.`,
        howToApply: `Review this clause with your legal counsel to determine appropriate modifications for ${projectContext.projectName}.`,
        whenToUse: 'Include in your loan agreement negotiations when structuring sustainability-linked features.',
        keyConsiderations: [
          'Consult with legal counsel familiar with African markets',
          'Ensure alignment with your project timeline',
          'Consider local regulatory requirements'
        ],
        suggestedModifications: 'Work with your DFI partners to adapt standard LMA language for local context.',
        contextualizedExample: `${projectContext.projectName} (the "Borrower"), operating in the ${projectContext.sector} sector in ${projectContext.country}, shall comply with the terms set forth herein.${projectContext.spts?.length ? ` The Borrower commits to achieving the following Sustainability Performance Targets: ${projectContext.spts.map(s => `${s.name} of ${s.target}`).join('; ')}.` : ''}${projectContext.kpis?.length ? ` Performance shall be measured against the following KPIs: ${projectContext.kpis.map(k => k.name).join(', ')}.` : ''}`
      },
      provider: 'fallback',
    });

  } catch (error) {
    console.error('Clause advice error:', error);
    return NextResponse.json(
      { error: 'Failed to generate advice' },
      { status: 500 }
    );
  }
}
