import DocPage, { InfoBox, FlowDiagram } from '@/components/docs/DocPage';
import Link from 'next/link';

export const metadata = {
  title: 'Quick Start | Verdex Docs',
  description: 'Get started with Verdex in minutes',
};

export default function QuickStartPage() {
  return (
    <DocPage
      title="Quick Start Guide"
      description="Get started with Verdex in minutes. Learn how to assess your first project and understand the results."
      breadcrumbs={[{ label: 'Getting Started' }, { label: 'Quick Start' }]}
      previousPage={{ title: 'Executive Summary', href: '/docs/executive-summary' }}
      nextPage={{ title: 'Climate Finance Gap', href: '/docs/problem/climate-finance-gap' }}
      tableOfContents={[
        { id: 'step-1', title: 'Step 1: Prepare Your Project', level: 2 },
        { id: 'step-2', title: 'Step 2: Submit for Assessment', level: 2 },
        { id: 'step-3', title: 'Step 3: Review Results', level: 2 },
        { id: 'step-4', title: 'Step 4: Take Action', level: 2 },
      ]}
    >
      <FlowDiagram
        steps={[
          { title: 'Prepare', description: 'Gather project info' },
          { title: 'Submit', description: 'Upload & describe' },
          { title: 'Review', description: 'Analyze results' },
          { title: 'Act', description: 'Next steps' },
        ]}
      />

      <h2 id="step-1" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Step 1: Prepare Your Project Information
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Before starting the assessment, gather the following information about your project:
      </p>

      <div className="my-6 p-6 rounded-xl bg-verdex-50 border border-verdex-100">
        <h3 className="font-semibold text-verdex-800 mb-4">Required Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Project Name', example: 'Kano Solar Farm Phase II' },
            { label: 'Country', example: 'Nigeria, Kenya, South Africa...' },
            { label: 'Sector', example: 'Renewable Energy, Mining, Agriculture' },
            { label: 'Financing Amount', example: 'USD 50,000,000' },
            { label: 'Project Description', example: '200MW solar PV installation...' },
            { label: 'PDF Documentation', example: 'Project proposal, feasibility study' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-verdex-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500">{item.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="tip" title="Best Results">
        For the best assessment results, include a project PDF with detailed information about your transition strategy, emissions data, and financing structure.
      </InfoBox>

      <h2 id="step-2" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Step 2: Submit for Assessment
      </h2>

      <ol className="space-y-4 my-6">
        <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
          <div>
            <div className="font-semibold text-gray-900">Navigate to the Assessment Page</div>
            <div className="text-sm text-gray-600 mt-1">
              Click <Link href="/assess" className="text-verdex-600 hover:underline font-medium">Assess Project</Link> in the navigation or visit <code className="bg-gray-100 px-2 py-0.5 rounded">/assess</code>
            </div>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
          <div>
            <div className="font-semibold text-gray-900">Fill in Project Details</div>
            <div className="text-sm text-gray-600 mt-1">Enter your project name, select country and sector, and specify the financing amount</div>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
          <div>
            <div className="font-semibold text-gray-900">Upload Documentation (Optional)</div>
            <div className="text-sm text-gray-600 mt-1">Upload a PDF of your project proposal or feasibility study for deeper analysis</div>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
          <div>
            <div className="font-semibold text-gray-900">Submit for Analysis</div>
            <div className="text-sm text-gray-600 mt-1">Click &quot;Assess Project&quot; and wait for the AI analysis to complete</div>
          </div>
        </li>
      </ol>

      <h2 id="step-3" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Step 3: Review Your Results
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Your assessment results include:
      </p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        {[
          { title: 'Overall Score', desc: 'LMA eligibility score out of 100' },
          { title: '5 Component Breakdown', desc: 'Detailed scoring per LMA component' },
          { title: 'DFI Matches', desc: 'Recommended Development Finance Institutions' },
          { title: 'Greenwashing Risk', desc: 'Red flag detection and risk level' },
          { title: 'KPI Recommendations', desc: 'Suggested sustainability metrics' },
          { title: 'Improvement Actions', desc: 'Steps to improve your score' },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white border border-gray-100">
            <div className="font-semibold text-gray-900">{item.title}</div>
            <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
          </div>
        ))}
      </div>

      <h2 id="step-4" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Step 4: Take Action
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Based on your results:
      </p>

      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl bg-verdex-50 border border-verdex-200">
          <div className="font-semibold text-verdex-800">Score 60+: Eligible</div>
          <div className="text-sm text-verdex-600 mt-1">Download your PDF report and reach out to matched DFIs</div>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="font-semibold text-amber-800">Score 30-59: Partial</div>
          <div className="text-sm text-amber-600 mt-1">Review improvement recommendations and address gaps before approaching lenders</div>
        </div>
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
          <div className="font-semibold text-rose-800">Score &lt;30: Not Eligible</div>
          <div className="text-sm text-rose-600 mt-1">Significant work needed on transition strategy and documentation</div>
        </div>
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-verdex-500 to-verdex-600 text-white">
        <h3 className="text-xl font-semibold mb-2">Ready to assess your project?</h3>
        <p className="text-verdex-100 mb-4">Get your LMA compliance score in minutes</p>
        <Link
          href="/assess"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-verdex-700 font-semibold rounded-xl hover:bg-verdex-50 transition-colors"
        >
          Start Assessment
        </Link>
      </div>

    </DocPage>
  );
}
