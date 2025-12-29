import DocPage, { InfoBox } from '@/components/docs/DocPage';

export const metadata = {
  title: 'Roadmap | Verdex Docs',
  description: 'Future development roadmap for Verdex platform',
};

export default function RoadmapPage() {
  return (
    <DocPage
      title="Future Roadmap"
      description="Planned features and enhancements for the Verdex platform."
      breadcrumbs={[{ label: 'Business' }, { label: 'Roadmap' }]}
      previousPage={{ title: 'Business Model', href: '/docs/business/model' }}
      nextPage={{ title: 'References', href: '/docs/resources/references' }}
      tableOfContents={[
        { id: 'financing-structure', title: 'Financing Structure', level: 2 },
        { id: 'documentation-checklist', title: 'Documentation Checklist', level: 2 },
        { id: 'advanced-clauses', title: 'Advanced Clause Features', level: 2 },
      ]}
    >
      <InfoBox type="info" title="Planned Development">
        The following features are planned for future development, pending proper data sourcing and validation.
      </InfoBox>

      <h2 id="financing-structure" className="text-2xl font-display font-semibold text-gray-900 mt-8 mb-4">
        Recommended Financing Structure
      </h2>

      <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 my-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Planned</span>
          <span className="text-gray-500 text-sm">Requires verified DFI participation data</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">What it would do:</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Visual capital stack showing Senior Debt / Mezzanine / Equity breakdown</li>
          <li>• DFI role recommendations (which DFI for which tranche)</li>
          <li>• Estimated pricing ranges</li>
        </ul>
        <h3 className="font-semibold text-gray-900 mt-4 mb-2">What&apos;s needed to implement:</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Verified DFI participation policies (min/max ticket sizes, typical roles)</li>
          <li>• Official sources: IFC investment criteria, AfDB operational policies</li>
          <li>• Partnership with DFIs to validate assumptions</li>
        </ul>
      </div>

      <h2 id="documentation-checklist" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Documentation Checklist
      </h2>

      <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 my-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Planned</span>
          <span className="text-gray-500 text-sm">Requires official sourcing</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">What it would do:</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• 38-54 item checklist across 6 categories</li>
          <li>• DFI-specific requirements flagged</li>
          <li>• Interactive progress tracking</li>
        </ul>
        <h3 className="font-semibold text-gray-900 mt-4 mb-2">Categories:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {['Corporate', 'Project', 'Financial', 'Environmental', 'Transition', 'Country-specific'].map((cat, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-verdex-50 text-verdex-700 text-sm text-center">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <h2 id="advanced-clauses" className="text-2xl font-display font-semibold text-gray-900 mt-12 mb-4">
        Advanced Clause Features
      </h2>

      <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 my-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-verdex-100 text-verdex-700 text-xs font-semibold">Partial</span>
          <span className="text-gray-500 text-sm">Search works, advanced features planned</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Planned enhancements:</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Filter by LMA component (1-5)</li>
          <li>• Filter by sector</li>
          <li>• Auto-populate clause templates with project data</li>
          <li>• Export to DOCX with filled variables</li>
        </ul>
      </div>

    </DocPage>
  );
}
