import DocPage, { DataTable, InfoBox } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Priority Countries | Verdex Docs',
  description: 'The 7 priority countries for Verdex climate finance validation',
};

export default function PriorityCountriesPage() {
  return (
    <DocPage
      title="The 7 Priority Countries"
      description="Verdex initially focuses on 7 countries that represent the strategic heart of African transition finance."
      breadcrumbs={[{ label: 'Problem & Solution' }, { label: 'Priority Countries' }]}
      previousPage={{ title: 'Why Africa', href: '/docs/problem/why-africa' }}
      nextPage={{ title: 'Solution Overview', href: '/docs/solution-overview' }}
      tableOfContents={[
        { id: 'countries', title: 'Country Overview', level: 2 },
        { id: 'selection-criteria', title: 'Selection Criteria', level: 2 },
      ]}
    >
      <h2 id="countries" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Country Overview
      </h2>

      <DataTable
        headers={['Country', 'Region', 'Key Sectors', 'Why Selected']}
        rows={[
          [<span key="ke" className="font-semibold text-verdex-700">Kenya</span>, 'East Africa', 'Geothermal, Solar, Wind', 'Regional hub, 90%+ renewable grid'],
          [<span key="ng" className="font-semibold text-verdex-700">Nigeria</span>, 'West Africa', 'Solar, Gas-to-Power', 'Africa\'s largest economy, 200M+ population'],
          [<span key="za" className="font-semibold text-verdex-700">South Africa</span>, 'Southern', 'Coal transition, Solar, Wind', 'JETP (USD 11.6B committed)'],
          [<span key="tz" className="font-semibold text-verdex-700">Tanzania</span>, 'East Africa', 'Geothermal, Mini-grids', 'Emerging market, off-grid potential'],
          [<span key="gh" className="font-semibold text-verdex-700">Ghana</span>, 'West Africa', 'Solar, Offshore Wind', 'Article 6 pioneer, stable democracy'],
          [<span key="eg" className="font-semibold text-verdex-700">Egypt</span>, 'North Africa', 'Solar, Wind, Green Hydrogen', 'COP27 host, Suez green corridor'],
          [<span key="ma" className="font-semibold text-verdex-700">Morocco</span>, 'North Africa', 'Solar, Wind, Green Hydrogen', 'Noor-Ouarzazate (world\'s largest CSP)'],
        ]}
      />

      <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-verdex-500 to-emerald-500 text-white text-center">
        <div className="text-4xl font-bold">USD 77 billion</div>
        <div className="text-verdex-100 mt-2">Combined renewable energy pipeline 2025-2030</div>
      </div>

      <h2 id="selection-criteria" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Selection Criteria
      </h2>

      <div className="space-y-3 my-6">
        {[
          { num: '1', title: 'LMA Document Coverage', desc: '79 LMA Africa-specific documents cover these jurisdictions' },
          { num: '2', title: 'DFI Activity', desc: 'All 7 major DFIs actively operate in these markets' },
          { num: '3', title: 'Climate Ambition', desc: 'Strong NDC commitments and transition pathways' },
          { num: '4', title: 'Deal Flow', desc: 'Represent 70%+ of African renewable energy pipeline' },
          { num: '5', title: 'Regulatory Readiness', desc: 'Established or emerging sustainable finance frameworks' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-verdex-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {item.num}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <InfoBox type="tip" title="Expansion Plans">
        Verdex plans to expand coverage to additional African markets as the platform matures and partnerships with regional DFIs are established.
      </InfoBox>

    </DocPage>
  );
}
