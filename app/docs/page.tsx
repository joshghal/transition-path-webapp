import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Shield,
  Target,
  Building2,
  FileText,
  BarChart3,
  Sparkles,
  BookOpen,
  Leaf
} from 'lucide-react';

export const metadata = {
  title: 'Documentation | Verdex',
  description: 'Complete documentation for Verdex - AI-powered green finance platform for African transition projects',
};

const quickLinks = [
  {
    title: 'Executive Summary',
    description: 'High-level overview of the Verdex platform and its mission',
    href: '/docs/executive-summary',
    icon: <FileText className="w-5 h-5" />,
    gradient: 'from-verdex-500 to-emerald-500',
    bgGradient: 'from-verdex-50 to-emerald-50',
  },
  {
    title: 'LMA Validator',
    description: 'Score projects against the 5 Core Components for Transition Loans',
    href: '/docs/features/lma-validator',
    icon: <Target className="w-5 h-5" />,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    title: 'DFI Matching',
    description: 'Match projects with appropriate Development Finance Institutions',
    href: '/docs/features/dfi-matching',
    icon: <Building2 className="w-5 h-5" />,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  {
    title: 'Technical Architecture',
    description: 'Deep dive into the platform architecture and knowledge base',
    href: '/docs/technical/architecture',
    icon: <Zap className="w-5 h-5" />,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-50 to-amber-50',
  },
];

const features = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'LMA Compliance',
    description: 'Validate against 5 Core Components',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: '7+ DFIs',
    description: 'IFC, AfDB, FMO, DEG, BII, Proparco, DFC',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Greenwash Detection',
    description: 'AI-powered red flag identification',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'KPI Framework',
    description: 'Science-based target recommendations',
  },
];

const stats = [
  { value: '$277B', label: 'Annual climate finance needed', accent: 'text-verdex-600' },
  { value: '7', label: 'Priority African countries', accent: 'text-emerald-600' },
  { value: '16+', label: 'LMA documents indexed', accent: 'text-teal-600' },
  { value: '5', label: 'Core assessment components', accent: 'text-cyan-600' },
];

export default function DocsHome() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-16 lg:py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-verdex-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-verdex-50 to-emerald-50 border border-verdex-200 text-verdex-700 text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4 text-verdex-500" />
              LMA Edge Hackathon 2025
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center leading-tight">
            <span className="text-gray-900">Verdex</span>
            <span className="block mt-2 bg-gradient-to-r from-verdex-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
            Bridging Africa&apos;s <span className="text-verdex-700 font-semibold">$233 billion</span> climate finance gap through AI-powered transition loan validation
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs/executive-summary"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-verdex-600 to-verdex-700 hover:from-verdex-700 hover:to-verdex-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-verdex-500/25 hover:shadow-verdex-500/40"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/assess"
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-verdex-50 text-verdex-700 font-semibold rounded-xl border-2 border-verdex-200 hover:border-verdex-300 transition-all shadow-sm"
            >
              Launch App
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative group p-6 rounded-2xl bg-white border border-verdex-100 hover:border-verdex-200 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-verdex-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`text-2xl md:text-3xl font-bold ${stat.accent} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-8">
            Quick Start
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-verdex-200 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg"
              >
                {/* Gradient accent on hover */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${link.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity`} />

                <div className="relative flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${link.gradient} text-white shadow-lg`}>
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-verdex-700 transition-colors flex items-center gap-2">
                      {link.title}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{link.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-8">
            Platform Capabilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-gray-100 hover:border-verdex-200 transition-all group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-verdex-50 to-verdex-100 flex items-center justify-center text-verdex-600 mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-verdex-50 via-white to-emerald-50 border border-verdex-100 shadow-lg">
            {/* Decorative leaf */}
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-verdex-100 to-verdex-200 flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-verdex-600" />
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              &ldquo;Africa requires <span className="text-verdex-700 font-semibold">USD 277 billion annually</span> to meet its climate commitments, yet receives only <span className="text-verdex-700 font-semibold">USD 44 billion</span>. The gap is not due to lack of viable projects&mdash;it&apos;s due to an inability to demonstrate compliance with evolving transition finance frameworks.&rdquo;
            </blockquote>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-verdex-500 to-verdex-700 flex items-center justify-center text-white font-bold shadow-lg">
                V
              </div>
              <div>
                <div className="text-gray-900 font-semibold">Verdex Mission</div>
                <div className="text-sm text-verdex-600">Bridging the validation gap</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Sections */}
      <section className="px-6 lg:px-8 py-12 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-8">
            Browse Documentation
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Problem & Solution',
                description: 'Understand the climate finance gap and how Verdex addresses it',
                href: '/docs/problem/climate-finance-gap',
                icon: <Target className="w-5 h-5" />,
                color: 'from-rose-500 to-orange-500',
                bgColor: 'bg-rose-50',
              },
              {
                title: 'Core Features',
                description: 'Explore LMA validation, DFI matching, and greenwash detection',
                href: '/docs/features/lma-validator',
                icon: <Zap className="w-5 h-5" />,
                color: 'from-verdex-500 to-emerald-500',
                bgColor: 'bg-verdex-50',
              },
              {
                title: 'Technical Deep Dive',
                description: 'Architecture, knowledge base, and API reference',
                href: '/docs/technical/architecture',
                icon: <BookOpen className="w-5 h-5" />,
                color: 'from-blue-500 to-indigo-500',
                bgColor: 'bg-blue-50',
              },
            ].map((section, idx) => (
              <Link
                key={idx}
                href={section.href}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-verdex-200 transition-all shadow-sm hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl ${section.bgColor} flex items-center justify-center mb-4`}>
                  <div className={`bg-gradient-to-br ${section.color} bg-clip-text text-transparent`}>
                    {section.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-verdex-700 transition-colors">
                  {section.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{section.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-verdex-600 font-medium">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
