// Remote Embeddings via Railway API
// Replaces local @xenova/transformers which doesn't work on Vercel serverless

const EMBEDDING_API_URL = process.env.EMBEDDING_API_URL || 'https://verdex-embedding-service-production.up.railway.app';

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch(`${EMBEDDING_API_URL}/embed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: text }),
    });

    if (!response.ok) {
      throw new Error(`Embedding API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.error('Failed to generate embedding:', error);
    throw error;
  }
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    // Batch request - more efficient than individual calls
    const response = await fetch(`${EMBEDDING_API_URL}/embed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: texts }),
    });

    if (!response.ok) {
      throw new Error(`Embedding API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.error('Failed to generate embeddings:', error);
    throw error;
  }
}

// Simple text-based similarity for fallback when Pinecone is empty
export function simpleTextSearch(
  query: string,
  documents: { id: string; content: string; metadata: any }[],
  topK: number = 5
): { id: string; score: number; content: string; metadata: any }[] {
  const queryTerms = query.toLowerCase().split(/\s+/);

  const scored = documents.map(doc => {
    const contentLower = doc.content.toLowerCase();
    let score = 0;

    for (const term of queryTerms) {
      if (contentLower.includes(term)) {
        score += 1;
        // Boost for exact phrase match
        if (contentLower.includes(query.toLowerCase())) {
          score += 2;
        }
      }
    }

    // Normalize by query length
    score = score / queryTerms.length;

    return { ...doc, score };
  });

  return scored
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
