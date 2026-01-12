import DocPage, { InfoBox } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Business Model | Verdex Docs',
  description: 'Verdex revenue streams and go-to-market strategy',
};

export default function BusinessModelPage() {
  return (
    <DocPage
      title="Business Model"
      description="How Verdex creates value for developers, institutions, and the ecosystem."
      breadcrumbs={[{ label: 'Business' }, { label: 'Business Model' }]}
      previousPage={{ title: 'Market Opportunity', href: '/docs/business/market-opportunity' }}
      nextPage={{ title: 'Roadmap', href: '/docs/business/roadmap' }}
      tableOfContents={[
        { id: 'for-developers', title: 'For Developers', level: 2 },
        { id: 'for-organizations', title: 'For Organizations', level: 2 },
        { id: 'ecosystem-revenue', title: 'Ecosystem Revenue', level: 2 },
        { id: 'go-to-market', title: 'Go-to-Market', level: 2 },
        { id: 'why-it-scales', title: 'Why It Scales', level: 2 },
      ]}
    >
      {/* ====== FOR DEVELOPERS ====== */}
      <h2 id="for-developers" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        For Developers
      </h2>

      <p className="text-gray-600 mb-6">
        Project developers get started for free. Pay only for what you need.
      </p>

      {/* Free Tier Highlight */}
      <div className="p-6 rounded-2xl bg-verdex-700 text-white mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
            ✓
          </div>
          <div>
            <div className="font-semibold text-lg">Always Free</div>
            <div className="text-verdex-200 text-sm">Basic eligibility score + high-level gaps</div>
          </div>
        </div>
        <p className="text-sm text-verdex-200 mt-3">
          See if your project qualifies before spending anything. No credit card required.
        </p>
      </div>

      {/* Credit Packages */}
      <div className="mb-6">
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Credit Packages</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'Starter', price: '$10', credits: '50', perCredit: '$0.20' },
            { name: 'Standard', price: '$25', credits: '150', perCredit: '$0.17', popular: true },
            { name: 'Pro Pack', price: '$50', credits: '400', perCredit: '$0.13' },
          ].map((pkg) => (
            <div
              key={pkg.name}
              className={`p-4 rounded-xl border-2 text-center ${
                pkg.popular
                  ? 'border-verdex-500 bg-verdex-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {pkg.popular && (
                <div className="text-xs text-verdex-600 font-semibold mb-1">MOST POPULAR</div>
              )}
              <div className="text-2xl font-bold text-gray-900">{pkg.price}</div>
              <div className="text-verdex-600 font-semibold">{pkg.credits} credits</div>
              <div className="text-xs text-gray-400 mt-1">{pkg.perCredit}/credit</div>
            </div>
          ))}
        </div>
      </div>

      {/* What Credits Buy */}
      <div className="mb-6">
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">What Credits Buy</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { action: 'Full Report', credits: '30', desc: 'Detailed gaps + recommendations' },
            { action: 'Draft Generation', credits: '20', desc: 'Per clause draft' },
            { action: 'DFI Deep Match', credits: '15', desc: 'Ranked DFI recommendations' },
            { action: 'Clause Search', credits: '5', desc: 'AI-powered search' },
          ].map((item) => (
            <div key={item.action} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900 text-sm">{item.action}</span>
                <span className="text-verdex-600 font-bold text-sm">{item.credits}</span>
              </div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Example Journey */}
      <div className="p-4 rounded-xl bg-verdex-50 border border-verdex-200">
        <div className="text-sm font-semibold text-verdex-800 mb-2">Example: $25 gets you</div>
        <div className="flex items-center gap-2 text-sm text-verdex-700 flex-wrap">
          <span className="px-2 py-1 bg-white rounded">Full Report</span>
          <span className="text-verdex-400">+</span>
          <span className="px-2 py-1 bg-white rounded">3 Clause Drafts</span>
          <span className="text-verdex-400">+</span>
          <span className="px-2 py-1 bg-white rounded">DFI Match</span>
          <span className="text-verdex-400">=</span>
          <span className="px-2 py-1 bg-verdex-200 rounded font-semibold">105 credits (45 remaining)</span>
        </div>
      </div>

      {/* ====== FOR ORGANIZATIONS ====== */}
      <h2 id="for-organizations" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        For Organizations
      </h2>

      <p className="text-gray-600 mb-6">
        Banks, DFIs, and advisors who need unlimited access and integrations.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Professional */}
        <div className="p-6 rounded-xl border-2 border-gray-200 bg-white">
          <div className="text-sm text-gray-500 mb-1">PROFESSIONAL</div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-3xl font-bold text-gray-900">$500</span>
            <span className="text-gray-500">/month</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-verdex-500">✓</span> Unlimited assessments
            </li>
            <li className="flex items-center gap-2">
              <span className="text-verdex-500">✓</span> Unlimited reports & drafts
            </li>
            <li className="flex items-center gap-2">
              <span className="text-verdex-500">✓</span> API access
            </li>
            <li className="flex items-center gap-2">
              <span className="text-verdex-500">✓</span> Priority support
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
            Best for: Advisors, consultants, small funds
          </div>
        </div>

        {/* Enterprise */}
        <div className="p-6 rounded-xl border-2 border-verdex-500 bg-verdex-50">
          <div className="text-sm text-verdex-600 mb-1">ENTERPRISE</div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-3xl font-bold text-gray-900">$5,000+</span>
            <span className="text-gray-500">/month</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-verdex-500">✓</span> Everything in Professional
            </li>
            <li className="flex items-center gap-2">
              <span className="text-verdex-500">✓</span> White-label option
            </li>
            <li className="flex items-center gap-2">
              <span className="text-verdex-500">✓</span> Custom AI models
            </li>
            <li className="flex items-center gap-2">
              <span className="text-verdex-500">✓</span> Dedicated support
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-verdex-200 text-xs text-verdex-600">
            Best for: Banks, DFIs, large institutions
          </div>
        </div>
      </div>

      {/* ====== ECOSYSTEM REVENUE ====== */}
      <h2 id="ecosystem-revenue" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Ecosystem Revenue
      </h2>

      <p className="text-gray-600 mb-6">
        Additional revenue from platform integrations and deal flow.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {/* API Licensing */}
        <div className="p-5 rounded-xl bg-verdex-50 border border-verdex-200">
          <div className="text-verdex-600 font-semibold text-sm mb-2">API Licensing</div>
          <div className="text-xl font-bold text-gray-900 mb-3">$25K - $100K+/yr</div>
          <ul className="text-sm text-verdex-700 space-y-1">
            <li>• LMA.Automate integration</li>
            <li>• LendOS / Agensight</li>
            <li>• DFI pipeline APIs</li>
          </ul>
        </div>

        {/* Success Fees */}
        <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="text-emerald-600 font-semibold text-sm mb-2">Success Fees</div>
          <div className="text-xl font-bold text-gray-900 mb-3">5-15 bps</div>
          <p className="text-sm text-emerald-700">
            On validated deals that close
          </p>
          <p className="text-xs text-emerald-600 mt-2">
            $100M deal × 10 bps = $100K
          </p>
        </div>

        {/* Data & Insights */}
        <div className="p-5 rounded-xl bg-teal-50 border border-teal-200">
          <div className="text-teal-600 font-semibold text-sm mb-2">Data & Insights</div>
          <div className="text-xl font-bold text-gray-900 mb-3">Custom pricing</div>
          <ul className="text-sm text-teal-700 space-y-1">
            <li>• Pipeline reports</li>
            <li>• Market intelligence</li>
            <li>• Benchmark data</li>
          </ul>
        </div>
      </div>

      {/* ====== GO-TO-MARKET ====== */}
      <h2 id="go-to-market" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Go-to-Market
      </h2>

      <div className="space-y-4">
        {[
          {
            phase: '1',
            title: 'Developer Direct',
            desc: 'Free tier attracts developers, builds pipeline data, validates LMA framework adoption',
            status: 'NOW'
          },
          {
            phase: '2',
            title: 'DFI Partnerships',
            desc: 'Deliver pre-screened, LMA-compliant pipeline to DFIs, integrate into their screening process',
            status: 'NEXT'
          },
          {
            phase: '3',
            title: 'Platform Integration',
            desc: 'API licensing to LMA.Automate, Avvoka, banks — become the validation layer',
            status: 'FUTURE'
          },
        ].map((item) => (
          <div key={item.phase} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
              item.status === 'NOW'
                ? 'bg-verdex-700 text-white'
                : item.status === 'NEXT'
                  ? 'bg-gray-200 text-gray-600 border-2 border-gray-300'
                  : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
            }`}>
              {item.phase}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{item.title}</span>
                {item.status === 'NOW' && (
                  <span className="px-2 py-0.5 rounded-full bg-verdex-700 text-white text-xs font-semibold">
                    NOW
                  </span>
                )}
                {item.status === 'NEXT' && (
                  <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold">
                    NEXT
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ====== WHY IT SCALES ====== */}
      <h2 id="why-it-scales" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Why It Scales
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {[
          { metric: 'Assessment time', traditional: '2-4 weeks', verdex: '<60 seconds', improvement: '2000x faster' },
          { metric: 'Cost per project', traditional: '$50,000+', verdex: 'Free - $50', improvement: '1000x cheaper' },
          { metric: 'Geographic reach', traditional: 'Limited', verdex: 'Any market', improvement: 'Global' },
          { metric: 'Marginal cost', traditional: 'High', verdex: 'Near zero', improvement: 'Infinite scale' },
        ].map((item) => (
          <div key={item.metric} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="text-sm text-gray-500 mb-2">{item.metric}</div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400 line-through text-sm">{item.traditional}</span>
                <span className="mx-2 text-gray-300">→</span>
                <span className="text-verdex-600 font-bold">{item.verdex}</span>
              </div>
              <span className="text-xs px-2 py-1 bg-verdex-100 text-verdex-700 rounded-full font-medium">
                {item.improvement}
              </span>
            </div>
          </div>
        ))}
      </div>

      <InfoBox type="success" title="Network Effects">
        Every project assessed trains our models on real African transition finance data — a dataset no competitor has.
        More users = better validation = more LMA-compliant deals.
      </InfoBox>

    </DocPage>
  );
}
