import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/ai/api-handler';

// PDF parsing with pdf-parse
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF');
  }
}

// Extract structured data from PDF text using AI
async function extractProjectData(text: string): Promise<{
  projectName: string;
  country: string;
  sector: string;
  projectType: string;
  description: string;
  climateTargets: string;
  financingNeeded: number | null;
  debtAmount: number | null;
  equityAmount: number | null;
  transitionPlan: string;
  baselineEmissions: string;
  currentScope1: number | null;
  currentScope2: number | null;
  currentScope3: number | null;
  targetScope1: number | null;
  targetScope2: number | null;
  targetScope3: number | null;
  targetYear: number | null;
  verificationStatus: string;
}> {
  const systemPrompt = `You are an expert at extracting project information from documents for transition finance assessments. Extract ALL requested fields with precision. For numeric fields, extract actual numbers mentioned in the document. Respond in JSON format only.`;

  const userPrompt = `Analyze the following document text and extract project information. Extract these fields:

1. projectName: The name of the project or company
2. country: The country where the project is located
3. sector: The industry sector (Energy, Manufacturing, Agriculture, Transport, Mining, Real Estate, Water)
4. projectType: Specific project type (e.g., "Solar PV", "Wind Farm", "Coffee Processing", "EV Fleet")
5. description: A brief description of the project and its transition goals (2-3 sentences)
6. climateTargets: Any climate or emissions reduction targets mentioned as text
7. financingNeeded: Total financing/investment amount in USD (number only, convert from millions if needed)
8. debtAmount: Debt/loan amount in USD (number only, or null if not mentioned)
9. equityAmount: Equity amount in USD (number only, or null if not mentioned)
10. transitionPlan: Summary of transition plan or strategy
11. baselineEmissions: Baseline emissions description as text
12. currentScope1: Current Scope 1 emissions in tCO2e/year (number only, or null)
13. currentScope2: Current Scope 2 emissions in tCO2e/year (number only, or null)
14. currentScope3: Current Scope 3 emissions in tCO2e/year (number only, or null)
15. targetScope1: Target Scope 1 emissions in tCO2e/year (number only, or null)
16. targetScope2: Target Scope 2 emissions in tCO2e/year (number only, or null)
17. targetScope3: Target Scope 3 emissions in tCO2e/year (number only, or null)
18. targetYear: Target year for emissions reduction (e.g., 2030, or null if not mentioned)
19. verificationStatus: Any third-party verification or certification mentioned

IMPORTANT: For emissions fields, look for numbers like "12,500 tCO2e" or "current emissions: 15,000 tonnes CO2".
For financing, convert "USD 25 million" to 25000000.

Document text:
${text.substring(0, 8000)}

Respond in JSON format only:
{
  "projectName": "",
  "country": "",
  "sector": "",
  "projectType": "",
  "description": "",
  "climateTargets": "",
  "financingNeeded": null,
  "debtAmount": null,
  "equityAmount": null,
  "transitionPlan": "",
  "baselineEmissions": "",
  "currentScope1": null,
  "currentScope2": null,
  "currentScope3": null,
  "targetScope1": null,
  "targetScope2": null,
  "targetScope3": null,
  "targetYear": null,
  "verificationStatus": ""
}`;

  try {
    const result = await callAI({
      systemPrompt,
      userPrompt,
      jsonMode: true,
      temperature: 0.1,
      maxTokens: 1500
    });

    if (result.success && result.parsed) {
      return result.parsed;
    }

    throw new Error(result.error || 'Failed to parse AI response');
  } catch (error) {
    console.error('AI extraction error:', error);
    // Return empty structure on error
    return {
      projectName: '',
      country: '',
      sector: '',
      projectType: '',
      description: '',
      climateTargets: '',
      financingNeeded: null,
      debtAmount: null,
      equityAmount: null,
      transitionPlan: '',
      baselineEmissions: '',
      currentScope1: null,
      currentScope2: null,
      currentScope3: null,
      targetScope1: null,
      targetScope2: null,
      targetScope3: null,
      targetYear: null,
      verificationStatus: '',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text from PDF
    const text = await extractTextFromPDF(buffer);

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from PDF. The file may be scanned or image-based.' },
        { status: 400 }
      );
    }

    // Extract structured data using AI
    const extractedData = await extractProjectData(text);

    return NextResponse.json({
      success: true,
      extractedText: text.substring(0, 2000), // Preview of extracted text
      rawDocumentText: text, // Full text for greenwashing analysis
      extractedFields: extractedData,
      textLength: text.length,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process PDF' },
      { status: 500 }
    );
  }
}
