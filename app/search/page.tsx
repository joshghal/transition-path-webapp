'use client';

import { useState } from 'react';

interface SearchResult {
  id: string;
  score: number;
  content: string;
  metadata: {
    clauseType?: string;
    documentType?: string;
    source?: string;
  };
}

const QUICK_SEARCHES = [
  'margin ratchet sustainability',
  'KPI definition climate',
  'reporting covenant annual',
  'verification external assurance',
  'DFI participation clause',
  'use of proceeds transition',
  'conditions precedent green loan',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedClause, setSelectedClause] = useState<SearchResult | null>(null);

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, limit: 10 }),
      });

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSearch = (q: string) => {
    setQuery(q);
    handleSearch(q);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-32 pb-16 relative overflow-hidden">
      {/* Animated Blobs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob blob-green w-[500px] h-[500px] -top-40 -right-40 opacity-30 animate-blob" />
        <div className="blob blob-teal w-[400px] h-[400px] bottom-20 -left-32 opacity-25 animate-blob-reverse" />
        <div className="blob blob-emerald w-[300px] h-[300px] top-1/2 right-1/4 opacity-20 animate-blob-slow" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6">
            <svg className="w-5 h-5 text-veridian-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-veridian-800">LMA Clause Database</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-gray-900 mb-4">Search LMA Clauses</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Find relevant clause templates from LMA documentation for your transition loan
          </p>
        </div>

        {/* Search Input */}
        <div className="glass-card rounded-3xl p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              className="flex-1 px-5 py-4 bg-white/80 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-veridian-500 focus:border-veridian-500 transition-all"
              placeholder="Search for clauses (e.g., 'margin ratchet sustainability', 'KPI definition')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="bg-veridian-700 hover:bg-veridian-800 text-white font-semibold px-8 py-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Quick Search Tags */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Quick searches:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SEARCHES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickSearch(q)}
                  className="text-sm px-4 py-1.5 bg-white/60 hover:bg-white text-gray-700 rounded-full transition-all border border-gray-200 hover:border-veridian-300 hover:text-veridian-700"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Results List */}
          <div className="space-y-4">
            {loading && (
              <div className="glass-card rounded-2xl text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-veridian-600 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-500">Searching...</p>
              </div>
            )}

            {!loading && searched && results.length === 0 && (
              <div className="glass-card rounded-2xl text-center py-12">
                <p className="text-gray-500">No results found. Try different keywords.</p>
              </div>
            )}

            {!loading && results.map((result, idx) => (
              <div
                key={result.id}
                className={`glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                  selectedClause?.id === result.id
                    ? 'ring-2 ring-veridian-500 border-veridian-500 bg-white/90'
                    : 'hover:bg-white/90 hover:-translate-y-1 hover:shadow-lg'
                }`}
                onClick={() => setSelectedClause(result)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">#{idx + 1}</span>
                    {result.metadata.clauseType && (
                      <span className="text-xs bg-veridian-100 text-veridian-800 px-2 py-1 rounded-full">
                        {result.metadata.clauseType.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-veridian-600 font-semibold">
                    {(result.score * 100).toFixed(0)}% match
                  </span>
                </div>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {result.content.substring(0, 200)}...
                </p>
                {result.metadata.source && (
                  <p className="text-xs text-gray-400 mt-2">
                    Source: {result.metadata.source}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Clause Preview */}
          <div className="lg:sticky lg:top-24">
            {selectedClause ? (
              <div className="glass-card rounded-3xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display font-medium text-gray-900">Clause Preview</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedClause.content);
                    }}
                    className="text-sm text-veridian-600 hover:text-veridian-700 font-semibold transition-colors"
                  >
                    Copy to clipboard
                  </button>
                </div>

                <div className="flex gap-2 mb-4">
                  {selectedClause.metadata.clauseType && (
                    <span className="text-xs bg-veridian-100 text-veridian-800 px-3 py-1.5 rounded-full font-medium">
                      {selectedClause.metadata.clauseType.replace(/_/g, ' ')}
                    </span>
                  )}
                  {selectedClause.metadata.documentType && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full font-medium">
                      {selectedClause.metadata.documentType.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>

                <pre className="bg-white/80 p-4 rounded-xl text-sm text-gray-700 whitespace-pre-wrap font-mono overflow-auto max-h-[500px] border border-gray-100">
                  {selectedClause.content}
                </pre>

                {selectedClause.metadata.source && (
                  <p className="text-xs text-gray-500 mt-4">
                    Source: {selectedClause.metadata.source}
                  </p>
                )}
              </div>
            ) : (
              <div className="glass-card rounded-3xl text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500">
                  {searched
                    ? 'Click a result to preview the full clause'
                    : 'Search for clauses to get started'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
