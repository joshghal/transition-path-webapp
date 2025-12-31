/**
 * Clause Content Formatter
 * Cleans up raw PDF-extracted text for better readability
 * Uses algorithmic approaches rather than hard-coded word lists
 */

// Comprehensive word dictionary for legal/finance domain + common English
// This is used for both word segmentation and validation
const WORD_DICTIONARY = new Set([
  // Common English words (high frequency)
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'else', 'when', 'where',
  'what', 'who', 'how', 'why', 'which', 'that', 'this', 'these', 'those',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in',
  'for', 'on', 'with', 'at', 'by', 'from', 'up', 'about', 'into', 'over',
  'after', 'beneath', 'under', 'above', 'not', 'no', 'yes', 'all', 'each',
  'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'any',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'just',
  'don', 'now', 'here', 'there', 'also', 'its', 'their', 'our', 'your',
  'my', 'his', 'her', 'we', 'you', 'they', 'them', 'us', 'me', 'him', 'it',
  'as', 'per', 'via', 'out', 'off', 'because', 'although', 'unless', 'while',
  'during', 'before', 'since', 'through', 'between', 'against', 'without',

  // Common verbs and their forms
  'include', 'includes', 'included', 'including', 'contain', 'contains',
  'provide', 'provides', 'provided', 'providing', 'require', 'requires',
  'required', 'requiring', 'ensure', 'ensures', 'ensured', 'ensuring',
  'maintain', 'maintains', 'maintained', 'maintaining', 'promote', 'promotes',
  'promoted', 'promoting', 'achieve', 'achieves', 'achieved', 'achieving',
  'consider', 'considers', 'considered', 'considering', 'avoid', 'avoids',
  'avoided', 'avoiding', 'respect', 'respects', 'respected', 'respecting',
  'establish', 'establishes', 'established', 'establishing', 'determine',
  'determines', 'determined', 'determining', 'apply', 'applies', 'applied',
  'applying', 'meet', 'meets', 'met', 'meeting', 'make', 'makes', 'made',
  'making', 'set', 'sets', 'setting', 'take', 'takes', 'took', 'taken',
  'taking', 'use', 'uses', 'used', 'using', 'report', 'reports', 'reported',
  'reporting', 'verify', 'verifies', 'verified', 'verifying', 'assess',
  'assesses', 'assessed', 'assessing', 'manage', 'manages', 'managed',
  'managing', 'develop', 'develops', 'developed', 'developing', 'implement',
  'implements', 'implemented', 'implementing', 'define', 'defines', 'defined',
  'defining', 'specify', 'specifies', 'specified', 'specifying', 'describe',
  'describes', 'described', 'describing', 'demonstrate', 'demonstrates',
  'demonstrated', 'demonstrating', 'support', 'supports', 'supported',
  'supporting', 'follow', 'follows', 'followed', 'following', 'exceed',
  'exceeds', 'exceeded', 'exceeding', 'reduce', 'reduces', 'reduced',
  'reducing', 'increase', 'increases', 'increased', 'increasing', 'track',
  'tracks', 'tracked', 'tracking', 'measure', 'measures', 'measured',
  'measuring', 'calculate', 'calculates', 'calculated', 'calculating',
  'allocate', 'allocates', 'allocated', 'allocating', 'disclose', 'discloses',
  'disclosed', 'disclosing', 'attest', 'attests', 'attested', 'attesting',
  'link', 'links', 'linked', 'linking', 'place', 'places', 'placed', 'placing',

  // Common nouns
  'term', 'terms', 'year', 'years', 'day', 'days', 'month', 'months',
  'time', 'times', 'period', 'periods', 'date', 'dates', 'level', 'levels',
  'value', 'values', 'amount', 'amounts', 'rate', 'rates', 'price', 'prices',
  'cost', 'costs', 'share', 'shares', 'part', 'parts', 'type', 'types',
  'form', 'forms', 'case', 'cases', 'point', 'points', 'way', 'ways',
  'change', 'changes', 'result', 'results', 'basis', 'base', 'source',
  'sources', 'scope', 'scopes', 'range', 'ranges', 'target', 'targets',
  'goal', 'goals', 'plan', 'plans', 'action', 'actions', 'step', 'steps',
  'process', 'processes', 'method', 'methods', 'approach', 'approaches',
  'practice', 'practices', 'standard', 'standards', 'principle', 'principles',
  'policy', 'policies', 'rule', 'rules', 'law', 'laws', 'right', 'rights',
  'access', 'energy', 'water', 'land', 'air', 'health', 'safety', 'security',
  'quality', 'risk', 'risks', 'harm', 'impact', 'impacts', 'effect', 'effects',
  'benefit', 'benefits', 'need', 'needs', 'issue', 'issues', 'factor', 'factors',
  'element', 'elements', 'aspect', 'aspects', 'area', 'areas', 'sector', 'sectors',
  'category', 'categories', 'class', 'classes', 'group', 'groups',

  // Legal/Finance terms
  'loan', 'loans', 'debt', 'debts', 'equity', 'fund', 'funds', 'funding',
  'finance', 'financing', 'financial', 'investment', 'investments', 'investor',
  'investors', 'capital', 'asset', 'assets', 'liability', 'liabilities',
  'borrower', 'borrowers', 'lender', 'lenders', 'creditor', 'creditors',
  'party', 'parties', 'agent', 'agents', 'bank', 'banks', 'facility',
  'facilities', 'commitment', 'commitments', 'obligation', 'obligations',
  'payment', 'payments', 'repayment', 'repayments', 'prepayment', 'prepayments',
  'interest', 'margin', 'margins', 'principal', 'proceeds', 'revenue', 'revenues',
  'income', 'incomes', 'expense', 'expenses', 'profit', 'profits', 'loss', 'losses',
  'balance', 'balances', 'account', 'accounts', 'portfolio', 'portfolios',
  'transaction', 'transactions', 'agreement', 'agreements', 'contract', 'contracts',
  'document', 'documents', 'clause', 'clauses', 'provision', 'provisions',
  'section', 'sections', 'article', 'articles', 'schedule', 'schedules',
  'annex', 'annexes', 'appendix', 'paragraph', 'paragraphs', 'default', 'defaults',
  'breach', 'breaches', 'event', 'events', 'notice', 'notices', 'consent', 'consents',
  'approval', 'approvals', 'waiver', 'waivers', 'amendment', 'amendments',
  'covenant', 'covenants', 'representation', 'representations', 'warranty',
  'warranties', 'condition', 'conditions', 'precedent', 'subsequent',
  'compliance', 'certification', 'certifications', 'verification', 'verifications',
  'disclosure', 'disclosures', 'allocation', 'allocations', 'distribution',
  'distributions', 'placement', 'placements', 'assessment', 'assessments',
  'evaluation', 'evaluations', 'review', 'reviews', 'audit', 'audits',
  'operation', 'operations', 'management', 'requirement', 'requirements',
  'consideration', 'considerations', 'recommendation', 'recommendations',
  'development', 'developments', 'implementation', 'implementations',
  'performance', 'improvement', 'improvements', 'achievement', 'achievements',

  // ESG/Sustainability terms
  'sustainability', 'sustainable', 'transition', 'transitions', 'transitional',
  'climate', 'climatic', 'carbon', 'emission', 'emissions', 'greenhouse', 'gas',
  'gases', 'ghg', 'environment', 'environmental', 'ecology', 'ecological',
  'ecosystem', 'ecosystems', 'biodiversity', 'pollution', 'pollutant', 'pollutants',
  'waste', 'wastes', 'resource', 'resources', 'renewable', 'renewables',
  'decarbonisation', 'decarbonization', 'decarbonise', 'decarbonize',
  'neutrality', 'neutral', 'zero', 'net', 'gross', 'absolute', 'relative',
  'intensity', 'intensities', 'baseline', 'baselines', 'pathway', 'pathways',
  'trajectory', 'trajectories', 'scenario', 'scenarios', 'reduction', 'reductions',
  'mitigation', 'adaptation', 'resilience', 'resilient', 'vulnerability',
  'social', 'societal', 'society', 'community', 'communities', 'labour', 'labor',
  'worker', 'workers', 'employee', 'employees', 'workforce', 'job', 'jobs',
  'employment', 'inclusiveness', 'inclusive', 'inclusion', 'diversity', 'diverse',
  'equity', 'equitable', 'equality', 'equal', 'fair', 'fairness', 'just', 'justice',
  'transparency', 'transparent', 'integrity', 'governance', 'corporate',
  'responsible', 'responsibility', 'responsibilities', 'accountability',
  'accountable', 'stakeholder', 'stakeholders', 'materiality', 'material',

  // Framework/Standard terms
  'framework', 'frameworks', 'guideline', 'guidelines', 'guidance', 'criterion',
  'criteria', 'indicator', 'indicators', 'metric', 'metrics', 'kpi', 'kpis',
  'spt', 'spts', 'sbti', 'lma', 'esg', 'tcfd', 'gri', 'sasb', 'issb',
  'taxonomy', 'taxonomies', 'alignment', 'aligned', 'eligible', 'eligibility',
  'ineligible', 'qualified', 'qualifying', 'compliant', 'non', 'pre', 'post',

  // Additional common words
  'nature', 'natural', 'structural', 'structure', 'structures', 'barrier',
  'barriers', 'product', 'products', 'service', 'services', 'project', 'projects',
  'program', 'programs', 'programme', 'programmes', 'initiative', 'initiatives',
  'activity', 'activities', 'expected', 'periodic', 'periodically', 'annual',
  'annually', 'quarterly', 'monthly', 'regular', 'regularly', 'formal', 'formally',
  'internal', 'internally', 'external', 'externally', 'third', 'party',
  'independent', 'independently', 'significant', 'significantly', 'material',
  'materially', 'substantial', 'substantially', 'relevant', 'relevance',
  'appropriate', 'appropriately', 'applicable', 'available', 'necessary',
  'necessarily', 'sufficient', 'sufficiently', 'adequate', 'adequately',
  'reasonable', 'reasonably', 'specific', 'specifically', 'general', 'generally',
  'particular', 'particularly', 'overall', 'total', 'totals', 'complete',
  'completely', 'full', 'fully', 'partial', 'partially', 'limited', 'unlimited',
  'minimum', 'maximum', 'average', 'averages', 'current', 'currently',
  'existing', 'previous', 'previously', 'future', 'potential', 'potentially',
  'actual', 'actually', 'certain', 'certainly', 'clear', 'clearly', 'direct',
  'directly', 'indirect', 'indirectly', 'primary', 'primarily', 'secondary',
  'key', 'main', 'major', 'minor', 'critical', 'critically', 'essential',
  'essentially', 'fundamental', 'fundamentally', 'core', 'basic', 'basically',
  'transformational', 'transformative', 'transformation', 'necessitates',
  'necessitate', 'unallocated', 'transformationalnature',
]);

