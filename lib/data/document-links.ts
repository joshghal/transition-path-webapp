// Official LMA Document Links Registry
// Maps source document names to their official URLs for reference

export interface OfficialDocument {
  name: string;
  shortName: string;
  url: string;
  organization: 'LMA' | 'APLMA' | 'ICMA' | 'OTHER';
  type: 'principles' | 'guidance' | 'handbook' | 'template' | 'guide';
  version?: string;
  lastUpdated?: string;
}

// Document registry with official LMA links
export const OFFICIAL_DOCUMENTS: OfficialDocument[] = [
  // =============================================
  // LMA SUSTAINABILITY-LINKED LOAN PRINCIPLES
  // =============================================
  {
    name: 'Sustainability-Linked Loan Principles',
    shortName: 'SLLP',
    url: 'https://www.lma.eu.com/application/files/6317/4298/0865/Sustainability-Linked_Loan_Principles_-_26_March_2025.pdf',
    organization: 'LMA',
    type: 'principles',
    version: 'March 2025',
    lastUpdated: '2025-03-26',
  },
  {
    name: 'Guidance on Sustainability-Linked Loan Principles',
    shortName: 'SLLP Guidance',
    url: 'https://www.lma.eu.com/application/files/3517/4298/0872/Guidance_on_Sustainability-Linked_Loan_Principles_-_26_March_2025.pdf',
    organization: 'LMA',
    type: 'guidance',
    version: 'March 2025',
    lastUpdated: '2025-03-26',
  },
  {
    name: 'Guide to the Application of SLLP in Fund Finance',
    shortName: 'SLLP Fund Finance Guide',
    url: 'https://www.lma.eu.com/application/files/4417/0963/8357/A_Guide_to_the_Application_of_the_SLLP_in_Fund_Finance.pdf',
    organization: 'LMA',
    type: 'guide',
  },
  {
    name: 'Guidance on SLLPs in Real Estate Finance',
    shortName: 'SLLP Real Estate Guide',
    url: 'https://www.lma.eu.com/application/files/9316/6913/8461/Guidance_to_the_application_of_SLLPs_in_the_real_estate_finance_and_real_estate_finance_development_context.pdf',
    organization: 'LMA',
    type: 'guidance',
  },

  // =============================================
  // LMA GREEN LOAN PRINCIPLES
  // =============================================
  {
    name: 'Green Loan Principles',
    shortName: 'GLP',
    url: 'https://www.lma.eu.com/application/files/1917/4298/0817/Green_Loan_Principles_-_26_March_2025.pdf',
    organization: 'LMA',
    type: 'principles',
    version: 'March 2025',
    lastUpdated: '2025-03-26',
  },
  {
    name: 'Guidance on Green Loan Principles',
    shortName: 'GLP Guidance',
    url: 'https://www.lma.eu.com/application/files/1717/4298/0842/Guidance_on_Green_Loan_Principles_-_26_March_2025.pdf',
    organization: 'LMA',
    type: 'guidance',
    version: 'March 2025',
    lastUpdated: '2025-03-26',
  },
  {
    name: 'Guidance on Green Loan Principles - Real Estate Retrofit',
    shortName: 'GLP Real Estate Guide',
    url: 'https://www.lma.eu.com/application/files/5316/4580/0900/Guidance_on_the_application_of_the_Green_Loan_Principles_in_the_real_estate_lending_context_-_Retrofit_projects.pdf',
    organization: 'LMA',
    type: 'guidance',
  },

  // =============================================
  // LMA SOCIAL LOAN PRINCIPLES
  // =============================================
  {
    name: 'Social Loan Principles',
    shortName: 'SLP',
    url: 'https://www.lma.eu.com/application/files/5817/4298/0856/Social_Loan_Principles_-_26_March_2025.pdf',
    organization: 'LMA',
    type: 'principles',
    version: 'March 2025',
    lastUpdated: '2025-03-26',
  },
  {
    name: 'Guidance on Social Loan Principles',
    shortName: 'SLP Guidance',
    url: 'https://www.lma.eu.com/application/files/9717/4298/0850/Guidance_on_Social_Loan_Principles_-_26_March_2025.pdf',
    organization: 'LMA',
    type: 'guidance',
    version: 'March 2025',
    lastUpdated: '2025-03-26',
  },

  // =============================================
  // LMA TRANSITION FINANCE
  // =============================================
  {
    name: 'Guide to Transition Loans',
    shortName: 'Transition Guide',
    url: 'https://www.lma.eu.com/application/files/9917/6035/1809/Guide_to_Transition_Loans_-_16_October_2025.pdf',
    organization: 'LMA',
    type: 'guide',
    version: 'October 2025',
    lastUpdated: '2025-10-16',
  },
  {
    name: 'Guidelines for Sustainability-Linked Loan Financing Bonds',
    shortName: 'SLLB Guidelines',
    url: 'https://www.lma.eu.com/application/files/1317/5568/5641/Guidelines_for_Sustainability-Linked_Loan_Financing_Bonds_-_June_2024_including_June_2025_Annex_on_FAQ.pdf',
    organization: 'LMA',
    type: 'guidance',
    version: 'June 2025',
    lastUpdated: '2025-06-01',
  },

  // =============================================
  // LMA FACILITY AGREEMENTS & USER GUIDES
  // =============================================
  {
    name: 'User Guide to Interest Rate Provisions in LMA Facility Agreements',
    shortName: 'Interest Rate Guide',
    url: 'https://www.lma.eu.com/application/files/8917/5144/6565/2025_-_2_July_-_Users_Guide_to_Interest_Rate_Provisions_in_the_LMA_Facility_Agreements.pdf',
    organization: 'LMA',
    type: 'guide',
    version: 'July 2025',
    lastUpdated: '2025-07-02',
  },
  {
    name: 'User Guide to Recommended Form of Primary Documents',
    shortName: 'Primary Docs Guide',
    url: 'https://www.lma.eu.com/application/files/2717/5144/6564/2025_-_2_July_-_User_Guide_to_the_Recommended_Form_of_Primary_Documents.pdf',
    organization: 'LMA',
    type: 'guide',
    version: 'July 2025',
    lastUpdated: '2025-07-02',
  },

  // =============================================
  // ICMA GREEN BOND PRINCIPLES
  // =============================================
  {
    name: 'Green Bond Principles',
    shortName: 'GBP',
    url: 'https://www.icmagroup.org/assets/documents/Sustainable-finance/2025-updates/Green-Bond-Principles-GBP-June-2025.pdf',
    organization: 'ICMA',
    type: 'principles',
    version: 'June 2025',
    lastUpdated: '2025-06-01',
  },
  {
    name: 'Sustainability-Linked Bond Principles',
    shortName: 'SLBP',
    url: 'https://www.icmagroup.org/sustainable-finance/the-principles-guidelines-and-handbooks/sustainability-linked-bond-principles-slbp/',
    organization: 'ICMA',
    type: 'principles',
  },
  {
    name: 'ICMA Principles Guidance Handbook',
    shortName: 'ICMA Handbook',
    url: 'https://www.icmagroup.org/assets/documents/Sustainable-finance/2024-updates/The-Principles-Guidance-Handbook-June-2024.pdf',
    organization: 'ICMA',
    type: 'handbook',
    version: 'June 2024',
    lastUpdated: '2024-06-01',
  },

  // =============================================
  // SBTI (SCIENCE BASED TARGETS INITIATIVE)
  // =============================================
  {
    name: 'SBTi Net-Zero Standard',
    shortName: 'SBTi Net-Zero',
    url: 'https://files.sciencebasedtargets.org/production/files/Net-Zero-Standard.pdf',
    organization: 'OTHER',
    type: 'principles',
  },

  // =============================================
  // ACT / SLAUGHTER AND MAY GUIDES
  // =============================================
  {
    name: 'ACT Borrower\'s Guide to LMA Investment Grade Agreements',
    shortName: 'ACT Borrower Guide',
    url: 'https://www.slaughterandmay.com/media/3nxndtwn/the-lmas-recommended-forms-of-facility-agreement-for-loans-referencing-risk-free-rates.pdf',
    organization: 'OTHER',
    type: 'guide',
  },

  // =============================================
  // INTERNATIONAL AGREEMENTS
  // =============================================
  {
    name: 'Paris Agreement',
    shortName: 'Paris Agreement',
    url: 'https://unfccc.int/sites/default/files/english_paris_agreement.pdf',
    organization: 'OTHER',
    type: 'principles',
    version: '2015',
  },

  // =============================================
  // LMA AFRICAN DOCUMENTS
  // =============================================
  {
    name: 'User Guide to Facility Agreements for Kenya, Nigeria, Tanzania, Uganda and Zambia',
    shortName: 'EANZ Facility Guide',
    url: 'https://www.lma.eu.com/application/files/4915/4643/0846/User_Guide_to_Facility_Agreements_for_Use_in_Kenya_Nigeria_Tanzania_Uganda_and_Zambia.pdf',
    organization: 'LMA',
    type: 'guide',
  },
  {
    name: 'South African Law Facility Agreement',
    shortName: 'SA Facility Agreement',
    url: 'https://www.lma.eu.com/application/files/9817/6530/3647/Mark_Up_-__South_African_Law_Unsecured_Single_Currency_Single_Borrower_Term_And_Revolving_Facilities_Agreement_With_Rate_Switch.pdf',
    organization: 'LMA',
    type: 'template',
  },
  {
    name: 'East African Loan Markets Conference Report',
    shortName: 'East Africa Report',
    url: 'https://www.lma.eu.com/application/files/3917/6311/1176/East_African_Loan_Markets_Conference_Report.pdf',
    organization: 'LMA',
    type: 'guide',
  },
  {
    name: 'South African Loan Markets Conference and Sustainable Finance Seminar Report',
    shortName: 'SA Sustainable Finance Report',
    url: 'https://www.lma.eu.com/application/files/4317/5388/6960/Report_South_African_Loan_Markets_Conference_and_Sustainable_Finance_Seminar_.pdf',
    organization: 'LMA',
    type: 'guide',
  },
];

