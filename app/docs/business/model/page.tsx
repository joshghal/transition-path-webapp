import DocPage, { DataTable, InfoBox } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Business Model | Verdex Docs',
  description: 'Verdex revenue streams and go-to-market strategy',
};

export default function BusinessModelPage() {
  return (
    <DocPage
      title="Business Model"
      description="Revenue streams, go-to-market strategy, and unit economics for Verdex."
      breadcrumbs={[{ label: 'Business' }, { label: 'Business Model' }]}
      previousPage={{ title: 'Market Opportunity', href: '/docs/business/market-opportunity' }}
      nextPage={{ title: 'Roadmap', href: '/docs/business/roadmap' }}
      tableOfContents={[
        { id: 'revenue-streams', title: 'Revenue Streams', level: 2 },
        { id: 'go-to-market', title: 'Go-to-Market Strategy', level: 2 },
        { id: 'unit-economics', title: 'Unit Economics', level: 2 },
      ]}
    >
      <h2 id="revenue-streams" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Revenue Streams
      </h2>

      <div className="space-y-4 my-6">
        <div className="p-6 rounded-xl bg-verdex-50 border border-verdex-200">
          <h3 className="font-semibold text-verdex-800 mb-3">Stream 1: Subscription (SaaS)</h3>
          <DataTable
            headers={['Tier', 'Price/Month', 'Features']}
            rows={[
              ['Basic', '$500', '5 assessments/mo, basic reports'],
              ['Professional', '$2,000', '25 assessments/mo, DFI matching, API'],
              ['Enterprise', '$10,000', 'Unlimited, white-label, custom models'],
            ]}
          />
        </div>

        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200">
          <h3 className="font-semibold text-emerald-800 mb-3">Stream 2: Transaction (Success Fee)</h3>
          <p className="text-emerald-700">
            <strong>5-15 basis points</strong> on validated deals that close
          </p>
          <p className="text-sm text-emerald-600 mt-2">
            Example: $100M deal × 10 bps = <strong>$100,000 fee</strong>
          </p>
        </div>

        <div className="p-6 rounded-xl bg-teal-50 border border-teal-200">
          <h3 className="font-semibold text-teal-800 mb-3">Stream 3: Data & Insights</h3>
          <ul className="text-teal-700 space-y-1">
            <li>• Pipeline reports for DFIs</li>
            <li>• Market intelligence for investors</li>
            <li>• Benchmark data for standard-setting bodies</li>
          </ul>
        </div>
      </div>

      <h2 id="go-to-market" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Go-to-Market Strategy
      </h2>

      <div className="space-y-4 my-6">
        {[
          { phase: 'Phase 1', title: 'DFI Partnerships', desc: 'Partner with 2-3 DFIs as anchor clients, integrate into deal screening' },
          { phase: 'Phase 2', title: 'Bank Channel', desc: 'License to commercial banks with Africa exposure (Standard Chartered, Stanbic, Ecobank)' },
          { phase: 'Phase 3', title: 'Developer Direct', desc: 'Self-service platform for project developers with freemium model' },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100">
            <div className="px-3 py-1 rounded-full bg-verdex-100 text-verdex-700 text-xs font-semibold">
              {item.phase}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 id="unit-economics" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Unit Economics
      </h2>

      <DataTable
        headers={['Metric', 'Year 1', 'Year 3', 'Year 5']}
        rows={[
          ['CAC (Customer Acquisition Cost)', '$5,000', '$3,000', '$2,000'],
          ['ACV (Annual Contract Value)', '$25,000', '$50,000', '$75,000'],
          ['LTV (Lifetime Value)', '$75,000', '$200,000', '$375,000'],
          [<span key="ltv" className="font-semibold">LTV:CAC Ratio</span>, <span key="y1" className="text-verdex-600 font-bold">15:1</span>, <span key="y3" className="text-verdex-600 font-bold">67:1</span>, <span key="y5" className="text-verdex-600 font-bold">188:1</span>],
          ['Gross Margin', '70%', '80%', '85%'],
          ['Payback Period', '2.4 mo', '0.7 mo', '0.3 mo'],
        ]}
      />

      <InfoBox type="success" title="Strong Unit Economics">
        With LTV:CAC ratios exceeding 15:1 from Year 1, Verdex demonstrates highly efficient customer acquisition and strong retention potential.
      </InfoBox>

    </DocPage>
  );
}
