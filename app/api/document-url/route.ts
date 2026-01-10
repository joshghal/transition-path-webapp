import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ResolvedDocument {
  id: number;
  sourceUrl: string;
  finalUrl: string;
  filename: string;
}

// Cache for the document lookup map
let documentLookupCache: Map<string, string> | null = null;

/**
 * Load and parse the NDJSON files, building a filename -> URL map
 */
function loadDocumentLookup(): Map<string, string> {
  if (documentLookupCache) {
    return documentLookupCache;
  }

  const lookup = new Map<string, string>();

  try {
    const ndjsonPaths = [
      path.join(process.cwd(), '..', 'lma-doc-list', 'new_decrement_resolved_pdfs.ndjson'),
      path.join(process.cwd(), '..', 'lma-doc-list', 'resolved_pdfs.ndjson'),
    ];

    for (const ndjsonPath of ndjsonPaths) {
      if (fs.existsSync(ndjsonPath)) {
        const content = fs.readFileSync(ndjsonPath, 'utf-8');
        const lines = content.trim().split('\n');

        for (const line of lines) {
          try {
            const doc: ResolvedDocument = JSON.parse(line);
            if (doc.filename && doc.finalUrl) {
              // Store with original filename (lowercase)
              lookup.set(doc.filename.toLowerCase(), doc.finalUrl);

              // Also store without extension
              const nameWithoutExt = doc.filename.replace(/\.pdf$/i, '').toLowerCase();
              lookup.set(nameWithoutExt, doc.finalUrl);

              // Store normalized version (underscores to spaces, etc.)
              const normalized = doc.filename
                .toLowerCase()
                .replace(/\.pdf$/i, '')
                .replace(/_/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
              lookup.set(normalized, doc.finalUrl);
            }
          } catch {
            // Skip invalid lines
          }
        }
      }
    }
  } catch (error) {
    console.error('Error loading LMA document lookup:', error);
  }

  documentLookupCache = lookup;
  return lookup;
}

/**
 * Extract potential filename from clause ID
 * e.g., "The_ACT_Borrower_s_Guide_chunk_87" -> "The_ACT_Borrower_s_Guide"
 */
function extractBaseFilename(clauseId: string): string {
  return clauseId
    .replace(/_chunk_\d+$/, '')
    .replace(/_pdf$/, '')
    .toLowerCase();
}

// Fallback documents not in the NDJSON files or with special keywords
const FALLBACK_DOCUMENTS: { keywords: string[]; url: string }[] = [
  {
    keywords: ['act_borrower', 'act borrower', 'investment_grade_agreement', 'investment grade'],
    url: 'https://www.slaughterandmay.com/media/3nxndtwn/the-lmas-recommended-forms-of-facility-agreement-for-loans-referencing-risk-free-rates.pdf',
  },
  {
    keywords: ['sbti', 'science_based_targets', 'net_zero_standard', 'net-zero'],
    url: 'https://files.sciencebasedtargets.org/production/files/Net-Zero-Standard.pdf',
  },
  {
    keywords: ['paris_agreement', 'paris agreement', 'unfccc'],
    url: 'https://unfccc.int/sites/default/files/english_paris_agreement.pdf',
  },
  // African Documents
  {
    keywords: ['kenya', 'nigeria', 'tanzania', 'uganda', 'zambia', 'east_africa', 'eanz'],
    url: 'https://www.lma.eu.com/application/files/4915/4643/0846/User_Guide_to_Facility_Agreements_for_Use_in_Kenya_Nigeria_Tanzania_Uganda_and_Zambia.pdf',
  },
  {
    keywords: ['south_african_law', 'south african', 'zaronia'],
    url: 'https://www.lma.eu.com/application/files/9817/6530/3647/Mark_Up_-__South_African_Law_Unsecured_Single_Currency_Single_Borrower_Term_And_Revolving_Facilities_Agreement_With_Rate_Switch.pdf',
  },
  {
    keywords: ['east_african_loan_markets', 'east african loan', 'east african conference'],
    url: 'https://www.lma.eu.com/application/files/3917/6311/1176/East_African_Loan_Markets_Conference_Report.pdf',
  },
  {
    keywords: ['south_african_loan_markets', 'south african loan markets', 'south african sustainable'],
    url: 'https://www.lma.eu.com/application/files/4317/5388/6960/Report_South_African_Loan_Markets_Conference_and_Sustainable_Finance_Seminar_.pdf',
  },
];

/**
 * Check fallback documents for matches
 */
function findFallbackUrl(text: string): string | null {
  const lowerText = text.toLowerCase();
  for (const doc of FALLBACK_DOCUMENTS) {
    if (doc.keywords.some(kw => lowerText.includes(kw))) {
      return doc.url;
    }
  }
  return null;
}

/**
 * Find document URL by source text or clause ID
 */
function findDocumentUrl(sourceOrClauseId: string): string | null {
  const lookup = loadDocumentLookup();
  const lowerText = sourceOrClauseId.toLowerCase();

  // Try fallback documents first (for non-LMA documents)
  const fallbackUrl = findFallbackUrl(lowerText);
  if (fallbackUrl) return fallbackUrl;

  if (lookup.size === 0) return null;

  // Try direct match
  if (lookup.has(lowerText)) {
    return lookup.get(lowerText) || null;
  }

  // Try extracting base filename from clause ID
  const baseFilename = extractBaseFilename(sourceOrClauseId);

  // Check fallback with base filename too
  const fallbackFromBase = findFallbackUrl(baseFilename);
  if (fallbackFromBase) return fallbackFromBase;

  if (lookup.has(baseFilename)) {
    return lookup.get(baseFilename) || null;
  }

  // Try matching by checking if lookup keys contain parts of the search text
  const searchTerms = baseFilename.split('_').filter(t => t.length > 3);

  for (const [filename, url] of lookup.entries()) {
    const matchCount = searchTerms.filter(term => filename.includes(term)).length;
    // If more than 60% of significant terms match, consider it a match
    if (matchCount >= Math.ceil(searchTerms.length * 0.6)) {
      return url;
    }
  }

  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const source = searchParams.get('source');
  const clauseId = searchParams.get('clauseId');

  if (!source && !clauseId) {
    return NextResponse.json({ error: 'source or clauseId parameter required' }, { status: 400 });
  }

  // Try source first, then clauseId
  let url = source ? findDocumentUrl(source) : null;
  if (!url && clauseId) {
    url = findDocumentUrl(clauseId);
  }

  return NextResponse.json({
    url,
    found: !!url,
  });
}