// Keywords to match source text against documents
const DOCUMENT_KEYWORDS: Record<string, string[]> = {
  'Sustainability-Linked Loan Principles': [
    'sustainability-linked loan principles',
    'sustainability linked loan principles',
    'sllp',
    'sustainability linked loan',
    'sll principles',
    'margin ratchet',
    'sustainability performance target',
    'spt',
    'kpi selection',
    'spt calibration',
  ],
  'Guidance on Sustainability-Linked Loan Principles': [
    'sllp guidance',
    'sustainability-linked guidance',
    'guidance on sustainability-linked',
  ],
  'Green Loan Principles': [
    'green loan principles',
    'glp',
    'green loan',
    'use of proceeds',
    'project evaluation',
    'green project',
    'proceeds management',
  ],
  'Guidance on Green Loan Principles': [
    'glp guidance',
    'green loan guidance',
    'guidance on green loan',
  ],
  'Social Loan Principles': [
    'social loan principles',
    'slp',
    'social loan',
    'social project',
  ],
  'Guidance on Social Loan Principles': [
    'slp guidance',
    'social loan guidance',
    'guidance on social loan',
  ],
  'Guide to Transition Loans': [
    'transition loan',
    'transition finance',
    'transition guide',
  ],
  'Green Bond Principles': [
    'green bond principles',
    'gbp',
    'green bond',
    'icma green',
  ],
  'Sustainability-Linked Bond Principles': [
    'sustainability-linked bond',
    'slbp',
    'sust-linked bond',
  ],
  'SBTi Net-Zero Standard': [
    'sbti',
    'science based targets',
    'science-based targets',
    'net-zero standard',
    'net zero standard',
    'sbti net-zero',
    'sbti net zero',
  ],
  'ACT Borrower\'s Guide to LMA Investment Grade Agreements': [
    'act borrower',
    'borrower guide',
    'borrower\'s guide',
    'investment grade agreement',
    'lma investment grade',
    'risk-free rates',
    'risk free rates',
  ],
  'Paris Agreement': [
    'paris agreement',
    'paris accord',
    'unfccc',
    'cop21',
    'article 2',
    'article 4',
    'ndc',
    'nationally determined contribution',
  ],
  'User Guide to Facility Agreements for Kenya, Nigeria, Tanzania, Uganda and Zambia': [
    'kenya',
    'nigeria',
    'tanzania',
    'uganda',
    'zambia',
    'eanz',
    'east africa facility',
    'african facility agreement',
    'africa transition',
  ],
  'South African Law Facility Agreement': [
    'south african law',
    'south african facility',
    'zaronia',
    'sa law',
  ],
  'East African Loan Markets Conference Report': [
    'east african loan markets',
    'east african conference',
    'east africa report',
  ],
  'South African Loan Markets Conference and Sustainable Finance Seminar Report': [
    'south african loan markets',
    'south african sustainable',
    'sa sustainable finance',
  ],
};

