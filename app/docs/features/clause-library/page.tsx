import DocPage, { DataTable, InfoBox, CodeBlock } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Clause Library | Verdex Docs',
  description: 'Search and generate LMA-compliant clauses for transition loan documentation',
};

export default function ClauseLibraryPage() {
  return (
    <DocPage
      title="LMA Clause Search & Library"
      description="Search, analyze, and generate LMA-compliant clauses for transition loan documentation from 24+ templates."
      breadcrumbs={[{ label: 'Features' }, { label: 'Clause Library' }]}
      previousPage={{ title: 'KPI Generator', href: '/docs/features/kpi-generator' }}
      nextPage={{ title: 'Architecture', href: '/docs/technical/architecture' }}
      tableOfContents={[
        { id: 'overview', title: 'Overview', level: 2 },
        { id: 'categories', title: 'Clause Categories', level: 2 },
        { id: 'examples', title: 'Example Clauses', level: 2 },
        { id: 'margin-ratchet', title: 'Margin Ratchet Presets', level: 2 },
      ]}
    >
      <h2 id="overview" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Overview
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        Verdex provides access to a comprehensive library of <strong>LMA-standard clauses</strong> derived from 24 Africa-specific documents, SBTi CORPORATE
NET-ZERO STANDARD, Paris Aggrement, and the SLLP/Transition Loan Principles.
      </p>

      <h2 id="categories" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Clause Categories
      </h2>

      <DataTable
        headers={['Category', 'Templates', 'Purpose']}
        rows={[
          [<span key="1" className="font-semibold text-verdex-700">KPI Definition</span>, '4', 'Define measurable sustainability metrics'],
          [<span key="2" className="font-semibold text-verdex-700">SPT Calibration</span>, '3', 'Set ambitious, science-based targets'],
          [<span key="3" className="font-semibold text-verdex-700">Margin Ratchet</span>, '4', 'Link financial terms to SPT achievement'],
          [<span key="4" className="font-semibold text-verdex-700">Reporting</span>, '3', 'Annual disclosure obligations'],
          [<span key="5" className="font-semibold text-verdex-700">Verification</span>, '3', 'External assurance requirements'],
          [<span key="6" className="font-semibold text-verdex-700">Use of Proceeds</span>, '4', 'Transition-specific fund allocation'],
          [<span key="7" className="font-semibold text-verdex-700">Transition Strategy</span>, '3', 'Entity-level decarbonization commitments'],
        ]}
      />

      <h2 id="examples" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Example Clauses
      </h2>

      <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">KPI Definition Clause</h3>

      <CodeBlock
        language="text"
        code={`"Key Performance Indicators" or "KPIs" means the sustainability
performance metrics set out in Schedule [X], being:

(a) Carbon Intensity: Scope 1 & 2 GHG emissions per MWh, measured in gCO2e/kWh;
(b) Renewable Capacity: Total installed renewable generation capacity, measured in MW;
(c) Grid Decarbonization: Percentage of electricity from zero-carbon sources.

Each calculated in accordance with the GHG Protocol Corporate Standard.`}
      />

      <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Margin Ratchet Clause</h3>

      <CodeBlock
        language="text"
        code={`The Applicable Margin shall be adjusted as follows:
(a) if ALL SPTs achieved: Margin REDUCED by [X] basis points;
(b) if 2 of 3 SPTs achieved: Margin UNCHANGED;
(c) if fewer than 2 SPTs achieved: Margin INCREASED by [X] basis points.

Standard adjustments: 5-15 bps | Aggressive: 10-25 bps`}
      />

      <h2 id="margin-ratchet" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Margin Ratchet Presets
      </h2>

      <DataTable
        headers={['Preset', 'Reduction', 'Increase', 'Partial Threshold', 'Use Case']}
        rows={[
          [<span key="1" className="font-semibold">Standard</span>, '5 bps', '5 bps', '2 of 3 SPTs', 'Investment-grade borrowers'],
          [<span key="2" className="font-semibold">Aggressive</span>, '10 bps', '10 bps', 'All SPTs', 'Ambitious transition leaders'],
          [<span key="3" className="font-semibold">Conservative</span>, '2.5 bps', '2.5 bps', '1 of 3 SPTs', 'First-time SLL borrowers'],
          [<span key="4" className="font-semibold">Asymmetric</span>, '5 bps', '15 bps', '2 of 3 SPTs', 'Greater penalty for misses'],
        ]}
      />

      <InfoBox type="info" title="2025 SLLP Updates">
        The 2025 updates to the Sustainability-Linked Loan Principles now require two-way margin adjustments. Verdex clauses are aligned with these latest requirements.
      </InfoBox>

    </DocPage>
  );
}
