import DocPage, { DataTable, InfoBox } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Market Opportunity | Verdex Docs',
  description: 'TAM/SAM/SOM analysis for Verdex climate finance platform',
};

export default function MarketOpportunityPage() {
  return (
    <DocPage
      title="Market Opportunity"
      description="TAM/SAM/SOM analysis for the African transition finance market."
      breadcrumbs={[{ label: 'Business' }, { label: 'Market Opportunity' }]}
      previousPage={{ title: 'Architecture', href: '/docs/technical/architecture' }}
      nextPage={{ title: 'Business Model', href: '/docs/business/model' }}
      tableOfContents={[
        { id: 'tam', title: 'TAM Analysis', level: 2 },
        { id: 'sam', title: 'SAM Analysis', level: 2 },
        { id: 'som', title: 'Our Opportunity', level: 2 },
        { id: 'why-now', title: 'Why Now?', level: 2 },
      ]}
    >
      <h2 id="tam" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        TAM: Global Transition Finance
      </h2>

      <DataTable
        headers={['Segment', '2024 Value', '2030 Projection', 'CAGR']}
        rows={[
          ['Global sustainable debt issuance', '$1.5 trillion', '$3+ trillion', '~12%'],
          ['Green/Transition loans globally', '$700 billion', '$1.5 trillion', '~13%'],
          ['Climate finance flows', '$1.3 trillion', '$5+ trillion', '~25%'],
        ]}
      />

      <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-verdex-500 to-emerald-500 text-white text-center">
        <div className="text-sm text-verdex-100 mb-1">Total Addressable Market</div>
        <div className="text-4xl font-bold">USD 700 billion</div>
        <div className="text-verdex-100 mt-2">Global green/transition loan market</div>
      </div>

      <h2 id="sam" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        SAM: African Transition Finance
      </h2>

      <DataTable
        headers={['Segment', '2024 Value', '2030 Projection', 'CAGR']}
        rows={[
          ['Africa clean energy investment', '$40 billion', '$200 billion', '~30%'],
          ['Africa renewable energy investment', '$15 billion', '$60 billion', '~26%'],
          ['DFI lending to Africa', '$8 billion', '$20 billion', '~16%'],
          ['Transition-specific lending', '$5 billion', '$25 billion', '~30%'],
        ]}
      />

      <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center">
        <div className="text-sm text-emerald-100 mb-1">Serviceable Available Market</div>
        <div className="text-4xl font-bold">USD 25 billion</div>
        <div className="text-emerald-100 mt-2">African transition loan market by 2030</div>
      </div>

      <h2 id="som" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        SOM: Our Opportunity
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        If Verdex enables just <strong>10% of the financing gap</strong>, the impact is significant:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {[
          { value: '$23B', label: 'Additional climate finance' },
          { value: '50+ GW', label: 'Renewable capacity enabled' },
          { value: '100M+', label: 'People with electricity' },
          { value: '100M+', label: 'Tonnes CO2 avoided' },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-verdex-50 border border-verdex-100 text-center">
            <div className="text-2xl font-bold text-verdex-700">{item.value}</div>
            <div className="text-xs text-verdex-600 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <InfoBox type="info" title="Focus on Impact">
        Revenue follows impact. By helping more projects become bankable, Verdex creates value for the entire ecosystem.
      </InfoBox>

      <h2 id="why-now" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Why Now?
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Three forces are converging to create this opportunity:
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-6">
        {[
          {
            title: 'LMA Framework Maturity',
            description: 'October 2025 Transition Loan Guide finally provides clear, shared criteria for credible transition finance.',
          },
          {
            title: 'DFI Climate Mandates',
            description: 'Growing pressure on IFC, AfDB, FMO, and others to deploy capital into African climate projects.',
          },
          {
            title: 'Infrastructure Gap',
            description: 'No existing tool bridges LMA frameworks to African developers. The demand exists — projects just need to speak the right language.',
          },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-verdex-50 border border-verdex-100">
            <div className="font-semibold text-verdex-800 mb-2">{item.title}</div>
            <p className="text-sm text-verdex-600">{item.description}</p>
          </div>
        ))}
      </div>

      <InfoBox type="info" title="LMA Geographic Mandate">
        Africa is one-third of LMA&apos;s geographic coverage (Europe, Middle East, and Africa). Verdex operationalizes 12 years of LMA Africa engagement that has been underutilized.
      </InfoBox>

    </DocPage>
  );
}
