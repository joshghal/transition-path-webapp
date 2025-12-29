import DocPage from '@/components/docs/DocPage';
import Link from 'next/link';

export const metadata = {
  title: 'References | Verdex Docs',
  description: 'Sources and references used in Verdex documentation',
};

const references = [
  {
    category: 'Climate Finance Data',
    sources: [
      { title: 'Climate Policy Initiative - Landscape of Climate Finance in Africa 2024', url: 'https://www.climatepolicyinitiative.org/publication/landscape-of-climate-finance-in-africa-2024/' },
      { title: 'IEA - World Energy Investment 2024: Africa', url: 'https://www.iea.org/reports/world-energy-investment-2024/africa' },
      { title: 'IEA - Financing Clean Energy in Africa', url: 'https://www.iea.org/reports/financing-clean-energy-in-africa/executive-summary' },
    ],
  },
  {
    category: 'LMA & Transition Loan Frameworks',
    sources: [
      { title: 'LMA - Guide to Transition Loans (October 2025)', url: 'https://www.lma.eu.com/application/files/8017/6121/0645/Guide_to_Transition_Loans_-_16_October_2025.pdf' },
      { title: 'LMA - Green Loan Principles (March 2025)', url: 'https://www.lma.eu.com/download_file/66453' },
      { title: 'LMA - Sustainability-Linked Loan Principles (March 2025)', url: 'https://www.lma.eu.com/download_file/66457' },
    ],
  },
  {
    category: 'SBTi & Science-Based Targets',
    sources: [
      { title: 'SBTi - Climate Ambition Raises the Bar to 1.5°C', url: 'https://sciencebasedtargets.org/news/sbti-raises-the-bar-to-1-5-c' },
      { title: 'SBTi - Target Dashboard', url: 'https://sciencebasedtargets.org/target-dashboard' },
    ],
  },
  {
    category: 'Paris Agreement & Carbon Markets',
    sources: [
      { title: 'UNFCCC - Paris Agreement Article 6', url: 'https://unfccc.int/process-and-meetings/the-paris-agreement/article6' },
      { title: 'IISD - Paris Agreement\'s New Article 6 Rules', url: 'https://www.iisd.org/articles/paris-agreement-article-6-rules' },
    ],
  },
  {
    category: 'DFI Sources',
    sources: [
      { title: 'IFC - How to Apply for Financing', url: 'https://www.ifc.org/en/what-we-do/products-and-services/how-to-apply-for-financing' },
      { title: 'AfDB - Funding Request', url: 'https://www.afdb.org/en/sectors/private-sector/how-work-us/funding-request' },
      { title: 'BII - Africa', url: 'https://www.bii.co.uk/en/africa/' },
    ],
  },
];

export default function ReferencesPage() {
  return (
    <DocPage
      title="Sources & References"
      description="Official sources and references used throughout the Verdex documentation."
      breadcrumbs={[{ label: 'Resources' }, { label: 'References' }]}
      previousPage={{ title: 'Roadmap', href: '/docs/business/roadmap' }}
      nextPage={{ title: 'Glossary', href: '/docs/resources/glossary' }}
    >
      <div className="space-y-8 mt-8">
        {references.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              {section.category}
            </h2>
            <ul className="space-y-2">
              {section.sources.map((source, sourceIdx) => (
                <li key={sourceIdx} className="flex items-start gap-2">
                  <span className="text-verdex-500 mt-1">•</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-verdex-600 hover:text-verdex-700 hover:underline"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-verdex-50 border border-verdex-100">
        <p className="text-sm text-verdex-700">
          <strong>Note:</strong> All data and frameworks referenced are from publicly available sources. Verdex does not provide financial or legal advice. Users should consult with qualified professionals for specific guidance.
        </p>
      </div>

    </DocPage>
  );
}
