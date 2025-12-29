import DocPage, { InfoBox, DataTable, CodeBlock } from '@/components/docs/DocPage';

export const metadata = {
  title: 'LMA Transition Validator | Verdex Docs',
  description: 'Validate projects against the LMA 5 Core Components for Transition Loans',
};

export default function LMAValidatorPage() {
  return (
    <DocPage
      title="LMA Transition Eligibility Validator"
      description="Validate projects against the LMA's 5 Core Components for Transition Loans with AI-powered scoring and gap analysis."
      breadcrumbs={[{ label: 'Features' }, { label: 'LMA Validator' }]}
      previousPage={{ title: 'Solution Overview', href: '/docs/solution-overview' }}
      nextPage={{ title: 'DFI Matching', href: '/docs/features/dfi-matching' }}
      tableOfContents={[
        { id: 'overview', title: 'Overview', level: 2 },
        { id: 'five-components', title: 'The 5 Components', level: 2 },
        { id: 'scoring', title: 'Scoring Framework', level: 2 },
        { id: 'flow', title: 'Validation Flow', level: 2 },
        { id: 'implementation', title: 'Implementation', level: 2 },
      ]}
    >
      <h2 id="overview" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Overview
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        The LMA Transition Eligibility Validator is the core feature of Verdex. It assesses projects against the <strong>LMA&apos;s 5 Core Components</strong> for Transition Loans, as defined in the <em>Guide to Transition Loans</em> (October 2025).
      </p>

      <InfoBox type="info" title="LMA Transition Loan Guide">
        The LMA Transition Loan Guide provides the first comprehensive framework specifically for transition loans, making compliant transition finance more critical than ever. Verdex implements these principles for automated assessment.
      </InfoBox>

      <h2 id="five-components" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        The 5 Assessment Components
      </h2>

      <DataTable
        headers={['#', 'Component', 'Max Score', 'Key Criteria']}
        rows={[
          ['1', <span key="1" className="font-semibold text-verdex-700">Strategy Alignment</span>, '20', 'Published plan (10), SBTi reference (5), Paris alignment (5)'],
          ['2', <span key="2" className="font-semibold text-verdex-700">Use of Proceeds</span>, '20', 'Clear description (10), Project type (5), Transition activities (5)'],
          ['3', <span key="3" className="font-semibold text-verdex-700">Target Ambition</span>, '20', 'Reduction target ≥42% (15), Near-term year (5)'],
          ['4', <span key="4" className="font-semibold text-verdex-700">Reporting & Verification</span>, '20', 'Third-party verification (15), Scope 3 measured (5)'],
          ['5', <span key="5" className="font-semibold text-verdex-700">Project Selection</span>, '20', 'High-priority sector (10), Financing structure (5), Equity ≥20% (5)'],
        ]}
      />

      <h2 id="scoring" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Scoring Framework
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Projects receive a total score out of 100, with eligibility determined by threshold levels:
      </p>

      <div className="my-6 space-y-3">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-verdex-50 border border-verdex-200">
          <div className="w-16 h-16 rounded-xl bg-verdex-500 flex items-center justify-center text-white font-bold text-lg">≥60</div>
          <div>
            <div className="font-semibold text-verdex-800">ELIGIBLE</div>
            <div className="text-sm text-verdex-600">Meets transition loan criteria</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="w-16 h-16 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold text-lg">30-59</div>
          <div>
            <div className="font-semibold text-amber-800">PARTIAL</div>
            <div className="text-sm text-amber-600">Improvements needed, conditional eligibility</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-rose-50 border border-rose-200">
          <div className="w-16 h-16 rounded-xl bg-rose-500 flex items-center justify-center text-white font-bold text-lg">&lt;30</div>
          <div>
            <div className="font-semibold text-rose-800">NOT ELIGIBLE</div>
            <div className="text-sm text-rose-600">Significant gaps exist</div>
          </div>
        </div>
      </div>

      <InfoBox type="warning" title="Greenwashing Penalty">
        Greenwashing risk detection can deduct 3-60 points from the total score based on identified red flags.
      </InfoBox>

      <h2 id="flow" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Validation Flow
      </h2>

      <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-verdex-50/30 border border-verdex-100">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
            <div>
              <div className="font-semibold text-gray-900">Input Processing</div>
              <div className="text-sm text-gray-600">Project PDF + Description + Emissions Baseline uploaded</div>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-verdex-200 h-4" />
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
            <div>
              <div className="font-semibold text-gray-900">AI Document Extractor</div>
              <div className="text-sm text-gray-600">Extracts: Country, Sector, Project Type, Size USD, Emissions, Strategy</div>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-verdex-200 h-4" />
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
            <div>
              <div className="font-semibold text-gray-900">LMA Validator</div>
              <div className="text-sm text-gray-600">Checks each criterion across all 5 components</div>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-verdex-200 h-4" />
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
            <div>
              <div className="font-semibold text-gray-900">Greenwash Detector</div>
              <div className="text-sm text-gray-600">Red flag pattern matching and risk assessment</div>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-verdex-200 h-4" />
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-verdex-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">5</div>
            <div>
              <div className="font-semibold text-gray-900">Results Output</div>
              <div className="text-sm text-gray-600">Overall Score, Component Breakdown, Gaps & Recommendations, Risk Level</div>
            </div>
          </div>
        </div>
      </div>

      <h2 id="implementation" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Technical Implementation
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        The validation engine is implemented in TypeScript with the following interface:
      </p>

      <CodeBlock
        language="typescript"
        code={`// LMA Validation Engine
interface ValidationResult {
  eligibilityStatus: 'eligible' | 'partial' | 'ineligible';
  overallScore: number;
  components: {
    strategyAlignment: ComponentScore;     // Max 20
    useOfProceeds: ComponentScore;         // Max 20
    projectSelection: ComponentScore;      // Max 20
    proceedsManagement: ComponentScore;    // Max 20
    reporting: ComponentScore;             // Max 20
  };
  greenwashingRisk: 'low' | 'medium' | 'high';
  redFlags: string[];
  improvements: string[];
}

// Scoring criteria from LMA Transition Loan Guide
const LMA_CRITERIA = {
  strategyAlignment: {
    hasPublishedPlan: 8,           // Published transition strategy
    parisAlignment: 7,              // 1.5°C or well-below 2°C
    entityWideScope: 5,             // Not just project-level
    thirdPartyVerification: 5       // External review
  },
  useOfProceeds: {
    eligibleActivities: 10,         // Funds transition activities
    quantifiableReductions: 8,      // Measurable emissions impact
    noLockIn: 7                     // Avoids carbon lock-in
  }
  // ... additional components
};`}
      />

      <InfoBox type="tip" title="API Access">
        The LMA Validator is accessible via the platform UI or through our API for integration into existing workflows. See the <a href="/docs/technical/api-reference" className="text-verdex-600 hover:underline">API Reference</a> for details.
      </InfoBox>

    </DocPage>
  );
}
