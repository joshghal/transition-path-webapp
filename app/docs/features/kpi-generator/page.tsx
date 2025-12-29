import DocPage, { DataTable, InfoBox } from '@/components/docs/DocPage';

export const metadata = {
  title: 'KPI Generator | Verdex Docs',
  description: 'Generate sector-specific KPIs and Sustainability Performance Targets',
};

export default function KPIGeneratorPage() {
  return (
    <DocPage
      title="KPI & SPT Framework Generator"
      description="Generate sector-specific, science-based KPIs and Sustainability Performance Targets aligned with international standards."
      breadcrumbs={[{ label: 'Features' }, { label: 'KPI Generator' }]}
      previousPage={{ title: 'Greenwash Detection', href: '/docs/features/greenwash-detection' }}
      nextPage={{ title: 'Clause Library', href: '/docs/features/clause-library' }}
      tableOfContents={[
        { id: 'overview', title: 'Overview', level: 2 },
        { id: 'energy-sector', title: 'Energy Sector', level: 2 },
        { id: 'mining-sector', title: 'Mining Sector', level: 2 },
        { id: 'agriculture-sector', title: 'Agriculture Sector', level: 2 },
      ]}
    >
      <h2 id="overview" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Overview
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        The KPI & SPT Framework Generator creates sector-specific, science-based Key Performance Indicators and Sustainability Performance Targets aligned with SBTi pathways and LMA requirements.
      </p>

      <InfoBox type="info" title="Science-Based Alignment">
        All KPIs are calibrated against SBTi sector pathways, ensuring targets represent a material improvement beyond business-as-usual and align with 1.5°C trajectories.
      </InfoBox>

      <h2 id="energy-sector" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Energy Sector KPIs
      </h2>

      <DataTable
        headers={['KPI', 'Unit', 'Ambition Benchmark', 'Source']}
        rows={[
          ['Carbon intensity', 'gCO2/kWh', '<100 by 2030', 'IEA SDS'],
          ['Renewable capacity added', 'MW', 'Project-specific', 'NDC'],
          ['Grid decarbonization', '%', '80% by 2030', 'SBTi Pathway'],
          ['Fossil fuel phase-out', 'Timeline', 'Complete by 2035', '1.5°C aligned'],
        ]}
      />

      <h2 id="mining-sector" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Mining Sector KPIs
      </h2>

      <DataTable
        headers={['KPI', 'Unit', 'Ambition Benchmark', 'Source']}
        rows={[
          ['Emissions intensity', 'tCO2e/tonne', '40% reduction by 2030', 'SBTi Mining'],
          ['Renewable energy share', '% of operations', '80% by 2030', 'RE100'],
          ['Water intensity', 'm³/tonne', '30% reduction', 'Best practice'],
          ['Tailings emissions', 'tCO2e', 'Measure + reduce', 'GRI'],
        ]}
      />

      <h2 id="agriculture-sector" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Agriculture Sector KPIs
      </h2>

      <DataTable
        headers={['KPI', 'Unit', 'Ambition Benchmark', 'Source']}
        rows={[
          ['Land emissions', 'tCO2e/hectare', '50% reduction', 'SBTi FLAG'],
          ['Sustainable practices', '% of land', '100% by 2030', 'Rainforest Alliance'],
          ['Methane reduction', '%', '30% by 2030', 'Global Methane Pledge'],
          ['Deforestation-free', 'Commitment', 'Verified', 'NDPE'],
        ]}
      />

      <InfoBox type="tip" title="Custom KPIs">
        The platform can generate custom KPIs based on your specific project type and transition pathway requirements.
      </InfoBox>

    </DocPage>
  );
}
