import DocPage, { InfoBox, DataTable } from '@/components/docs/DocPage';
import { Building2 } from 'lucide-react';

export const metadata = {
  title: 'DFI Matching | Verdex Docs',
  description: 'Match projects with appropriate Development Finance Institutions',
};

export default function DFIMatchingPage() {
  return (
    <DocPage
      title="DFI Matching & Structure Advisory"
      description="Match projects with appropriate Development Finance Institutions and recommend optimal blended finance structures."
      breadcrumbs={[{ label: 'Features' }, { label: 'DFI Matching' }]}
      previousPage={{ title: 'LMA Validator', href: '/docs/features/lma-validator' }}
      nextPage={{ title: 'Greenwash Detection', href: '/docs/features/greenwash-detection' }}
      tableOfContents={[
        { id: 'overview', title: 'Overview', level: 2 },
        { id: 'dfi-database', title: 'DFI Database', level: 2 },
        { id: 'matching-flow', title: 'Matching Flow', level: 2 },
        { id: 'structure-example', title: 'Structure Example', level: 2 },
      ]}
    >
      <h2 id="overview" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Overview
      </h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        Once a project is validated against LMA criteria, Verdex matches it with appropriate <strong>Development Finance Institutions (DFIs)</strong> based on country coverage, sector focus, size requirements, and climate targets.
      </p>

      <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-verdex-50 to-emerald-50 border border-verdex-100 my-8">
        <Building2 className="w-12 h-12 text-verdex-600" />
        <div>
          <div className="text-2xl font-bold text-verdex-700">7+ DFIs</div>
          <div className="text-gray-600">Verified and indexed in our database</div>
        </div>
      </div>

      <h2 id="dfi-database" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Verified DFI Database
      </h2>

      <DataTable
        headers={['DFI', 'Size Range', 'Africa Coverage', 'Climate Target', 'Key Programs']}
        rows={[
          [<span key="ifc" className="font-semibold text-verdex-700">IFC</span>, 'No min, max 25% of project', '45 countries', '$15B+ annually', 'Blended Finance, SME Ventures'],
          [<span key="afdb" className="font-semibold text-verdex-700">AfDB</span>, '$3M-$10M+ (33% max)', '54 members', '40% of approvals', 'SEFA, Africa50'],
          [<span key="fmo" className="font-semibold text-verdex-700">FMO</span>, 'No fixed min', 'OECD-DAC', 'Energy focus', 'Climate Investor One, DFCD'],
          [<span key="deg" className="font-semibold text-verdex-700">DEG</span>, '€0.5M-€25M', 'OECD-DAC', 'Climate/environment', 'ImpactConnect, AfricaConnect'],
          [<span key="bii" className="font-semibold text-verdex-700">BII</span>, '$10M-$250M', 'SSA priority', '30% climate', '2X Gender, Infrastructure'],
          [<span key="prop" className="font-semibold text-verdex-700">Proparco</span>, 'No fixed min', 'SSA + Med priority', 'Climate priority', 'Choose Africa (€2.5B), FISEA+'],
          [<span key="dfc" className="font-semibold text-verdex-700">DFC</span>, '$50M-$1B', '100+ countries', '33% climate', 'Power Africa ($2.4B)'],
        ]}
      />

      <h2 id="matching-flow" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Matching Flow
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        The DFI matching process filters and ranks DFIs based on project characteristics:
      </p>

      <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-verdex-50/30 border border-verdex-100">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-gray-900 mb-3">Input (Validated Project)</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-verdex-500" />
                Country: Kenya
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-verdex-500" />
                Sector: Energy
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-verdex-500" />
                Size: $75M
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-verdex-500" />
                Type: Solar IPP
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-3">Output (Top 5 DFIs)</div>
            <ol className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-verdex-500 text-white text-xs flex items-center justify-center">1</span>
                <span className="font-medium">IFC</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-verdex-400 text-white text-xs flex items-center justify-center">2</span>
                <span className="font-medium">AfDB</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-verdex-300 text-white text-xs flex items-center justify-center">3</span>
                <span className="font-medium">BII</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-300 text-white text-xs flex items-center justify-center">4</span>
                <span className="font-medium">FMO</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-200 text-gray-700 text-xs flex items-center justify-center">5</span>
                <span className="font-medium">DEG</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <h2 id="structure-example" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Recommended Blended Structure Example
      </h2>

      <InfoBox type="tip" title="Future Feature">
        The blended finance structure advisor is planned for future development, pending verified DFI participation data.
      </InfoBox>

      <p className="text-gray-700 leading-relaxed mb-4">
        Example structure for a USD $75M Solar IPP in Kenya:
      </p>

      <div className="my-6 space-y-3">
        <div className="p-4 rounded-xl bg-verdex-50 border border-verdex-200">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-verdex-800">Senior Debt (60% = $45M)</div>
              <div className="text-sm text-verdex-600 mt-1">IFC: $25M | Commercial Banks: $15M | AfDB: $5M</div>
            </div>
            <div className="text-2xl font-bold text-verdex-700">60%</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-emerald-800">Mezzanine/Subordinated (15% = $11.25M)</div>
              <div className="text-sm text-emerald-600 mt-1">FMO: $6M (Climate Investor One) | BII: $5.25M</div>
            </div>
            <div className="text-2xl font-bold text-emerald-700">15%</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-teal-800">Equity (25% = $18.75M)</div>
              <div className="text-sm text-teal-600 mt-1">Sponsor: $12M | IFC Co-invest: $4M | Local Partner: $2.75M</div>
            </div>
            <div className="text-2xl font-bold text-teal-700">25%</div>
          </div>
        </div>
      </div>

    </DocPage>
  );
}
