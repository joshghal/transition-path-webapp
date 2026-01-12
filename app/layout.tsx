import type { Metadata, Viewport } from 'next';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://verdex.app';

export const metadata: Metadata = {
  title: {
    default: 'Verdex | AI-Powered Green Finance Platform for Africa',
    template: '%s | Verdex',
  },
  description: 'Verdex helps African transition projects become bankable. AI-powered LMA compliance assessment, DFI matching, KPI recommendations, and sustainability-linked loan documentation.',
  keywords: [
    'transition finance Africa',
    'green loan assessment',
    'LMA compliance',
    'DFI matching',
    'sustainable finance platform',
    'climate finance Africa',
    'sustainability-linked loans',
    'ESG financing',
    'African development finance',
    'green bond Africa',
    'carbon reduction financing',
    'renewable energy finance Africa',
    'IFC funding',
    'AfDB projects',
    'blended finance',
    'KPI sustainability',
    'SPT targets',
    'net zero transition',
  ],
  authors: [{ name: 'Verdex', url: siteUrl }],
  creator: 'Verdex',
  publisher: 'Verdex',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Verdex',
    title: 'Verdex | AI-Powered Green Finance Platform for Africa',
    description: 'Make your African transition project bankable. AI-powered LMA compliance, DFI matching, and sustainability-linked loan documentation.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Verdex - Verified Green Finance for Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verdex | AI-Powered Green Finance Platform for Africa',
    description: 'Make your African transition project bankable. AI-powered LMA compliance, DFI matching, and sustainability-linked loan documentation.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@verdex_finance',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
  },
  category: 'Finance',
  applicationName: 'Verdex',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#047857' },
    { media: '(prefers-color-scheme: dark)', color: '#065f46' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Verdex',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
      description: 'AI-powered green finance platform for African transition projects',
      sameAs: [
        'https://twitter.com/verdex_finance',
        'https://linkedin.com/company/verdex',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Verdex',
      publisher: { '@id': `${siteUrl}/#organization` },
      description: 'AI-powered LMA compliance assessment and DFI matching for African transition finance',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#app`,
      name: 'Verdex',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: 'Assess transition finance projects against LMA standards, match with DFIs, and generate compliant documentation.',
      featureList: [
        'LMA Transition Loan Compliance Assessment',
        'DFI Matching (IFC, AfDB, DEG, FMO)',
        'AI-Generated KPI Recommendations',
        'Sustainability Performance Targets',
        'Greenwashing Risk Detection',
        'LMA Clause Search Database',
        'PDF Report Export',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