/**
 * Check if a word exists in our dictionary (case-insensitive)
 */
function isValidWord(word: string): boolean {
  return WORD_DICTIONARY.has(word.toLowerCase());
}

/**
 * Remove garbled Unicode characters (mathematical symbols, Korean-like characters from PDF formulas)
 */
function cleanGarbledUnicode(text: string): string {
  // Remove Korean Hangul characters (often garbled math symbols from PDFs)
  let cleaned = text.replace(/[\uAC00-\uD7AF]+/g, '[formula]');

  // Remove Mathematical Alphanumeric Symbols
  cleaned = cleaned.replace(/[\u{1D400}-\u{1D7FF}]/gu, '');

  // Remove zero-width characters and other invisible Unicode
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, '');

  // Remove replacement character
  cleaned = cleaned.replace(/\uFFFD/g, '');

  // Clean up multiple [formula] markers
  cleaned = cleaned.replace(/(\[formula\]\s*)+/g, '[formula] ');

  return cleaned;
}

/**
 * Dynamic programming word segmentation for merged text
 * Uses memoization to find optimal word splits
 */
function segmentWords(text: string): string[] {
  const lowerText = text.toLowerCase();
  const n = lowerText.length;

  // Memoization: dp[i] = best segmentation for text[0:i]
  const dp: (string[] | null)[] = new Array(n + 1).fill(null);
  dp[0] = [];

  for (let i = 1; i <= n; i++) {
    // Try all possible last words ending at position i
    for (let j = 0; j < i; j++) {
      if (dp[j] === null) continue;

      const word = lowerText.slice(j, i);

      // Accept words that are in dictionary OR are reasonably short unknown words
      // This handles proper nouns, abbreviations, etc.
      const isAcceptable = isValidWord(word) ||
                          (word.length <= 3 && word.length >= 1) || // Short fragments
                          (word.length >= 4 && dp[i] === null); // Allow unknown if no better option

      if (isAcceptable) {
        const newSegmentation = [...dp[j]!, word];

        // Prefer segmentations with more dictionary words and fewer fragments
        if (dp[i] === null || scoreSegmentation(newSegmentation) > scoreSegmentation(dp[i]!)) {
          dp[i] = newSegmentation;
        }
      }
    }
  }

  return dp[n] || [text];
}

