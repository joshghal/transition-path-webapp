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
        { id: 'vector-search', title: 'Vector Search', level: 2 },
      ]}
    >
      <h2 id="sources" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Document Sources
      </h2>

      <DataTable
        headers={['Source', 'Documents', 'Use Case']}
        rows={[
          [<span key="1" className="font-semibold text-verdex-700">LMA Core Documents</span>, '16', 'Facility agreements, guides, templates (indexed via Pinecone)'],
          ['LMA Transition Loan Guide', '1', '5 Core Components validation'],
          ['LMA Green/SLL Principles', '4', 'Sustainability-linked loan compliance'],
          ['SBTi Net-Zero Standard V2', '1', 'Science-based target validation'],
          ['Paris Agreement', '1', 'Article 2, 4, 6, 9, 13 alignment'],
          ['Country NDCs', '7', 'National target alignment'],
          ['Sector Pathways', '5', 'Decarbonization trajectory validation'],
        ]}
      />

      <h2 id="vector-search" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Vector Search Implementation
      </h2>

      <div className="my-6 p-6 rounded-xl bg-verdex-50 border border-verdex-100">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-verdex-800 mb-3">Embeddings</h3>
            <ul className="space-y-2 text-verdex-700 text-sm">
              <li>• Model: BGE-small-en</li>
              <li>• Dimension: 707</li>
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
