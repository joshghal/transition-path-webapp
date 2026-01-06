import DocPage, { DataTable, InfoBox } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Knowledge Base | Verdex Docs',
  description: 'Sources and documents indexed in the Verdex knowledge base',
};

export default function KnowledgeBasePage() {
  return (
    <DocPage
      title="Knowledge Base"
      description="The sources and documents that power Verdex&apos;s AI-driven validation and recommendations."
      breadcrumbs={[{ label: 'Technical' }, { label: 'Knowledge Base' }]}
      previousPage={{ title: 'Architecture', href: '/docs/technical/architecture' }}
      nextPage={{ title: 'API Reference', href: '/docs/technical/api-reference' }}
      tableOfContents={[
        { id: 'sources', title: 'Document Sources', level: 2 },
        { id: 'core-documents', title: 'LMA Core Documents (15)', level: 2 },
        { id: 'africa-documents', title: 'Africa-Specific (3)', level: 2 },
        { id: 'vector-search', title: 'Vector Search', level: 2 },
      ]}
    >
      <h2 id="sources" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Document Sources
      </h2>

      <DataTable
        headers={['Source', 'Docs', 'Use Case']}
        rows={[
          [<a key="1" href="#core-documents" className="font-semibold text-verdex-700 hover:underline">LMA Core Documents</a>, '15', 'Facility agreements, guides, templates'],
          [<a key="2" href="#africa-documents" className="font-semibold text-verdex-700 hover:underline">Africa-Specific Documents</a>, '3', 'Kenya, Nigeria, Tanzania, Uganda, Zambia, OHADA'],
          [<a key="3" href="https://sciencebasedtargets.org/resources/files/Net-Zero-Standard-v2-Consultation-Draft.pdf" target="_blank" rel="noopener noreferrer" className="text-verdex-600 hover:underline">SBTi Net-Zero Standard V2</a>, '1', 'Science-based target validation'],
          [<a key="4" href="https://unfccc.int/sites/default/files/english_paris_agreement.pdf" target="_blank" rel="noopener noreferrer" className="text-verdex-600 hover:underline">Paris Agreement</a>, '1', 'Article 2, 4, 6, 9, 13 alignment'],
        ]}
      />

      <h2 id="core-documents" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        LMA Core Documents (15)
      </h2>

      <p className="text-gray-600 mb-6">
        These documents are indexed via Pinecone for semantic clause search. All sourced directly from{' '}
        <a href="https://www.lma.eu.com" target="_blank" rel="noopener noreferrer" className="text-verdex-600 hover:underline">lma.eu.com</a>.
      </p>

      <div className="space-y-3">
        {[
          { name: 'LMA Guide to Syndicated Loans', category: 'Guide' },
          { name: 'LMA LSTA Glossary of Terms (2014)', category: 'Reference' },
          { name: 'LMA Users Guide to Primary Documents', category: 'Guide' },
          { name: 'ACT Borrower\'s Guide (Investment Grade)', category: 'Guide' },
          { name: 'ACT Borrower\'s Guide (RFRs)', category: 'Guide' },
          { name: 'ACT and LMA LIBOR Guide', category: 'Guide' },
          { name: 'Users Guide (Leveraged Acquisition Finance)', category: 'Guide' },
          { name: 'Compounded SOFR Facility Agreement (Markup)', category: 'Template' },
          { name: 'Compounded SONIA Facility Agreement (Markup)', category: 'Template' },
          { name: 'ITPP Facility Agreement (Markup)', category: 'Template' },
          { name: 'Single Currency Revolving (Developing Markets)', category: 'Template' },
          { name: 'LMA Briefing - UK Mid-Market Trends', category: 'Briefing' },
          { name: 'Contractual Interpretation (Arnold v Britton)', category: 'Legal' },
          { name: 'Green Loan Principles (Mar 2025)', category: 'Green' },
          { name: 'SLL Principles (Mar 2025)', category: 'SLL' },
        ].map((doc, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            <span className="text-xs font-mono bg-verdex-100 text-verdex-700 px-2 py-1 rounded">{doc.category}</span>
            <span className="text-sm text-gray-700 flex-1">{doc.name}</span>
          </div>
        ))}
      </div>

      <h2 id="africa-documents" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Africa-Specific Documents (3)
      </h2>

      <p className="text-gray-600 mb-6">
        Documents focused on African markets, legal frameworks, and renewable energy financing.
      </p>

      <div className="space-y-3">
        {[
          { name: 'Africa and Renewables', category: 'Energy', url: 'https://www.lma.eu.com/application/files/5515/4990/3008/Africa_and_Renewables_FINAL.PDF' },
          { name: 'User Guide: Kenya, Nigeria, Tanzania, Uganda, Zambia', category: 'Guide', url: 'https://www.lma.eu.com/application/files/4915/4643/0846/User_Guide_to_Facility_Agreements_for_Use_in_Kenya_Nigeria_Tanzania_Uganda_and_Zambia.pdf' },
          { name: 'OHADA Guide (English) - Francophone Africa', category: 'Legal', url: 'https://www.lma.eu.com/application/files/8514/6859/4517/OHADA_ENGLISH.pdf' },
        ].map((doc, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-verdex-50 transition-colors">
            <span className="text-xs font-mono bg-emerald-100 text-emerald-700 px-2 py-1 rounded">{doc.category}</span>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-verdex-600 hover:underline flex-1"
            >
              {doc.name}
            </a>
          </div>
        ))}
      </div>

      <h2 id="vector-search" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Vector Search Implementation
      </h2>

      <div className="my-6 p-6 rounded-xl bg-verdex-50 border border-verdex-100">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-verdex-800 mb-3">Embeddings</h3>
            <ul className="space-y-2 text-verdex-700 text-sm">
              <li>• Model: BGE-small-en</li>
              <li>• Dimension: 384</li>
              <li>• Chunking: 500 tokens with overlap</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-verdex-800 mb-3">Vector Database</h3>
            <ul className="space-y-2 text-verdex-700 text-sm">
              <li>• Provider: Pinecone</li>
              <li>• Index: LMA clause vectors</li>
              <li>• Metadata: clause type, doc type, source</li>
            </ul>
          </div>
        </div>
      </div>

      <InfoBox type="tip" title="Semantic Search">
        The knowledge base enables semantic search across all indexed documents, allowing users to find relevant clauses and provisions based on meaning rather than exact keyword matches.
      </InfoBox>

    </DocPage>
  );
}
