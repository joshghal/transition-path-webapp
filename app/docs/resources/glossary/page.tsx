import DocPage from '@/components/docs/DocPage';

export const metadata = {
  title: 'Glossary | Verdex Docs',
  description: 'Key terms and definitions used in transition finance',
};

const glossaryTerms = [
  { term: 'DFI', definition: 'Development Finance Institution - Government-backed financial institution providing capital for development projects' },
  { term: 'KPI', definition: 'Key Performance Indicator - Measurable value demonstrating effectiveness in achieving objectives' },
  { term: 'LMA', definition: 'Loan Market Association - Trade body for the EMEA syndicated loan market' },
  { term: 'NDC', definition: 'Nationally Determined Contribution - Country commitments under the Paris Agreement' },
  { term: 'SBTi', definition: 'Science Based Targets initiative - Partnership helping companies set emissions reduction targets' },
  { term: 'SLL', definition: 'Sustainability-Linked Loan - Loan with terms linked to sustainability performance' },
  { term: 'SPT', definition: 'Sustainability Performance Target - Specific measurable target for sustainability metrics' },
  { term: 'Scope 1', definition: 'Direct GHG emissions from owned or controlled sources' },
  { term: 'Scope 2', definition: 'Indirect GHG emissions from purchased electricity, steam, heating, and cooling' },
  { term: 'Scope 3', definition: 'All other indirect GHG emissions in a company\'s value chain' },
  { term: 'Transition Loan', definition: 'Financing for companies transitioning to more sustainable business models' },
  { term: 'Greenwashing', definition: 'Making misleading claims about environmental benefits of products or practices' },
  { term: 'Blended Finance', definition: 'Strategic use of development finance to mobilize additional private capital' },
  { term: 'Margin Ratchet', definition: 'Mechanism adjusting loan pricing based on achievement of sustainability targets' },
  { term: 'Article 6', definition: 'Paris Agreement provision for international carbon market cooperation' },
];

export default function GlossaryPage() {
  return (
    <DocPage
      title="Glossary"
      description="Key terms and definitions used in transition finance and throughout Verdex documentation."
      breadcrumbs={[{ label: 'Resources' }, { label: 'Glossary' }]}
      previousPage={{ title: 'References', href: '/docs/resources/references' }}
    >
      <div className="mt-8 space-y-4">
        {glossaryTerms.sort((a, b) => a.term.localeCompare(b.term)).map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white border border-gray-100 hover:border-verdex-200 transition-colors">
            <dt className="font-semibold text-verdex-700">{item.term}</dt>
            <dd className="text-gray-600 mt-1">{item.definition}</dd>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
