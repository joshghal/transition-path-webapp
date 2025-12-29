import DocPage, { InfoBox, DataTable } from '@/components/docs/DocPage';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Greenwash Detection | Verdex Docs',
  description: 'AI-powered greenwashing detection and risk scoring for transition projects',
};

export default function GreenwashDetectionPage() {
  return (
    <DocPage
      title="Greenwashing Detection"
      description="Identify red flags that could derail financing or expose lenders to reputational risk."
      breadcrumbs={[{ label: 'Features' }, { label: 'Greenwash Detection' }]}
      previousPage={{ title: 'DFI Matching', href: '/docs/features/dfi-matching' }}
      nextPage={{ title: 'KPI Generator', href: '/docs/features/kpi-generator' }}
      tableOfContents={[
        { id: 'overview', title: 'Overview', level: 2 },
        { id: 'red-flags', title: 'Red Flag Patterns', level: 2 },
        { id: 'risk-scoring', title: 'Risk Scoring', level: 2 },
      ]}
    >
      <h2 id="overview" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Overview
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        Greenwashing detection is critical in today&apos;s regulatory environment. With fines reaching <strong>USD 17.5 million</strong> for misleading sustainability claims, Verdex&apos;s AI-powered detection helps identify risks before they derail financing.
      </p>

      <div className="flex items-center gap-4 p-6 rounded-2xl bg-amber-50 border border-amber-200 my-8">
        <AlertTriangle className="w-12 h-12 text-amber-600 flex-shrink-0" />
        <div>
          <div className="font-semibold text-amber-800">Greenwashing Risk</div>
          <div className="text-sm text-amber-700">Can deduct 3-60 points from the LMA validation score based on red flags detected</div>
        </div>
      </div>

      <h2 id="red-flags" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Red Flag Patterns Detected
      </h2>

      <DataTable
        headers={['Category', 'Red Flag', 'Risk Level']}
        rows={[
          [<span key="1" className="font-semibold">Vague Commitments</span>, '"Net zero by 2050" without interim targets', <span key="1r" className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">HIGH</span>],
          [<span key="2" className="font-semibold">Missing Scope 3</span>, 'Material sectors without value chain targets', <span key="2r" className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">HIGH</span>],
          [<span key="3" className="font-semibold">BAU Targets</span>, 'KPIs below business-as-usual trajectory', <span key="3r" className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">MEDIUM</span>],
          [<span key="4" className="font-semibold">No Verification</span>, 'No third-party verification plan', <span key="4r" className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">MEDIUM</span>],
          [<span key="5" className="font-semibold">Offset Heavy</span>, '>20% of reduction via carbon credits', <span key="5r" className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">MEDIUM</span>],
          [<span key="6" className="font-semibold">Lock-in Risk</span>, 'New fossil fuel infrastructure with 20+ year life', <span key="6r" className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">HIGH</span>],
          [<span key="7" className="font-semibold">Missing Baseline</span>, 'No emissions baseline data', <span key="7r" className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">HIGH</span>],
        ]}
      />

      <h2 id="risk-scoring" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Risk Scoring Matrix
      </h2>

      <div className="space-y-4 my-6">
        <div className="p-5 rounded-xl bg-rose-50 border border-rose-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center text-white font-bold">7-10</div>
            <div>
              <div className="font-semibold text-rose-800">HIGH RISK</div>
              <div className="text-sm text-rose-600">DO NOT PROCEED without major remediation</div>
            </div>
          </div>
          <ul className="text-sm text-rose-700 space-y-1 ml-15 pl-4 border-l-2 border-rose-200">
            <li>Multiple critical red flags</li>
            <li>No transition strategy</li>
            <li>Carbon lock-in evident</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold">4-6</div>
            <div>
              <div className="font-semibold text-amber-800">MEDIUM RISK</div>
              <div className="text-sm text-amber-600">CONDITIONAL - address gaps before financing</div>
            </div>
          </div>
          <ul className="text-sm text-amber-700 space-y-1 ml-15 pl-4 border-l-2 border-amber-200">
            <li>Some gaps in documentation</li>
            <li>Weak KPIs or verification</li>
            <li>Improvement path clear</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-verdex-50 border border-verdex-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-verdex-500 flex items-center justify-center text-white font-bold">0-3</div>
            <div>
              <div className="font-semibold text-verdex-800">LOW RISK</div>
              <div className="text-sm text-verdex-600">PROCEED with standard due diligence</div>
            </div>
          </div>
          <ul className="text-sm text-verdex-700 space-y-1 ml-15 pl-4 border-l-2 border-verdex-200">
            <li>Strong transition credentials</li>
            <li>Third-party verification</li>
            <li>Science-based targets</li>
          </ul>
        </div>
      </div>

      <InfoBox type="warning" title="Regulatory Context">
        With the EU ESG Ratings Transparency Regulation (July 2026) and FCA Anti-Greenwashing Rule (December 2024), greenwashing detection is no longer optional—it&apos;s a compliance requirement.
      </InfoBox>

    </DocPage>
  );
}