/**
 * Score a segmentation - higher is better
 * Prefers: longer dictionary words, fewer total segments
 */
function scoreSegmentation(segments: string[]): number {
  let score = 0;
  for (const seg of segments) {
    if (isValidWord(seg)) {
      score += seg.length * 2; // Dictionary words worth more
    } else if (seg.length <= 2) {
      score -= 1; // Penalize very short fragments
    } else {
      score += seg.length * 0.5; // Unknown words get partial credit
    }
  }
  // Bonus for fewer segments
  score -= segments.length * 0.5;
  return score;
}

/**
 * Fix words that got merged together during PDF extraction
 * Uses dynamic programming for optimal segmentation
 */
function splitMergedWords(text: string): string {
  // Find sequences of 12+ lowercase letters that might be merged words
  return text.replace(/[a-z]{12,}/gi, (match) => {
    // If it's already a valid word, keep it
    if (isValidWord(match)) {
      return match;
    }

    // Try to segment it
    const segments = segmentWords(match);

    // Only use segmentation if it found meaningful words
    const hasValidWords = segments.some(seg => isValidWord(seg) && seg.length >= 3);

    if (hasValidWords && segments.length > 1) {
      return segments.join(' ');
    }

    return match;
  });
}

/**
 * Fix words that got incorrectly split by PDF extraction
 * Uses aggressive heuristic pattern matching to rejoin fragments
 */
