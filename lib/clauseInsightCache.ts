// LocalStorage cache for clause insights (summary + example)
// Persists across sessions so users don't need to regenerate

const CACHE_KEY_PREFIX = 'verdex_clause_insight_';
const CACHE_VERSION = 'v1';

/**
 * Parse summary text into bullet points array
 * Handles various formats: •, -, *, numbered lists, or plain newlines
 */
export function parseSummaryBullets(summary: string): string[] {
  if (!summary) return [];

  // Split by newlines first
  const lines = summary.split(/\n/).map(line => line.trim()).filter(Boolean);

  // If only one line, try splitting by bullet characters
  if (lines.length === 1) {
    // Try splitting by bullet markers (• or - or *)
    const bulletSplit = summary.split(/(?:^|[•\-\*])\s*/).filter(s => s.trim());
    if (bulletSplit.length > 1) {
      return bulletSplit.map(s => s.trim());
    }
  }

  // Clean each line - remove leading bullets, dashes, asterisks, or numbers
  return lines.map(line =>
    line.replace(/^(?:[•\-\*]|\d+[.\)])\s*/, '').trim()
  ).filter(Boolean);
}

export interface CachedClauseInsight {
  summary: string;
  example: string;
  generatedAt: number; // timestamp
  version: string;
}

function getCacheKey(clauseId: string): string {
  return `${CACHE_KEY_PREFIX}${clauseId}`;
}

/**
 * Get cached insight for a clause
 * Returns null if not cached or if cache is invalid
 */
export function getCachedInsight(clauseId: string): CachedClauseInsight | null {
  if (typeof window === 'undefined') return null;

  try {
    const key = getCacheKey(clauseId);
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    const parsed: CachedClauseInsight = JSON.parse(cached);

    // Validate cache version
    if (parsed.version !== CACHE_VERSION) {
      localStorage.removeItem(key);
      return null;
    }

    // Validate required fields
    if (!parsed.summary || !parsed.example) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Error reading clause insight cache:', error);
    return null;
  }
}

/**
 * Save insight to cache
 */
export function setCachedInsight(
  clauseId: string,
  insight: { summary: string; example: string }
): void {
  if (typeof window === 'undefined') return;

  try {
    const key = getCacheKey(clauseId);
    const cacheEntry: CachedClauseInsight = {
      ...insight,
      generatedAt: Date.now(),
      version: CACHE_VERSION
    };

    localStorage.setItem(key, JSON.stringify(cacheEntry));
  } catch (error) {
    // localStorage might be full or disabled
    console.error('Error saving clause insight to cache:', error);
  }
}

/**
 * Check if insight exists in cache
 */
export function hasInsightCached(clauseId: string): boolean {
  return getCachedInsight(clauseId) !== null;
}

/**
 * Clear a specific insight from cache
 */
export function clearCachedInsight(clauseId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const key = getCacheKey(clauseId);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing clause insight cache:', error);
  }
}

/**
 * Clear all cached insights (useful for debugging or cache invalidation)
 */
export function clearAllCachedInsights(): void {
  if (typeof window === 'undefined') return;

  try {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_KEY_PREFIX)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing all clause insight caches:', error);
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { count: number; totalSize: number } {
  if (typeof window === 'undefined') return { count: 0, totalSize: 0 };

  try {
    let count = 0;
    let totalSize = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_KEY_PREFIX)) {
        count++;
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += value.length * 2; // Approximate bytes (UTF-16)
        }
      }
    }

    return { count, totalSize };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return { count: 0, totalSize: 0 };
  }
}
