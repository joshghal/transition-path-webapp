import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Target,
  Building2,
  FileText,
  BarChart3,
  Leaf,
  Globe,
  BookOpen,
  Layers,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'Documentation | Verdex',
  description: 'Complete documentation for Verdex - AI-powered green finance platform for African transition projects',
};

export default function DocsHome() {
  return (
    <div className="min-h-screen">
      {/* Bento Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Main Bento Grid */}
        <div className="grid grid-cols-12 gap-3 lg:gap-4">

          {/* Hero Card - Large Featured */}
          <div className="col-span-12 lg:col-span-8 row-span-2 relative group">
            <div className="h-full min-h-[400px] lg:min-h-[480px] rounded-3xl bg-gradient-to-br from-verdex-600 via-verdex-950 to-verdex-900 p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.07]">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              {/* Floating Elements - More subtle */}
              <div className="absolute top-20 right-20 w-48 h-48 bg-white/[0.04] rounded-full blur-[80px]" />
              <div className="absolute bottom-20 left-20 w-56 h-56 bg-emerald-300/[0.06] rounded-full blur-[100px]" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  LMA Edge Hackathon 2025
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-[1.1] max-w-xl">
                  AI-Powered Transition Finance Validation
                </h1>

                <p className="mt-5 text-lg text-white/80 max-w-lg leading-relaxed">
                  Bridging Africa&apos;s $233 billion climate finance gap through automated LMA compliance scoring.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-3">
                <Link
                  href="/docs/executive-summary"
                  className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-white text-verdex-700 font-semibold rounded-xl hover:bg-verdex-50 transition-all shadow-lg"
                >
                  Read the Docs
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/assess"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  Try the App
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Card - Problem (KPI color - cyan/blue) */}
          <div className="col-span-6 lg:col-span-4 relative group">
            <Link href="/docs/problem/climate-finance-gap" className="block h-full">
              <div className="h-full rounded-2xl bg-gradient-to-br from-blue-700 via-blue-950 to-blue-900 p-4 lg:p-5 hover:shadow-xl transition-all overflow-hidden relative">
                {/* Texture */}
                <div className="absolute inset-0 opacity-[0.05]">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid-problem" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid-problem)" />
                  </svg>
                </div>
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/[0.08] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">$233B</div>
                  <div className="text-xs text-white/60 mt-1">Annual finance gap</div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="text-xs text-cyan-300 font-medium">The Problem</div>
                    <div className="text-[10px] text-white/70 font-medium mt-0.5">Climate investment shortfall</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Card - Solution (SPT color - violet/purple) */}
          <div className="col-span-6 lg:col-span-4 relative group">
            <Link href="/docs/solution-overview" className="block h-full">
              <div className="h-full rounded-2xl bg-gradient-to-br from-violet-700 via-violet-950 to-violet-900 p-4 lg:p-5 hover:shadow-xl transition-all overflow-hidden relative">
                {/* Texture */}
                <div className="absolute inset-0 opacity-[0.05]">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid-solution" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid-solution)" />
                  </svg>
                </div>
                {/* Subtle glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-400/[0.08] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">5</div>
                  <div className="text-xs text-white/60 mt-1">Core LMA components</div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="text-xs text-violet-300 font-medium">Our Solution</div>
                    <div className="text-[10px] text-white/70 font-medium mt-0.5">Automated compliance scoring</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* LMA Validator - Wide Card */}
          <div className="col-span-12 lg:col-span-6 relative group">
            <Link href="/docs/features/lma-validator" className="block h-full">
              <div className="h-full min-h-[200px] rounded-2xl bg-white border border-gray-100 p-6 lg:p-8 hover:shadow-xl hover:border-verdex-200 transition-all overflow-hidden relative">
                {/* Decorative corner - subtle */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-verdex-100/40 to-emerald-100/30 rounded-full blur-2xl" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-verdex-500 to-verdex-600 flex items-center justify-center text-white shadow-lg shadow-verdex-500/20">
                        <Target className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-verdex-500 transition-colors" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mt-5">LMA Validator</h3>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                      Score projects against the 5 Core Components for Transition Loans. Get detailed compliance analysis with actionable recommendations.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Strategy', 'Implementation', 'Governance', 'Disclosure', 'Targets'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-verdex-50 text-verdex-600 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* DFI Matching - Wide Card */}
          <div className="col-span-12 lg:col-span-6 relative group">
            <Link href="/docs/features/dfi-matching" className="block h-full">
              <div className="h-full min-h-[200px] rounded-2xl bg-white border border-gray-100 p-6 lg:p-8 hover:shadow-xl hover:border-verdex-200 transition-all overflow-hidden relative">
                {/* Decorative corner - subtle */}
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-emerald-100/40 to-teal-100/30 rounded-full blur-2xl" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mt-5">DFI Matching</h3>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                      Connect projects with the right Development Finance Institutions. Intelligent matching based on sector, geography, and mandate alignment.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {['IFC', 'AfDB', 'FMO', 'DEG', 'BII', 'DFC'].map((dfi) => (
                      <span key={dfi} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-medium">
                        {dfi}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Quote Card - Full Width */}
          <div className="col-span-12 relative">
            <div className="rounded-2xl bg-gradient-to-r from-verdex-900 via-verdex-800 to-verdex-900 p-8 lg:p-10 relative overflow-hidden">
              {/* Accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-verdex-400 via-emerald-400 to-teal-400" />

              {/* Subtle glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-verdex-500/[0.08] rounded-full blur-[60px]" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                <div className="flex-1">
                  <p className="text-lg lg:text-xl text-white/90 leading-relaxed font-light">
                    &ldquo;Africa requires <span className="text-verdex-400 font-medium">USD 277 billion annually</span> to meet its climate commitments, yet receives only <span className="text-verdex-400 font-medium">USD 44 billion</span>. The gap is not due to lack of viable projects—it&apos;s due to an inability to demonstrate compliance.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 lg:border-l lg:border-white/10 lg:pl-12">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-verdex-500 to-emerald-600 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">The Climate Gap</div>
                    <div className="text-verdex-400 text-sm">Africa 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Greenwash Detection - Small */}
          <div className="col-span-6 lg:col-span-3 relative group">
            <Link href="/docs/features/greenwash-detection" className="block h-full">
              <div className="h-full rounded-2xl bg-gradient-to-br from-verdex-800 to-verdex-900 p-4 hover:shadow-xl transition-all overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.04]">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid-gw" width="6" height="6" patternUnits="userSpaceOnUse">
                        <path d="M 6 0 L 0 0 0 6" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid-gw)" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-verdex-400/[0.06] rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                      <Shield className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Greenwash Detection</h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">AI-powered red flag identification</p>
                </div>
              </div>
            </Link>
          </div>

          {/* KPI Framework - Small */}
          <div className="col-span-6 lg:col-span-3 relative group">
            <Link href="/docs/features/kpi-generator" className="block h-full">
              <div className="h-full rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-4 hover:shadow-xl transition-all overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.04]">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid-kpi" width="6" height="6" patternUnits="userSpaceOnUse">
                        <path d="M 6 0 L 0 0 0 6" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid-kpi)" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-emerald-300/[0.06] rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">KPI Framework</h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">Science-based targets & metrics</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Clause Library - Small */}
          <div className="col-span-6 lg:col-span-3 relative group">
            <Link href="/docs/features/clause-library" className="block h-full">
              <div className="h-full rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 p-4 hover:shadow-xl transition-all overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.04]">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid-clause" width="6" height="6" patternUnits="userSpaceOnUse">
                        <path d="M 6 0 L 0 0 0 6" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid-clause)" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-teal-300/[0.06] rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                      <FileText className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Clause Library</h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">16+ LMA documents indexed</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Architecture - Small */}
          <div className="col-span-6 lg:col-span-3 relative group">
            <Link href="/docs/technical/architecture" className="block h-full">
              <div className="h-full rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-4 hover:shadow-xl transition-all overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.04]">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid-arch" width="6" height="6" patternUnits="userSpaceOnUse">
                        <path d="M 6 0 L 0 0 0 6" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid-arch)" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-slate-400/[0.06] rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                      <Layers className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Architecture</h3>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">Technical deep dive</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom Section - Documentation Map */}
          <div className="col-span-12 lg:col-span-8 relative">
            <div className="rounded-2xl bg-white border border-gray-100 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-verdex-100 flex items-center justify-center text-verdex-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Documentation Map</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    section: 'Getting Started',
                    items: ['Executive Summary', 'Quick Start Guide'],
                    href: '/docs/executive-summary',
                  },
                  {
                    section: 'Problem & Solution',
                    items: ['Climate Finance Gap', 'Verdex Approach'],
                    href: '/docs/problem/climate-finance-gap',
                  },
                  {
                    section: 'Core Features',
                    items: ['LMA Validator', 'DFI Matching', 'Greenwash Detection'],
                    href: '/docs/features/lma-validator',
                  },
                  {
                    section: 'Technical',
                    items: ['Architecture', 'Knowledge Base', 'API Reference'],
                    href: '/docs/technical/architecture',
                  },
                ].map((section) => (
                  <Link
                    key={section.section}
                    href={section.href}
                    className="group p-4 rounded-xl border border-gray-100 hover:border-verdex-200 hover:bg-verdex-50/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">{section.section}</span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-verdex-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <div key={item} className="text-xs text-gray-500">{item}</div>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Priority Countries */}
          <div className="col-span-12 lg:col-span-4 relative">
            <div className="h-full rounded-2xl bg-gradient-to-br from-verdex-600 to-verdex-950 p-6 lg:p-8 text-white overflow-hidden relative">
              {/* Subtle glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/[0.08] rounded-full blur-[50px]" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-semibold">Priority Countries</h2>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {['Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Morocco', 'Ghana', 'Ethiopia'].map((country) => (
                    <div
                      key={country}
                      className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-sm text-white/90 text-center"
                    >
                      {country}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/15">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Highest climate finance needs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