/**
 * Find matching official document based on source text
 * @param sourceText - The source string from clause metadata
 * @returns The matching OfficialDocument or undefined
 */
export function findOfficialDocument(sourceText: string): OfficialDocument | undefined {
  if (!sourceText) return undefined;

  const lowerSource = sourceText.toLowerCase();

  // First try exact document name matches
  for (const doc of OFFICIAL_DOCUMENTS) {
    if (
      lowerSource.includes(doc.name.toLowerCase()) ||
      lowerSource.includes(doc.shortName.toLowerCase())
    ) {
      return doc;
    }
  }

  // Then try keyword matching
  for (const [docName, keywords] of Object.entries(DOCUMENT_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerSource.includes(keyword)) {
        return OFFICIAL_DOCUMENTS.find(d => d.name === docName);
      }
    }
  }

  return undefined;
}

/**
 * Get official document URL from source text
 * @param sourceText - The source string from clause metadata
 * @returns The URL string or undefined
 */
export function getDocumentUrl(sourceText: string): string | undefined {
  const doc = findOfficialDocument(sourceText);
  return doc?.url;
}

/**
 * Get all documents for a specific organization
 */
export function getDocumentsByOrganization(org: OfficialDocument['organization']): OfficialDocument[] {
  return OFFICIAL_DOCUMENTS.filter(d => d.organization === org);
}

/**
 * Format document reference for display
 */
export function formatDocumentReference(doc: OfficialDocument): string {
  let ref = doc.name;
  if (doc.version) {
    ref += ` (${doc.version})`;
  }
  return ref;
}

/**
 * Get document summary for AI context
 * Returns a formatted string of official documents with their URLs
 * Only includes key documents to avoid bloating the prompt
 */
export function getDocumentReferencesForAI(): string {
  // Include principles, guidance, and guides (but not templates/handbooks to keep it lean)
  const docs = OFFICIAL_DOCUMENTS.filter(d =>
    d.type === 'principles' || d.type === 'guidance' || d.type === 'guide'
  );

  return docs.map(doc => {
    let line = `- **${doc.name}** (${doc.shortName})`;
    if (doc.version) line += ` - ${doc.version}`;
    line += `\n  Official PDF: ${doc.url}`;
    return line;
  }).join('\n');
}

/**
 * Get core LMA sustainable finance documents for quick reference
 */
export function getCoreLMADocuments(): OfficialDocument[] {
  return OFFICIAL_DOCUMENTS.filter(d =>
    d.organization === 'LMA' &&
    d.type === 'principles' &&
    ['SLLP', 'GLP', 'SLP'].includes(d.shortName)
  );
}
