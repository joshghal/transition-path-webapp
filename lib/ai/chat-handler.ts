// Chat-specific AI Handler using ASI1-mini
// Separate from main Groq handler to reduce Groq usage

const ASI1_API_URL = 'https://api.asi1.ai/v1/chat/completions';
const ASI1_MODEL = 'asi1-mini';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionOptions {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface ChatCompletionResult {
  success: boolean;
  content?: string;
  error?: string;
  duration: number;
}

export async function callChatAI(options: ChatCompletionOptions): Promise<ChatCompletionResult> {
  const {
    messages,
    temperature = 0.3,
    maxTokens = 1500
  } = options;

  const apiKey = process.env.ASI1_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: 'ASI1_API_KEY not configured',
      duration: 0
    };
  }

  const start = Date.now();

  try {
    const response = await fetch(ASI1_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: ASI1_MODEL,
        messages,
        temperature,
        max_tokens: maxTokens
      })
    });

    const duration = Date.now() - start;

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `ASI1 API error ${response.status}: ${errorText.substring(0, 200)}`,
        duration
      };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return {
        success: false,
        error: 'ASI1 returned empty response',
        duration
      };
    }

    return {
      success: true,
      content,
      duration
    };

  } catch (error) {
    return {
      success: false,
      error: `ASI1 request failed: ${error instanceof Error ? error.message : String(error)}`,
      duration: Date.now() - start
    };
  }
}

// Parse JSON from AI response (handles markdown code blocks)
export function parseJSONResponse<T>(content: string): T | null {
  try {
    // Try direct parse first
    return JSON.parse(content);
  } catch {
    // Try to extract JSON from markdown code block
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1].trim());
      } catch {
        // Fall through
      }
    }

    // Try to find JSON object in content
    const objectMatch = content.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]);
      } catch {
        // Fall through
      }
    }

    return null;
  }
}
