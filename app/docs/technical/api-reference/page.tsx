import DocPage, { CodeBlock, InfoBox } from '@/components/docs/DocPage';

export const metadata = {
  title: 'API Reference | Verdex Docs',
  description: 'API documentation for integrating with Verdex',
};

export default function APIReferencePage() {
  return (
    <DocPage
      title="API Reference"
      description="Technical reference for integrating with the Verdex platform API."
      breadcrumbs={[{ label: 'Technical' }, { label: 'API Reference' }]}
      previousPage={{ title: 'Knowledge Base', href: '/docs/technical/knowledge-base' }}
      nextPage={{ title: 'Market Opportunity', href: '/docs/business/market-opportunity' }}
      tableOfContents={[
        { id: 'overview', title: 'Overview', level: 2 },
        { id: 'assess-endpoint', title: 'Assess Endpoint', level: 2 },
        { id: 'search-endpoint', title: 'Search Endpoint', level: 2 },
      ]}
    >
      <h2 id="overview" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Overview
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        The Verdex API provides programmatic access to project assessment, DFI matching, and clause search functionality.
      </p>

      <InfoBox type="warning" title="API Access">
        API access is available on Professional and Enterprise plans. Contact us for API credentials.
      </InfoBox>

      <h2 id="assess-endpoint" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        POST /api/assess
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Submit a project for LMA transition eligibility assessment.
      </p>

      <CodeBlock
        language="typescript"
        code={`// Request
POST /api/assess
Content-Type: application/json

{
  "projectName": "Kano Solar Farm Phase II",
  "country": "Nigeria",
  "sector": "renewable_energy",
  "financingAmount": 50000000,
  "description": "200MW solar PV installation...",
  "pdfBase64": "base64-encoded-pdf..." // optional
}

// Response
{
  "eligibilityStatus": "eligible",
  "overallScore": 75,
  "components": {
    "strategyAlignment": 18,
    "useOfProceeds": 20,
    "targetAmbition": 15,
    "reporting": 12,
    "projectSelection": 10
  },
  "greenwashingRisk": "low",
  "dfiMatches": [
    { "name": "IFC", "fitScore": 95 },
    { "name": "AfDB", "fitScore": 88 }
  ],
  "improvements": [
    "Consider adding third-party verification plan",
    "Strengthen Scope 3 emissions tracking"
  ]
}`}
      />

      <h2 id="search-endpoint" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        POST /api/search
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Search the LMA clause library using semantic search.
      </p>

      <CodeBlock
        language="typescript"
        code={`// Request
POST /api/search
Content-Type: application/json

{
  "query": "margin ratchet sustainability linked",
  "limit": 10,
  "filters": {
    "clauseType": "margin_ratchet"
  }
}

// Response
{
  "results": [
    {
      "id": "clause_001",
      "content": "The Applicable Margin shall be adjusted...",
      "clauseType": "margin_ratchet",
      "documentType": "facility_agreement",
      "similarity": 0.92
    }
  ]
}`}
      />

    </DocPage>
  );
}
