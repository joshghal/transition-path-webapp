import DocPage, { InfoBox, DataTable } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Climate Finance Gap | Verdex Docs',
  description: 'Understanding Africa\'s USD 247 billion annual climate finance gap',
};

export default function ClimateFinanceGapPage() {
  return (
    <DocPage
      title="The Climate Finance Gap in Africa"
      description="Africa faces a critical climate finance crisis that threatens its sustainable development trajectory."
      breadcrumbs={[{ label: 'Problem & Solution' }, { label: 'Climate Finance Gap' }]}
      previousPage={{ title: 'Executive Summary', href: '/docs/executive-summary' }}
      nextPage={{ title: 'Why Africa', href: '/docs/problem/why-africa' }}
      tableOfContents={[
        { id: 'the-gap', title: 'The Gap', level: 2 },
        { id: 'why-projects-fail', title: 'Why Projects Fail', level: 2 },
        { id: 'regulatory-evolution', title: 'Regulatory Evolution', level: 2 },
      ]}
    >
      <h2 id="the-gap" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        The Gap
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        Africa requires <strong className="text-verdex-700">USD 277 billion annually</strong> to meet its climate commitments, yet receives only <strong className="text-verdex-700">USD 44 billion</strong> in climate finance flows.
      </p>

      <DataTable
        headers={['Metric', 'Value', 'Source']}
        rows={[
          [<span key="1" className="font-semibold">Annual climate finance needed</span>, 'USD 277 billion', 'Climate Policy Initiative, 2024'],
          ['Current annual flows', 'USD 44 billion', 'CPI Landscape 2024'],
          [<span key="2" className="font-semibold text-rose-600">Financing gap</span>, <span key="3" className="font-bold text-rose-600">USD 233 billion</span>, 'Calculated'],
          ['Share of global climate finance', '2%', 'CPI Press Release'],
          ['Share of global emissions', '<4%', 'UNFCCC'],
        ]}
      />

      <div className="my-8 grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center">
          <div className="text-3xl font-bold text-rose-600">23%</div>
          <div className="text-sm text-rose-700 mt-1">of annual needs met for NDCs</div>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
          <div className="text-3xl font-bold text-amber-600">18%</div>
          <div className="text-sm text-amber-700 mt-1">of mitigation needs addressed</div>
        </div>
        <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-center">
          <div className="text-3xl font-bold text-orange-600">10</div>
          <div className="text-sm text-orange-700 mt-1">countries receive 50% of flows</div>
        </div>
      </div>

      <h2 id="why-projects-fail" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Why Projects Fail to Secure Transition Finance
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        Despite Africa&apos;s potential, projects routinely fail to secure transition financing due to:
      </p>

      <div className="space-y-4 my-6">
        {[
          {
            num: '1',
            title: 'Framework Complexity',
            desc: 'LMA, SBTi, Paris Agreement, EU Taxonomy, DFI-specific requirements create compliance confusion',
          },
          {
            num: '2',
            title: 'Documentation Gaps',
            desc: 'Projects lack proper transition strategy documentation, KPI frameworks, and verification plans',
          },
          {
            num: '3',
            title: 'Greenwashing Suspicion',
            desc: 'Lenders increasingly skeptical of transition claims without robust validation',
          },
          {
            num: '4',
            title: 'DFI Navigation',
            desc: 'Complex eligibility requirements across 7+ DFIs with overlapping but distinct criteria',
          },
          {
            num: '5',
            title: 'Cost of Capital',
            desc: 'African projects face 5-8x higher borrowing costs than developed markets',
          },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-verdex-200 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-verdex-500 to-verdex-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {item.num}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Research Validation */}
      <div className="my-8">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Research Validation</p>
          <p className="text-gray-700 mb-4">
            This isn&apos;t speculation — leading institutions have documented the capacity gap:
          </p>

          <div className="space-y-3">
            <a
              href="https://sdgfinance.undp.org/news-events/attracting-climate-finance-africa-through-development-bankable-project-pipelines"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-verdex-50/80 to-transparent border-l-4 border-verdex-500 hover:from-verdex-100/80 transition-colors"
            >
              <span className="text-xs font-bold text-verdex-600 uppercase tracking-wide">UNDP</span>
              <p className="mt-1 text-gray-700 italic">&quot;Many developers in low-income countries lack the expertise to structure viable, bankable projects.&quot;</p>
            </a>

            <a
              href="https://www.climatepolicyinitiative.org/gca-africa-adaptation-finance/barriers/bankability-barriers/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-emerald-50/80 to-transparent border-l-4 border-emerald-500 hover:from-emerald-100/80 transition-colors"
            >
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Climate Policy Initiative</span>
              <p className="mt-1 text-gray-700 italic">&quot;The lack of bankable projects is due to inadequate project preparation and limited technical capacity.&quot;</p>
            </a>
          </div>

          <p className="mt-6 text-lg font-medium text-gray-900">
            A developer has a project and a PDF. Lenders have frameworks and capital.
            <span className="text-verdex-600"> Nobody has the bridge</span> — until now.
          </p>
        </div>
      </div>

      <h2 id="regulatory-evolution" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        The Regulatory Evolution
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        Recent regulatory developments make compliant transition finance more critical than ever:
      </p>

      <div className="space-y-6">
        <InfoBox type="info" title="LMA Transition Loan Guide (October 2025)">
          <ul className="mt-2 space-y-1 text-sm">
            <li>• First comprehensive framework specifically for transition loans</li>
            <li>• 5 Core Components mandatory for transition classification</li>
            <li>• Emphasis on entity-level strategy, not just project-level</li>
          </ul>
        </InfoBox>

        <InfoBox type="info" title="SBTi Net-Zero Standard V2 (2025-2026)">
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Separate Scope 1, 2, and 3 targets now required</li>
            <li>• Low-carbon electricity commitment by 2040</li>
            <li>• Supplier engagement requirements by 2030</li>
          </ul>
        </InfoBox>

        <InfoBox type="warning" title="Anti-Greenwashing Regulations">
          <ul className="mt-2 space-y-1 text-sm">
            <li>• EU ESG Ratings Transparency Regulation (July 2026)</li>
            <li>• FCA Anti-Greenwashing Rule (effective December 2024)</li>
            <li>• Fines reaching <strong>USD 17.5 million</strong> for misleading sustainability claims</li>
          </ul>
        </InfoBox>
      </div>

    </DocPage>
  );
}
