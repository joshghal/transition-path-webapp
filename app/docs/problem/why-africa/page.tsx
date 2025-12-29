import DocPage, { InfoBox, DataTable } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Why Africa | Verdex Docs',
  description: 'The strategic imperative for African climate finance',
};

export default function WhyAfricaPage() {
  return (
    <DocPage
      title="Why Africa? The Strategic Imperative"
      description="Africa presents a unique convergence of urgent need and untapped potential for climate finance."
      breadcrumbs={[{ label: 'Problem & Solution' }, { label: 'Why Africa' }]}
      previousPage={{ title: 'Climate Finance Gap', href: '/docs/problem/climate-finance-gap' }}
      nextPage={{ title: 'Priority Countries', href: '/docs/problem/priority-countries' }}
      tableOfContents={[
        { id: 'renewable-resources', title: 'Renewable Resources', level: 2 },
        { id: 'investment-opportunity', title: 'Investment Opportunity', level: 2 },
        { id: 'energy-access', title: 'Energy Access', level: 2 },
      ]}
    >
      <h2 id="renewable-resources" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Unparalleled Renewable Resources
      </h2>

      <div className="grid md:grid-cols-3 gap-4 my-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-center">
          <div className="text-3xl font-bold text-amber-600">60%</div>
          <div className="text-sm text-amber-700 mt-2">World&apos;s best solar resources</div>
          <div className="text-xs text-amber-500 mt-1">but only 1% of global PV capacity</div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-verdex-50 to-emerald-50 border border-verdex-200 text-center">
          <div className="text-3xl font-bold text-verdex-600">30%</div>
          <div className="text-sm text-verdex-700 mt-2">Global critical minerals</div>
          <div className="text-xs text-verdex-500 mt-1">for batteries & hydrogen</div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 text-center">
          <div className="text-3xl font-bold text-blue-600">40%+</div>
          <div className="text-sm text-blue-700 mt-2">Global cobalt, manganese</div>
          <div className="text-xs text-blue-500 mt-1">and platinum reserves</div>
        </div>
      </div>

      <h2 id="investment-opportunity" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        The Investment Opportunity
      </h2>

      <DataTable
        headers={['Investment Type', '2023 Actual', '2030 Required', 'Gap Factor']}
        rows={[
          ['Clean energy investment', 'USD 40B', 'USD 200B', <span key="1" className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-bold">5x</span>],
          ['Renewable energy', 'USD 15B', 'USD 60B', <span key="2" className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-bold">4x</span>],
          ['Electricity sector', 'USD 30B', 'USD 120B', <span key="3" className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-bold">4x</span>],
        ]}
      />

      <h2 id="energy-access" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Energy Access Imperative
      </h2>

      <div className="my-6 space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-verdex-50 border border-verdex-100">
          <div className="text-4xl font-bold text-verdex-600">600M</div>
          <div className="text-gray-700">People without electricity access</div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="text-4xl font-bold text-emerald-600">1B</div>
          <div className="text-gray-700">People lack clean cooking access</div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-teal-50 border border-teal-100">
          <div className="text-4xl font-bold text-teal-600">$25B</div>
          <div className="text-gray-700">Annually needed for energy access by 2030</div>
        </div>
      </div>

      <InfoBox type="info" title="The Paradox">
        Africa holds the world&apos;s best renewable resources but receives only 2% of global climate finance. Verdex exists to bridge this gap through automated compliance validation.
      </InfoBox>

    </DocPage>
  );
}