function fixSplitWords(text: string): string {
  let fixed = text;

  // PASS 1: Try to rejoin sequences of small fragments (2-6 chars each)
  // Look for patterns like "trans pare ncy" or "in tegrity"
  // Be aggressive - try combining up to 5 adjacent short fragments

  const tryRecombine = (input: string): string => {
    // Split into words
    const words = input.split(/\s+/);
    const result: string[] = [];
    let i = 0;

    while (i < words.length) {
      // If current word looks like a potential fragment (pure letters, not too long)
      // Increased threshold to 10 to catch "transpare" etc
      if (words[i].length <= 10 && words[i].match(/^[a-z]+$/i)) {
        let bestMatch = words[i];
        let bestLen = 1;

        // Try combining 2, 3, 4, or 5 consecutive words
        for (let len = 2; len <= 5 && i + len <= words.length; len++) {
          // Check if all words in range are potential fragments
          let allFragments = true;
          for (let k = i; k < i + len; k++) {
            // Allow fragments up to 10 chars, must be pure letters
            if (!words[k].match(/^[a-z]+$/i) || words[k].length > 10) {
              allFragments = false;
              break;
            }
          }
          if (!allFragments) break;

          const combined = words.slice(i, i + len).join('').toLowerCase();

          // If combined word is valid and longer than what we'd get keeping separate
          if (isValidWord(combined) && combined.length >= 6) {
            bestMatch = combined;
            bestLen = len;
          }
        }

        result.push(bestMatch);
        i += bestLen;
      } else {
        result.push(words[i]);
        i++;
      }
    }

    return result.join(' ');
  };

  fixed = tryRecombine(fixed);

  // PASS 2: Handle specific common suffix patterns that are often split
  const suffixPatterns: [RegExp, (m: string, p1: string) => string][] = [
    // -tion/-sion endings
    [/\b(\w+)\s+(tion|sion)\b/gi, (m, p1) => {
      const combined = p1.replace(/\s/g, '') + m.match(/(tion|sion)$/i)![0].toLowerCase();
      return isValidWord(combined) ? combined : m;
    }],
    // -ment endings
    [/\b(\w+)\s+ment\b/gi, (m, p1) => {
      const combined = p1.replace(/\s/g, '') + 'ment';
      return isValidWord(combined) ? combined : m;
    }],
    // -ity endings
    [/\b(\w+)\s+ity\b/gi, (m, p1) => {
      const combined = p1.replace(/\s/g, '') + 'ity';
      return isValidWord(combined) ? combined : m;
    }],
    // -ing endings
    [/\b(\w+)\s+ing\b/gi, (m, p1) => {
      const combined = p1.replace(/\s/g, '') + 'ing';
      return isValidWord(combined) ? combined : m;
    }],
    // -ness endings
    [/\b(\w+)\s+ness\b/gi, (m, p1) => {
      const combined = p1.replace(/\s/g, '') + 'ness';
      return isValidWord(combined) ? combined : m;
    }],
    // -ance/-ence endings
    [/\b(\w+)\s+(ance|ence)\b/gi, (m, p1) => {
      const suffix = m.match(/(ance|ence)$/i)![0].toLowerCase();
      const combined = p1.replace(/\s/g, '') + suffix;
      return isValidWord(combined) ? combined : m;
    }],
    // -cy endings (transpare ncy)
    [/\b(\w+)\s+cy\b/gi, (m, p1) => {
      const combined = p1.replace(/\s/g, '') + 'cy';
      return isValidWord(combined) ? combined : m;
    }],
    // -ly endings
    [/\b(\w+)\s+ly\b/gi, (m, p1) => {
      const combined = p1.replace(/\s/g, '') + 'ly';
      return isValidWord(combined) ? combined : m;
    }],
  ];

  for (const [pattern, handler] of suffixPatterns) {
    fixed = fixed.replace(pattern, handler);
  }

  // PASS 3: Handle specific prefix patterns
  const prefixPatterns: [RegExp, (m: string, p2: string) => string][] = [
    // trans- prefix
    [/\b(trans)\s+(\w+)\b/gi, (m, p2) => {
      const combined = 'trans' + p2.toLowerCase();
      return isValidWord(combined) ? combined : m;
    }],
    // pro- prefix
    [/\b(pro)\s+(\w+)\b/gi, (m, p2) => {
      const combined = 'pro' + p2.toLowerCase();
      return isValidWord(combined) ? combined : m;
    }],
    // in- prefix
    [/\b(in)\s+(\w+)\b/gi, (m, p2) => {
      const combined = 'in' + p2.toLowerCase();
      return isValidWord(combined) ? combined : m;
    }],
    // re- prefix
    [/\b(re)\s+(\w+)\b/gi, (m, p2) => {
      const combined = 're' + p2.toLowerCase();
      return isValidWord(combined) ? combined : m;
    }],
    // de- prefix
    [/\b(de)\s+(\w+)\b/gi, (m, p2) => {
      const combined = 'de' + p2.toLowerCase();
      return isValidWord(combined) ? combined : m;
    }],
  ];

  for (const [pattern, handler] of prefixPatterns) {
    fixed = fixed.replace(pattern, handler);
  }

  return fixed;
}

/**
 * Clean up spacing issues from PDF extraction
 */
function fixSpacingIssues(text: string): string {
  let fixed = text;

  // First fix commonly split words using heuristics
  fixed = fixSplitWords(fixed);

  // Remove stray backslashes (PDF artifacts)
  fixed = fixed.replace(/\\\s*/g, ' ');

  // Fix spaces that got removed between words (lowercase followed by uppercase)
  fixed = fixed.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Fix missing space after periods (but not decimals or abbreviations)
  fixed = fixed.replace(/\.([A-Z][a-z])/g, '. $1');

  // Fix missing space after commas
  fixed = fixed.replace(/,([A-Za-z])/g, ', $1');

  // Fix missing space after colons (but not in times like 10:30)
  fixed = fixed.replace(/:([A-Za-z])/g, ': $1');

  // Fix missing space after semicolons
  fixed = fixed.replace(/;([A-Za-z])/g, '; $1');

  // Fix spaces removed around parentheses
  fixed = fixed.replace(/\)([A-Za-z])/g, ') $1');
  fixed = fixed.replace(/([A-Za-z])\(/g, '$1 (');

  // Fix percentage signs without spaces
  fixed = fixed.replace(/%([A-Za-z])/g, '% $1');

  // Fix "and/or" patterns that got broken
  fixed = fixed.replace(/\/ ([a-z])/g, '/$1');

  return fixed;
}

export function formatClauseContent(content: string): string {
  let formatted = content;

  // STEP 1: Clean garbled Unicode/math symbols first
  formatted = cleanGarbledUnicode(formatted);

  // STEP 2: Fix spacing issues (includes split word fixes)
  formatted = fixSpacingIssues(formatted);

  // STEP 3: Split merged words using DP algorithm
  formatted = splitMergedWords(formatted);

  // Remove page numbers like "- 113 -", "- 114 -"
  formatted = formatted.replace(/\s*-\s*\d+\s*-\s*/g, '\n\n');

  // Remove LMA document headers/footers
  formatted = formatted.replace(/LMA\.[A-Z]+\.[A-Za-z]+\.[A-Za-z]+\.?\s*\d*\s*\d+\s*[A-Za-z]+\s*\d+/g, '');
  formatted = formatted.replace(/LMA\.\w+\.\w+\.\w+\.\w+\.?\s*\d*/g, '');

  // Remove date patterns at end of lines (like "23 September 201928 February 2020")
  formatted = formatted.replace(/\d{1,2}\s+[A-Za-z]+\s+\d{4}\d{1,2}\s+[A-Za-z]+\s+\d{4}/g, '');
  formatted = formatted.replace(/\d{1,2}\s+[A-Za-z]+\s+\d{4}\s*$/gm, '');

  // Clean up "Facility X Commitment" headers that are artifacts
  formatted = formatted.replace(/Facility [A-Z] Commitment\s*(Name of Original Lender)?/g, '\n');

  // Remove "SBTi Corporate Net-Zero Standard" page footers
  formatted = formatted.replace(/SBTi Corporate Net-Zero Standard[^\n]*\|\s*\d+/gi, '');

  // Remove "ANNEX" headers that are artifacts
  formatted = formatted.replace(/ANNEX\s+[A-Z]:\s*[A-Z\s]+(?=\n)/g, '');

  // Format SCHEDULE headers
  formatted = formatted.replace(/SCHEDULE\s+(\d+)/g, '\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nSCHEDULE $1\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Format PART headers
  formatted = formatted.replace(/PART\s+([IVX]+)\s+/g, '\n\n▸ PART $1: ');

  // Format numbered sections (1., 2., etc.)
  formatted = formatted.replace(/^(\d+)\.\s+([A-Z][a-z]+)/gm, '\n\n$1. $2');

  // Format lettered subsections ((a), (b), etc.)
  formatted = formatted.replace(/\(([a-z])\)\s+/g, '\n   ($1) ');

  // Format roman numeral subsections ((i), (ii), etc.)
  formatted = formatted.replace(/\(([ivx]+)\)\s+/g, '\n      ($1) ');

  // Clean up multiple consecutive newlines (max 2)
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  // Clean up spaces before punctuation
  formatted = formatted.replace(/\s+([.,;:])/g, '$1');

  // Clean up multiple spaces
  formatted = formatted.replace(/  +/g, ' ');

  // Trim whitespace from start and end
  formatted = formatted.trim();

  // Add proper paragraph breaks after periods followed by capital letters
  formatted = formatted.replace(/\.\s+([A-Z])/g, '.\n\n$1');

  // But fix cases where we broke numbered items
  formatted = formatted.replace(/\.\n\n(\d+\.)/g, '.\n\n$1');

  return formatted;
}

/**
 * Extract key terms from clause content for highlighting
 */
export function extractKeyTerms(content: string): string[] {
  const keyTermPatterns = [
    /[""]([^""]+)[""]/g,  // Quoted definitions
    /\b(Borrower|Lender|Agent|Guarantor|Obligor)\b/g,
    /\b(Facility|Commitment|Utilisation|Finance Documents?)\b/g,
    /\b(KPI|SPT|GHG|ESG|SBTi)\b/g,
    /\b(Margin|Interest|Rate|SOFR|SONIA|LIBOR)\b/g,
  ];

  const terms = new Set<string>();

  for (const pattern of keyTermPatterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        terms.add(match[1]);
      } else {
        terms.add(match[0]);
      }
    }
  }

  return Array.from(terms).slice(0, 20);
}

/**
 * Get a clean preview of clause content
 */
export function getClausePreview(content: string, maxLength: number = 200): string {
  const formatted = formatClauseContent(content);

  if (formatted.length <= maxLength) {
    return formatted;
  }

  // Find a good break point (end of sentence or clause)
  let breakPoint = formatted.lastIndexOf('. ', maxLength);
  if (breakPoint === -1 || breakPoint < maxLength * 0.5) {
    breakPoint = formatted.lastIndexOf(' ', maxLength);
  }
  if (breakPoint === -1) {
    breakPoint = maxLength;
  }

  return formatted.substring(0, breakPoint) + '...';
}
