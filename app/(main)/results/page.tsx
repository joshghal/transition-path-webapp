'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatClauseContent } from '@/lib/clauseFormatter';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AssessmentResult {
  projectName: string;
  country: string;
  countryName: string;
  sector: string;
  targetYear?: number;
  // Original project data for draft generation
  description?: string;
  projectType?: string;
  totalCost?: number;
  debtAmount?: number;
  equityAmount?: number;
  currentEmissions?: { scope1: number; scope2: number; scope3?: number };
  targetEmissions?: { scope1: number; scope2: number; scope3?: number };
  // NEW: Total emissions (captures all sources, not just Scope 1/2/3)
  totalBaselineEmissions?: number;
  totalTargetEmissions?: number;
  statedReductionPercent?: number;
  transitionStrategy?: string;
  hasPublishedPlan?: boolean;
  thirdPartyVerification?: boolean;
  eligibilityStatus: 'eligible' | 'partial' | 'ineligible';
  ineligibilityReasons?: string[];
  overallScore: number;
  lmaBaseScore?: number; // Raw LMA score before penalty
  greenwashingPenalty?: number; // Points deducted
  lmaComponents: {
    name: string;
    score: number;
    maxScore: number;
    feedback: {
      status: 'met' | 'partial' | 'missing';
      description: string;
      action?: string;
    }[];
  }[];
  kpiRecommendations?: {
    name: string;
    unit: string;
    description: string;
    suggestedTarget: string;
    source?: string;
    rationale?: string;
  }[];
  sptRecommendations?: {
    name: string;
    baseline: string;
    target: string;
    marginImpact: string;
    verificationMethod?: string;
    source?: string;
  }[];
  frameworksReferenced?: string[];
  kpiAiGenerated?: boolean;
  greenwashingRisk: {
    level: string;
    score: number;
    redFlags: { description: string; recommendation: string; severity: string }[];
    positiveIndicators: string[];
    recommendations: string[];
  };
  dfiMatches: {
    id: string;
    name: string;
    fullName: string;
    matchScore: number;
    matchReasons: string[];
    concerns: string[];
    recommendedRole: string;
    estimatedSize?: { min: number; max: number };
    climateTarget?: string;
    specialPrograms?: string[];
  }[];
  blendedStructure: any;
  countryInfo: any;
  nextSteps: string[];
  assessmentDate: string;
}

interface ClauseAdvice {
  relevanceScore: number;
  relevanceSummary: string;
  howToApply: string;
  whenToUse: string;
  keyConsiderations: string[];
  suggestedModifications?: string;
  contextualizedExample?: string;
}

interface RelevantClause {
  id: string;
  score: number;
  content: string;
  metadata: {
    clauseType?: string;
    documentType?: string;
    source?: string;
  };
  advice?: ClauseAdvice;
  adviceLoading?: boolean;
}

// PDF Export Function
function exportToPDF(result: AssessmentResult, relevantClauses?: RelevantClause[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;

  // Verdex Theme Colors (matching web)
  const colors = {
    verdex: {
      50: [236, 253, 245],   // #ecfdf5
      100: [209, 250, 229],  // #d1fae5
      200: [167, 243, 208],  // #a7f3d0
      500: [16, 185, 129],   // #10b981
      600: [5, 150, 105],    // #059669
      700: [4, 120, 87],     // #047857
      800: [6, 95, 70],      // #065f46
    },
    teal: {
      100: [204, 251, 241],  // #ccfbf1
      600: [13, 148, 136],   // #0d9488
      700: [15, 118, 110],   // #0f766e
    },
    amber: {
      50: [255, 251, 235],   // #fffbeb
      600: [217, 119, 6],    // #d97706
      700: [180, 83, 9],     // #b45309
    },
    rose: {
      50: [255, 241, 242],   // #fff1f2
      600: [225, 29, 72],    // #e11d48
      700: [159, 18, 57],    // #9f1239
    },
    gray: {
      50: [249, 250, 251],   // #f9fafb
      100: [243, 244, 246],  // #f3f4f6
      500: [107, 114, 128],  // #6b7280
      600: [75, 85, 99],     // #4b5563
      700: [55, 65, 81],     // #374151
    }
  };

  // Set Montserrat-like font (Helvetica is the closest built-in)
  // For true Montserrat, embed the font via doc.addFont() with base64
  doc.setFont('helvetica');

  // Add footer to every page
  const addFooter = () => {
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(colors.gray[500][0], colors.gray[500][1], colors.gray[500][2]);
      doc.text(
        'This assessment is based on LMA Transition Loan Principles and does not constitute financial advice.',
        pageWidth / 2,
        pageHeight - 12,
        { align: 'center' }
      );
      doc.setTextColor(colors.verdex[600][0], colors.verdex[600][1], colors.verdex[600][2]);
      doc.text(
        'Generated by Verdex - Verified Green Finance',
        pageWidth / 2,
        pageHeight - 8,
        { align: 'center' }
      );
      doc.setTextColor(colors.gray[500][0], colors.gray[500][1], colors.gray[500][2]);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - 20,
        pageHeight - 8,
        { align: 'right' }
      );
    }
  };

  // Helper function to add new page if needed (leave space for footer)
  const checkNewPage = (neededSpace: number = 30) => {
    if (yPos + neededSpace > pageHeight - 25) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Title - Verdex Brand Color (#047857)
  doc.setFontSize(20);
  doc.setTextColor(4, 120, 87); // Verdex-700
  doc.text('Verdex', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('LMA Transition Loan Assessment Report', pageWidth / 2, yPos, { align: 'center' });
  yPos += 12;

  // Project Header - handle long names
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  const projectNameLines = doc.splitTextToSize(result.projectName, pageWidth - 28);
  doc.text(projectNameLines, 14, yPos);
  yPos += projectNameLines.length * 7 + 2;

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`${result.countryName} | ${result.sector.charAt(0).toUpperCase() + result.sector.slice(1)} Sector`, 14, yPos);
  yPos += 5;
  doc.text(`Assessment Date: ${new Date(result.assessmentDate).toLocaleDateString()}`, 14, yPos);
  yPos += 10;

  // Overall Score Box - using theme colors
  const statusBgColor = result.eligibilityStatus === 'eligible'
    ? colors.verdex[50]
    : result.eligibilityStatus === 'partial'
      ? colors.amber[50]
      : colors.rose[50];
  doc.setFillColor(statusBgColor[0], statusBgColor[1], statusBgColor[2]);
  doc.roundedRect(14, yPos, pageWidth - 28, 30, 3, 3, 'F');

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const statusLabel = result.eligibilityStatus === 'eligible' ? 'ELIGIBLE FOR TRANSITION LOAN' :
    result.eligibilityStatus === 'partial' ? 'PARTIALLY ELIGIBLE - GAPS IDENTIFIED' :
      'NOT YET ELIGIBLE - IMPROVEMENTS NEEDED';
  doc.text(statusLabel, 20, yPos + 12);

  doc.setFontSize(20);
  doc.text(`${result.overallScore}/100`, pageWidth - 40, yPos + 18);
  doc.setFontSize(8);
  doc.text('Overall Score', pageWidth - 40, yPos + 24);

  if ((result.greenwashingPenalty ?? 0) > 0) {
    doc.setFontSize(8);
    doc.setTextColor(200, 0, 0);
    doc.text(`(includes -${result.greenwashingPenalty} risk penalty)`, pageWidth - 40, yPos + 28);
  }
  yPos += 40;

  // Ineligibility reasons if any
  if (result.ineligibilityReasons && result.ineligibilityReasons.length > 0) {
    doc.setFontSize(9);
    doc.setTextColor(180, 0, 0);
    result.ineligibilityReasons.forEach(reason => {
      const reasonLines = doc.splitTextToSize(`• ${reason}`, pageWidth - 45);
      doc.text(reasonLines, 20, yPos);
      yPos += reasonLines.length * 5 + 2;
    });
    yPos += 3;
  }

  // LMA Components Table
  checkNewPage(60);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('LMA Transition Loan Requirements', 14, yPos);
  yPos += 8;

  const lmaData = result.lmaComponents.map(comp => [
    comp.name,
    `${comp.score}/${comp.maxScore}`,
    `${Math.round((comp.score / comp.maxScore) * 100)}%`
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [['Component', 'Score', 'Progress']],
    body: lmaData,
    theme: 'striped',
    headStyles: { fillColor: [4, 120, 87] },
    margin: { left: 14, right: 14 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 10;

  // Detailed feedback for each component
  result.lmaComponents.forEach(comp => {
    checkNewPage(50);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`${comp.name} (${comp.score}/${comp.maxScore})`, 14, yPos);
    yPos += 8;

    comp.feedback.forEach(fb => {
      checkNewPage(20);
      const icon = fb.status === 'met' ? '[OK]' : fb.status === 'partial' ? '[~]' : '[X]';
      // Use Verdex brand colors: met=verdex-600, partial=amber-700, missing=rose-700
      const color = fb.status === 'met' ? [5, 150, 105] : fb.status === 'partial' ? [180, 83, 9] : [159, 18, 57];

      doc.setFontSize(9);
      doc.setTextColor(color[0], color[1], color[2]);
      const descLines = doc.splitTextToSize(`${icon} ${fb.description}`, pageWidth - 40);
      doc.text(descLines, 18, yPos);
      yPos += descLines.length * 5;

      if (fb.action) {
        checkNewPage(15);
        doc.setFontSize(8);
        doc.setTextColor(60, 60, 60);
        const actionLines = doc.splitTextToSize(`Action: ${fb.action}`, pageWidth - 45);
        doc.text(actionLines, 22, yPos);
        yPos += actionLines.length * 4 + 3;
      } else {
        yPos += 2;
      }
    });
    yPos += 6;
  });

  // KPI Recommendations
  if (result.kpiRecommendations && result.kpiRecommendations.length > 0) {
    checkNewPage(50);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Recommended KPIs', 14, yPos);
    yPos += 3;

    if (result.frameworksReferenced && result.frameworksReferenced.length > 0) {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Based on: ${result.frameworksReferenced.join(', ')}`, 14, yPos + 5);
      yPos += 5;
    }
    yPos += 5;

    const kpiData = result.kpiRecommendations.map(kpi => [
      kpi.name,
      kpi.unit,
      kpi.suggestedTarget,
      kpi.source || '-'
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['KPI', 'Unit', 'Target', 'Source']],
      body: kpiData,
      theme: 'striped',
      headStyles: { fillColor: [colors.verdex[600][0], colors.verdex[600][1], colors.verdex[600][2]] },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 50 },
        3: { cellWidth: 35 }
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;
  }

  // SPT Recommendations
  if (result.sptRecommendations && result.sptRecommendations.length > 0) {
    checkNewPage(50);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Sustainability Performance Targets (SPTs)', 14, yPos);
    yPos += 8;

    const sptData = result.sptRecommendations.map(spt => [
      spt.name,
      spt.baseline,
      spt.target,
      spt.marginImpact,
      spt.source || '-'
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['SPT', 'Baseline', 'Target', 'Margin Impact', 'Source']],
      body: sptData,
      theme: 'striped',
      headStyles: { fillColor: [colors.teal[600][0], colors.teal[600][1], colors.teal[600][2]] },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 40 },
        4: { cellWidth: 30 }
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;
  }

  // Greenwashing Risk
  checkNewPage(50);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Greenwashing Risk Assessment', 14, yPos);
  yPos += 10;

  // Use Verdex brand colors for risk levels
  const riskColor = result.greenwashingRisk.level === 'low' ? [5, 150, 105] :
    result.greenwashingRisk.level === 'medium' ? [180, 83, 9] : [159, 18, 57];
  doc.setFontSize(11);
  doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.text(`${result.greenwashingRisk.level.toUpperCase()} RISK (Score: ${result.greenwashingRisk.score}/100)`, 14, yPos);
  yPos += 10;

  if (result.greenwashingRisk.redFlags.length > 0) {
    doc.setFontSize(10);
    doc.setTextColor(159, 18, 57); // rose-700
    doc.text('Red Flags:', 14, yPos);
    yPos += 6;

    result.greenwashingRisk.redFlags.forEach(flag => {
      checkNewPage(15);
      doc.setFontSize(9);
      doc.setTextColor(159, 18, 57); // rose-700
      const flagLines = doc.splitTextToSize(`[-] ${flag.description}`, pageWidth - 40);
      doc.text(flagLines, 18, yPos);
      yPos += flagLines.length * 5 + 2;
    });
    yPos += 4;
  }

  if (result.greenwashingRisk.positiveIndicators.length > 0) {
    checkNewPage(20);
    doc.setFontSize(10);
    doc.setTextColor(4, 120, 87); // verdex-700
    doc.text('Positive Indicators:', 14, yPos);
    yPos += 6;

    result.greenwashingRisk.positiveIndicators.forEach(indicator => {
      checkNewPage(10);
      doc.setFontSize(9);
      doc.setTextColor(5, 150, 105); // verdex-600
      const indicatorLines = doc.splitTextToSize(`[+] ${indicator}`, pageWidth - 40);
      doc.text(indicatorLines, 18, yPos);
      yPos += indicatorLines.length * 5 + 2;
    });
    yPos += 4;
  }

  // DFI Matches
  if (result.dfiMatches.length > 0) {
    checkNewPage(50);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('DFI Matches', 14, yPos);
    yPos += 8;

    const dfiData = result.dfiMatches.map(dfi => {
      let sizeDisplay = '-';
      if (dfi.estimatedSize) {
        const minM = dfi.estimatedSize.min / 1_000_000;
        const maxM = dfi.estimatedSize.max / 1_000_000;
        if (maxM > 0 && maxM >= minM) {
          sizeDisplay = `$${minM.toFixed(0)}M - $${maxM.toFixed(0)}M`;
        } else if (minM > 0) {
          // max is 0 or invalid - just show minimum (typical DFI ticket size)
          sizeDisplay = `Min $${minM.toFixed(0)}M`;
        }
      }
      return [
        dfi.name,
        dfi.fullName,
        `${dfi.matchScore}%`,
        dfi.recommendedRole.replace('_', ' '),
        sizeDisplay
      ];
    });

    autoTable(doc, {
      startY: yPos,
      head: [['DFI', 'Full Name', 'Match', 'Role', 'Est. Size']],
      body: dfiData,
      theme: 'striped',
      headStyles: { fillColor: [4, 120, 87] },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 50 },
        2: { cellWidth: 20 },
        3: { cellWidth: 30 },
        4: { cellWidth: 35 }
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;
  }

  // Next Steps
  checkNewPage(50);
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Recommended Next Steps', 14, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setTextColor(4, 120, 87); // verdex-700
  result.nextSteps.forEach((step, i) => {
    checkNewPage(15);
    const stepLines = doc.splitTextToSize(`${i + 1}. ${step}`, pageWidth - 40);
    doc.text(stepLines, 18, yPos);
    yPos += stepLines.length * 5 + 3;
  });

  // Relevant Clauses Section
  if (relevantClauses && relevantClauses.length > 0) {
    // Add extra spacing and divider before clauses section
    yPos += 10;
    checkNewPage(70);

    // Draw a subtle divider line
    doc.setDrawColor(colors.gray[100][0], colors.gray[100][1], colors.gray[100][2]);
    doc.setLineWidth(0.5);
    doc.line(14, yPos, pageWidth - 14, yPos);
    yPos += 15;

    doc.setFontSize(14);
    doc.setTextColor(colors.verdex[700][0], colors.verdex[700][1], colors.verdex[700][2]);
    doc.text('Relevant LMA Clauses', 14, yPos);
    yPos += 10;

    relevantClauses.forEach((clause, idx) => {
      checkNewPage(60);

      // Clause header with number and type
      doc.setFontSize(11);
      doc.setTextColor(4, 120, 87);
      const clauseType = clause.metadata.clauseType?.replace(/_/g, ' ') || 'General';
      doc.text(`${idx + 1}. ${clauseType.charAt(0).toUpperCase() + clauseType.slice(1)}`, 14, yPos);

      // Match score
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Match: ${(clause.score * 100).toFixed(0)}%`, pageWidth - 35, yPos);
      yPos += 6;

      // Relevance score if available
      if (clause.advice) {
        doc.setFontSize(9);
        doc.setTextColor(5, 150, 105);
        doc.text(`Project Relevance: ${clause.advice.relevanceScore}/10`, 14, yPos);
        yPos += 5;

        // AI Summary
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        const summaryLines = doc.splitTextToSize(clause.advice.relevanceSummary, pageWidth - 28);
        doc.text(summaryLines, 14, yPos);
        yPos += summaryLines.length * 4 + 3;

        // How to Apply
        checkNewPage(25);
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        doc.text('How to Apply:', 14, yPos);
        yPos += 4;
        doc.setTextColor(60, 60, 60);
        const applyLines = doc.splitTextToSize(clause.advice.howToApply, pageWidth - 32);
        doc.text(applyLines, 18, yPos);
        yPos += applyLines.length * 3.5 + 3;

        // Key Considerations
        if (clause.advice.keyConsiderations && clause.advice.keyConsiderations.length > 0) {
          checkNewPage(20);
          doc.setFontSize(8);
          doc.setTextColor(0, 0, 0);
          doc.text('Key Considerations:', 14, yPos);
          yPos += 4;
          doc.setTextColor(60, 60, 60);
          clause.advice.keyConsiderations.slice(0, 3).forEach(consideration => {
            checkNewPage(10);
            const consLines = doc.splitTextToSize(`• ${consideration}`, pageWidth - 36);
            doc.text(consLines, 18, yPos);
            yPos += consLines.length * 3.5 + 1;
          });
          yPos += 2;
        }
      }

      // Source document and clause ID
      doc.setFontSize(8);
      doc.setTextColor(colors.gray[500][0], colors.gray[500][1], colors.gray[500][2]);
      if (clause.metadata.source) {
        doc.text(`Source: ${clause.metadata.source}`, 14, yPos);
        yPos += 4;
      }
      doc.text(`Clause ID: ${clause.id}`, 14, yPos);
      yPos += 5;

      // Clause content preview
      checkNewPage(20);
      doc.setFillColor(colors.verdex[50][0], colors.verdex[50][1], colors.verdex[50][2]);
      const contentPreview = clause.content.substring(0, 300) + (clause.content.length > 300 ? '...' : '');
      const contentLines = doc.splitTextToSize(contentPreview, pageWidth - 36);
      const boxHeight = Math.min(contentLines.length * 3.5 + 6, 40);
      doc.roundedRect(14, yPos, pageWidth - 28, boxHeight, 2, 2, 'F');
      doc.setFontSize(7);
      doc.setTextColor(colors.gray[600][0], colors.gray[600][1], colors.gray[600][2]);
      doc.text(contentLines.slice(0, 8), 18, yPos + 4);
      yPos += boxHeight + 8;
    });
  }

  // Add footer to all pages
  addFooter();

  // Save the PDF
  const fileName = `${result.projectName.replace(/[^a-z0-9]/gi, '_')}_Assessment_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [relevantClauses, setRelevantClauses] = useState<RelevantClause[]>([]);
  const [clausesLoading, setClausesLoading] = useState(false);
  const [clauseSearchQuery, setClauseSearchQuery] = useState('');
  const [selectedClauseModal, setSelectedClauseModal] = useState<RelevantClause | null>(null);
  const [originalClauseExpanded, setOriginalClauseExpanded] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [draftMetadata, setDraftMetadata] = useState<{
    generatedAt: string;
    targetDFI: string;
    projectName: string;
    sector: string;
    country: string;
  } | null>(null);

  // Check if any clause advice is still loading
  const isExportReady = !clausesLoading && relevantClauses.every(c => !c.adviceLoading);
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('assessmentResult');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      router.push('/assess');
    }
  }, [router]);

  // Fetch relevant clauses based on project characteristics
  useEffect(() => {
    if (result) {
      const fetchClauses = async () => {
        setClausesLoading(true);
        try {
          // Build contextual search query based on project KPIs and SPTs
          const kpiTerms = result.kpiRecommendations?.slice(0, 2).map(kpi => kpi.name).join(' ') || '';
          const sptTerms = result.sptRecommendations?.slice(0, 1).map(spt => spt.target).join(' ') || '';

          // Create a more specific search query focused on sustainability-linked features
          const searchTerms = [
            'sustainability linked',
            result.sector,
            kpiTerms,
            result.eligibilityStatus === 'eligible' ? 'margin adjustment KPI SPT' : 'eligibility criteria',
          ].filter(Boolean).join(' ');

          setClauseSearchQuery(searchTerms);

          // Fetch clauses with relevant clause type filters - all sustainability-linked clause types
          const relevantClauseTypes = [
            'margin_ratchet',      // Margin adjustment based on SPT achievement
            'kpi_definition',      // Key Performance Indicator definitions
            'spt_definition',      // Sustainability Performance Target definitions
            'verification',        // External verification requirements
            'use_of_proceeds',     // How loan proceeds must be used
            'reporting_covenant',  // Sustainability reporting requirements
            'conditions_precedent', // Conditions before drawdown
            'representations',     // Borrower representations & warranties
            'interest',            // Interest rate provisions
            'facility_terms',      // General facility terms
          ];

          // Make multiple targeted searches for different clause types
          const searchPromises = relevantClauseTypes.map(clauseType =>
            fetch('/api/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                query: `${result.sector} ${clauseType.replace(/_/g, ' ')} sustainability transition`,
                limit: 2,
                filters: { clauseType },
              }),
            }).then(res => res.json())
          );

          const results = await Promise.all(searchPromises);
          const allClauses = results.flatMap(r => r.results || []);

          // Deduplicate and take top 6
          const uniqueClauses = allClauses.reduce((acc: RelevantClause[], clause) => {
            if (!acc.find(c => c.id === clause.id)) {
              acc.push({ ...clause, adviceLoading: true });
            }
            return acc;
          }, [])
            .sort((a, b) => b.score - a.score)
            .slice(0, 6)

          setRelevantClauses(uniqueClauses);

          // Fetch AI advice for each clause in parallel
          const projectContext = {
            projectName: result.projectName,
            sector: result.sector,
            country: result.countryName,
            eligibilityStatus: result.eligibilityStatus,
            kpis: result.kpiRecommendations?.slice(0, 3).map(k => ({ name: k.name, description: k.description })),
            spts: result.sptRecommendations?.slice(0, 2).map(s => ({ name: s.name, target: s.target })),
          };

          // Fetch advice for each clause
          uniqueClauses.forEach(async (clause, index) => {
            try {
              const adviceResponse = await fetch('/api/clause-advice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  clause: {
                    content: clause.content,
                    clauseType: clause.metadata.clauseType,
                    source: clause.metadata.source,
                  },
                  projectContext,
                }),
              });

              const adviceData = await adviceResponse.json();

              if (adviceData.success && adviceData.advice) {
                setRelevantClauses(prev => prev.map((c, i) =>
                  i === index ? { ...c, advice: adviceData.advice, adviceLoading: false } : c
                ));
              } else {
                setRelevantClauses(prev => prev.map((c, i) =>
                  i === index ? { ...c, adviceLoading: false } : c
                ));
              }
            } catch (error) {
              console.error('Failed to fetch advice for clause:', error);
              setRelevantClauses(prev => prev.map((c, i) =>
                i === index ? { ...c, adviceLoading: false } : c
              ));
            }
          });
        } catch (error) {
          console.error('Failed to fetch relevant clauses:', error);
        } finally {
          setClausesLoading(false);
        }
      };

      fetchClauses();
    }
  }, [result]);

  // GSAP animations with ScrollTrigger
  useEffect(() => {
    if (result && pageRef.current) {
      // Header animation - immediate on load
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(statusRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4 },
          '-=0.2'
        );

      // Result cards with scroll-triggered stagger animation
      gsap.utils.toArray('.result-card').forEach((card, index) => {
        gsap.fromTo(card as Element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            delay: index * 0.1 // Stagger effect
          }
        );
      });

      // Cleanup ScrollTrigger on unmount
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [result]);

  // Generate AI Draft function
  const generateDraft = async () => {
    if (!result || draftLoading) return;

    setDraftLoading(true);
    try {
      const response = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...result,
          relevantClauses: relevantClauses.map(c => ({
            id: c.id,
            content: c.content,
            metadata: c.metadata,
            advice: c.advice,
          })),
        }),
      });

      const data = await response.json();

      if (data.success && data.draft) {
        setGeneratedDraft(data.draft);
        setDraftMetadata(data.metadata);
        setDraftModalOpen(true);
      } else {
        console.error('Draft generation failed:', data.error);
        alert('Failed to generate draft. Please try again.');
      }
    } catch (error) {
      console.error('Draft generation error:', error);
      alert('Failed to generate draft. Please try again.');
    } finally {
      setDraftLoading(false);
    }
  };

  // Export draft to PDF
  const exportDraftToPDF = () => {
    if (!generatedDraft || !draftMetadata) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const maxLineWidth = pageWidth - margin * 2;
    let yPos = 20;

    // Verdex colors
    const verdexGreen = [4, 120, 87];
    const darkGray = [55, 65, 81];
    const lightGray = [107, 114, 128];

    // Helper to add page if needed
    const checkNewPage = (neededSpace: number = 15) => {
      if (yPos + neededSpace > pageHeight - 20) {
        doc.addPage();
        yPos = 20;
      }
    };

    // Title
    doc.setFontSize(18);
    doc.setTextColor(verdexGreen[0], verdexGreen[1], verdexGreen[2]);
    doc.text('Verdex', pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;

    doc.setFontSize(11);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text('AI-Generated Project Draft', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    // Project info
    doc.setFontSize(14);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    const projectLines = doc.splitTextToSize(draftMetadata.projectName, maxLineWidth);
    doc.text(projectLines, margin, yPos);
    yPos += projectLines.length * 6 + 4;

    doc.setFontSize(9);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text(`${draftMetadata.country} | ${draftMetadata.sector} | Target DFI: ${draftMetadata.targetDFI}`, margin, yPos);
    yPos += 4;
    doc.text(`Generated: ${new Date(draftMetadata.generatedAt).toLocaleString()}`, margin, yPos);
    yPos += 10;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    // Parse and render markdown content with table support
    const lines = generatedDraft.split('\n');
    let i = 0;

    // Helper to parse a markdown table
    const parseMarkdownTable = (startIdx: number): { headers: string[], rows: string[][], endIdx: number } => {
      const headers: string[] = [];
      const rows: string[][] = [];
      let idx = startIdx;

      // Parse header row
      const headerLine = lines[idx]?.trim();
      if (headerLine?.startsWith('|')) {
        const headerCells = headerLine.split('|').filter(c => c.trim()).map(c => c.trim().replace(/\*\*/g, ''));
        headers.push(...headerCells);
        idx++;
      }

      // Skip separator row (|---|---|)
      const sepLine = lines[idx]?.trim();
      if (sepLine?.match(/^\|[\s\-:|]+\|$/)) {
        idx++;
      }

      // Parse data rows
      while (idx < lines.length) {
        const rowLine = lines[idx]?.trim();
        if (!rowLine?.startsWith('|')) break;
        if (rowLine.match(/^\|[\s\-:|]+\|$/)) { idx++; continue; } // Skip any additional separator rows
        const cells = rowLine.split('|').filter(c => c.trim()).map(c => c.trim().replace(/\*\*/g, ''));
        if (cells.length > 0) rows.push(cells);
        idx++;
      }

      return { headers, rows, endIdx: idx };
    };

    while (i < lines.length) {
      const trimmedLine = lines[i].trim();

      // Skip empty lines but add small spacing
      if (!trimmedLine) {
        yPos += 3;
        i++;
        continue;
      }

      // Check if this is a table (starts with |)
      if (trimmedLine.startsWith('|') && !trimmedLine.match(/^\|[\s\-:|]+\|$/)) {
        const { headers, rows, endIdx } = parseMarkdownTable(i);

        if (headers.length > 0 && rows.length > 0) {
          checkNewPage(40);

          // Use autoTable for proper table rendering
          autoTable(doc, {
            startY: yPos,
            head: [headers],
            body: rows,
            margin: { left: margin, right: margin },
            styles: {
              fontSize: 8,
              cellPadding: 2,
              textColor: [55, 65, 81],
            },
            headStyles: {
              fillColor: [4, 120, 87],
              textColor: [255, 255, 255],
              fontStyle: 'bold',
              fontSize: 8,
            },
            alternateRowStyles: {
              fillColor: [249, 250, 251],
            },
            tableLineColor: [200, 200, 200],
            tableLineWidth: 0.1,
          });

          // Update yPos after table
          yPos = (doc as any).lastAutoTable.finalY + 8;
        }

        i = endIdx;
        continue;
      }

      checkNewPage(20);

      // Handle headers
      if (trimmedLine.startsWith('### ')) {
        yPos += 4;
        doc.setFontSize(11);
        doc.setTextColor(verdexGreen[0], verdexGreen[1], verdexGreen[2]);
        const headerText = trimmedLine.replace('### ', '').replace(/\*\*/g, '');
        const headerLines = doc.splitTextToSize(headerText, maxLineWidth);
        doc.text(headerLines, margin, yPos);
        yPos += headerLines.length * 5 + 3;
      } else if (trimmedLine.startsWith('## ')) {
        yPos += 6;
        doc.setFontSize(13);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        const headerText = trimmedLine.replace('## ', '').replace(/\*\*/g, '');
        const headerLines = doc.splitTextToSize(headerText, maxLineWidth);
        doc.text(headerLines, margin, yPos);
        yPos += headerLines.length * 6 + 4;
      } else if (trimmedLine.startsWith('# ')) {
        yPos += 8;
        doc.setFontSize(15);
        doc.setTextColor(verdexGreen[0], verdexGreen[1], verdexGreen[2]);
        const headerText = trimmedLine.replace('# ', '').replace(/\*\*/g, '');
        const headerLines = doc.splitTextToSize(headerText, maxLineWidth);
        doc.text(headerLines, margin, yPos);
        yPos += headerLines.length * 7 + 5;
      } else if (trimmedLine.startsWith('---')) {
        yPos += 4;
        doc.setDrawColor(220, 220, 220);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 6;
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        doc.setFontSize(9);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        const bulletText = trimmedLine.substring(2).replace(/\*\*/g, '');
        const bulletLines = doc.splitTextToSize(`• ${bulletText}`, maxLineWidth - 8);
        doc.text(bulletLines, margin + 4, yPos);
        yPos += bulletLines.length * 4 + 2;
      } else if (/^\d+\.\s/.test(trimmedLine)) {
        doc.setFontSize(9);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        const numText = trimmedLine.replace(/\*\*/g, '');
        const numLines = doc.splitTextToSize(numText, maxLineWidth - 4);
        doc.text(numLines, margin + 2, yPos);
        yPos += numLines.length * 4 + 2;
      } else {
        doc.setFontSize(9);
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        const cleanText = trimmedLine.replace(/\*\*/g, '');
        const textLines = doc.splitTextToSize(cleanText, maxLineWidth);
        doc.text(textLines, margin, yPos);
        yPos += textLines.length * 4 + 1;
      }

      i++;
    }

    // Footer on all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text(
        'AI-generated draft based on LMA Transition Loan Principles. Review with legal counsel before use.',
        pageWidth / 2,
        pageHeight - 12,
        { align: 'center' }
      );
      doc.setTextColor(verdexGreen[0], verdexGreen[1], verdexGreen[2]);
      doc.text(
        'Generated by Verdex - Verified Green Finance',
        pageWidth / 2,
        pageHeight - 8,
        { align: 'center' }
      );
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 8, { align: 'right' });
    }

    const fileName = `${draftMetadata.projectName.replace(/[^a-z0-9]/gi, '_')}_Draft_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const statusColors = {
    eligible: 'bg-verdex-50 text-verdex-800 border-verdex-200',
    partial: 'bg-amber-50 text-amber-800 border-amber-200',
    ineligible: 'bg-rose-50 text-rose-800 border-rose-200',
  };

  const statusLabels = {
    eligible: 'Eligible for Transition Loan',
    partial: 'Partially Eligible - Gaps Identified',
    ineligible: 'Not Yet Eligible - Improvements Needed',
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-32 pb-16 relative overflow-hidden">
      {/* Animated Blobs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob blob-green w-[600px] h-[600px] -top-40 -left-40 opacity-15 animate-blob" />
        <div className="blob blob-teal w-[400px] h-[400px] top-1/3 -right-32 opacity-10 animate-blob-reverse" />
        <div className="blob blob-emerald w-[350px] h-[350px] bottom-0 left-1/3 opacity-10 animate-blob-slow" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header - Project title only */}
        <div ref={headerRef} className="mb-10 mt-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-gray-900 mb-3 break-words">
            {result.projectName}
          </h1>
          <p className="text-lg text-gray-600">
            {result.countryName} | {result.sector.charAt(0).toUpperCase() + result.sector.slice(1)} Sector
          </p>
        </div>

        {/* Overall Status */}
        <div ref={statusRef} className={`glass-card rounded-3xl p-8 mb-10 border-2 ${statusColors[result.eligibilityStatus]}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <p className="text-sm font-medium opacity-80 mb-1">Eligibility Status</p>
              <p className="text-2xl font-bold mb-2">{statusLabels[result.eligibilityStatus]}</p>
              {result.ineligibilityReasons && result.ineligibilityReasons.length > 0 && (
                <ul className="text-sm opacity-90 space-y-1">
                  {result.ineligibilityReasons.map((reason, i) => (
                    <li key={i}>• {reason}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-sm font-medium opacity-80 mb-1">Overall Score</p>
                <p className="text-5xl font-bold">{result.overallScore}<span className="text-2xl opacity-60">/100</span></p>
                {(result.greenwashingPenalty ?? 0) > 0 && (
                  <div className="text-xs mt-1 opacity-90">
                    <span>Base: {result.lmaBaseScore}</span>
                    <span className="text-rose-700 ml-2">-{result.greenwashingPenalty} penalty</span>
                  </div>
                )}
              </div>
              <div className="hidden sm:flex flex-col gap-3">
                <button
                  onClick={generateDraft}
                  disabled={draftLoading || !isExportReady}
                  className={`font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${draftLoading || !isExportReady
                    ? 'bg-gradient-to-r from-verdex-300 to-teal-300 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-verdex-600 to-teal-600 hover:from-verdex-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    }`}
                >
                  {!isExportReady || draftLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {!isExportReady ? 'Analyzing' : 'Generating...'}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Generate AI Draft
                    </>
                  )}
                </button>
                <button
                  onClick={() => exportToPDF(result, relevantClauses)}
                  disabled={!isExportReady}
                  className={`font-semibold px-6 py-3 rounded-xl shadow-verdex-sm transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${isExportReady
                    ? 'border-2 border-verdex-600 bg-white text-verdex-600 hover:shadow-verdex hover:scale-105'
                    : 'bg-verdex-300 text-white cursor-not-allowed'
                    }`}
                >
                  {isExportReady ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isExportReady ? 'Export Result' : 'Analyzing'}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile action buttons */}
          <div className="flex sm:hidden gap-3 mt-6 pt-6 border-t border-current/10">
            <button
              onClick={() => exportToPDF(result, relevantClauses)}
              disabled={!isExportReady}
              className={`flex-1 font-semibold px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${isExportReady
                ? 'bg-verdex-700 hover:bg-verdex-800 text-white'
                : 'bg-verdex-300 text-white cursor-not-allowed'
                }`}
            >
              {isExportReady ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isExportReady ? 'Assesment Result' : 'Analyzing'}
            </button>
            <button
              onClick={generateDraft}
              disabled={draftLoading || !isExportReady}
              className={`flex-1 font-semibold px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${draftLoading || !isExportReady
                ? 'bg-gradient-to-r from-verdex-300 to-teal-300 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-verdex-600 to-teal-600 text-white'
                }`}
            >
              {draftLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI Draft
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - LMA Components */}
          <div className="lg:col-span-2 space-y-8">
            {/* LMA Component Scores */}
            <div className="glass-card rounded-3xl p-6 result-card">
              <h2 className="text-xl font-display font-medium mb-4">LMA Transition Loan Requirements</h2>
              <div className="space-y-4">
                {result.lmaComponents.map((component, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{component.name}</span>
                      <span className={`font-semibold ${component.score / component.maxScore >= 0.7 ? 'text-verdex-600' : component.score / component.maxScore >= 0.5 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {component.score}/{component.maxScore}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full ${component.score / component.maxScore >= 0.7 ? 'bg-verdex-600' : component.score / component.maxScore >= 0.5 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${(component.score / component.maxScore) * 100}%` }}
                      />
                    </div>
                    <div className="space-y-2">
                      {component.feedback.map((fb, i) => (
                        <div key={i} className={`text-sm rounded-lg p-3 ${fb.status === 'met' ? 'bg-verdex-50 border border-verdex-200' :
                          fb.status === 'partial' ? 'bg-amber-50 border border-amber-200' :
                            'bg-rose-50 border border-rose-200'
                          }`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${fb.status === 'met' ? 'bg-verdex-600' :
                              fb.status === 'partial' ? 'bg-amber-500' :
                                'bg-rose-500'
                              }`}>
                              {fb.status === 'met' && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {fb.status === 'partial' && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                                </svg>
                              )}
                              {fb.status === 'missing' && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium ${fb.status === 'met' ? 'text-verdex-800' :
                                fb.status === 'partial' ? 'text-amber-800' :
                                  'text-rose-800'
                                }`}>
                                {fb.description}
                              </p>
                              {fb.action && (
                                <p className="text-gray-700 mt-1 text-xs">
                                  <span className="font-semibold">Action: </span>{fb.action}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI & SPT Recommendations */}
            {(result.kpiRecommendations && result.kpiRecommendations.length > 0) && (
              <div className="glass-card rounded-3xl p-6 result-card">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-display font-medium">Recommended KPIs & SPTs</h2>
                  {result.kpiAiGenerated && (
                    <span className="bg-gradient-to-r from-verdex-600 to-teal-500 text-white text-xs px-2 py-1 rounded-full">
                      AI Generated
                    </span>
                  )}
                </div>

                {/* Frameworks Referenced */}
                {result.frameworksReferenced && result.frameworksReferenced.length > 0 && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Based on official frameworks:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.frameworksReferenced.map((fw, i) => (
                        <span key={i} className="bg-white border border-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* KPIs */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <span className="bg-verdex-600 text-white px-2 py-0.5 rounded text-xs font-semibold">KPIs</span>
                    Key Performance Indicators to Track
                  </h3>
                  <div className="space-y-3">
                    {result.kpiRecommendations.map((kpi, i) => (
                      <div key={i} className="bg-verdex-100 border border-verdex-300 rounded-xl p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 bg-verdex-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-verdex-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-verdex-900">{kpi.name}</p>
                            <p className="text-xs text-verdex-700 mt-0.5">{kpi.description}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 bg-white/70 rounded-lg p-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Unit</p>
                            <p className="text-sm font-medium text-gray-800">{kpi.unit}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Target</p>
                            <p className="text-sm font-semibold text-verdex-700">{kpi.suggestedTarget}</p>
                          </div>
                        </div>
                        {(kpi.source || kpi.rationale) && (
                          <div className="mt-3 pt-3 border-t border-verdex-300 text-xs">
                            {kpi.source && (
                              <span className="inline-block bg-verdex-600 text-white px-2 py-0.5 rounded mr-2">
                                {kpi.source}
                              </span>
                            )}
                            {kpi.rationale && (
                              <span className="text-gray-700">{kpi.rationale}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SPTs */}
                {result.sptRecommendations && result.sptRecommendations.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <span className="bg-teal-600 text-white px-2 py-0.5 rounded text-xs font-semibold">SPTs</span>
                      Sustainability Performance Targets (Margin-Linked)
                    </h3>
                    <div className="space-y-3">
                      {result.sptRecommendations.map((spt, i) => (
                        <div key={i} className="bg-teal-100 border border-teal-300 rounded-xl p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-teal-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-teal-900">{spt.name}</p>
                            </div>
                            <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs font-mono flex-shrink-0">
                              {spt.marginImpact}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 bg-white/70 rounded-lg p-3 mb-3">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Baseline</p>
                              <p className="text-sm font-medium text-gray-800">{spt.baseline}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Target</p>
                              <p className="text-sm font-semibold text-teal-700">{spt.target}</p>
                            </div>
                          </div>
                          {(spt.verificationMethod || spt.source) && (
                            <div className="text-xs">
                              {spt.verificationMethod && (
                                <p className="text-gray-700 mb-2">
                                  <span className="font-medium">Verification:</span> {spt.verificationMethod}
                                </p>
                              )}
                              {spt.source && (
                                <span className="inline-block bg-teal-600 text-white px-2 py-0.5 rounded">
                                  {spt.source}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      SPTs are linked to loan margin adjustments. Meeting targets reduces interest rate; missing them increases it.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Greenwashing Risk */}
            <div className="glass-card rounded-3xl p-6 result-card">
              <h2 className="text-xl font-display font-medium mb-4">Greenwashing Risk Assessment</h2>
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.greenwashingRisk.level === 'low' ? 'risk-low' :
                  result.greenwashingRisk.level === 'medium' ? 'risk-medium' : 'risk-high'
                  }`}>
                  {result.greenwashingRisk.level.toUpperCase()} RISK
                </span>
                <span className="text-gray-600">Risk Score: {result.greenwashingRisk.score}/100</span>
                {(result.greenwashingPenalty ?? 0) > 0 && (
                  <span className="text-rose-600 text-sm font-medium">
                    (-{result.greenwashingPenalty} pts penalty applied)
                  </span>
                )}
              </div>

              {result.greenwashingRisk.redFlags.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-rose-700 mb-2">Red Flags</h3>
                  <ul className="space-y-2">
                    {result.greenwashingRisk.redFlags.map((flag, i) => (
                      <li key={i} className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                        <p className="text-rose-800 font-medium">{flag.description}</p>
                        <p className="text-rose-600 text-sm mt-1">{flag.recommendation}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.greenwashingRisk.positiveIndicators.length > 0 && (
                <div>
                  <h3 className="font-medium text-verdex-700 mb-2">Positive Indicators</h3>
                  <ul className="space-y-1">
                    {result.greenwashingRisk.positiveIndicators.map((indicator, i) => (
                      <li key={i} className="text-verdex-700 text-sm">✓ {indicator}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* DFI Matches */}
            <div className="glass-card rounded-3xl p-6 result-card">
              <h2 className="text-xl font-display font-medium mb-4">DFI Matches</h2>
              <div className="space-y-4">
                {result.dfiMatches.map((dfi, idx) => (
                  <div key={idx} className="bg-white/60 border border-gray-200 rounded-2xl p-5 hover:bg-white/80 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{dfi.name}</h3>
                        <p className="text-sm text-gray-500">{dfi.fullName}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-verdex-600">{dfi.matchScore}%</span>
                        <p className="text-xs text-gray-500">match</p>
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="text-xs bg-navy-100 text-navy-800 px-2 py-1 rounded">
                        Recommended: {dfi.recommendedRole.replace('_', ' ')}
                      </span>
                      {dfi.estimatedSize && (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded ml-2">
                          {dfi.estimatedSize.max > 0 && dfi.estimatedSize.max >= dfi.estimatedSize.min
                            ? `$${(dfi.estimatedSize.min / 1_000_000).toFixed(0)}M - $${(dfi.estimatedSize.max / 1_000_000).toFixed(0)}M`
                            : dfi.estimatedSize.min > 0
                              ? `Min $${(dfi.estimatedSize.min / 1_000_000).toFixed(0)}M`
                              : '-'}
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-600">
                      <p className="mb-1"><strong>Why:</strong> {dfi.matchReasons.join(', ')}</p>
                      {dfi.climateTarget && (
                        <p className="text-verdex-600">Climate: {dfi.climateTarget}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-8">
            {/* Next Steps */}
            <div className="glass-card rounded-3xl p-6 result-card bg-verdex-50/80 border border-verdex-200">
              <h2 className="text-lg font-display font-medium text-verdex-900 mb-3">Next Steps</h2>
              <ol className="space-y-2">
                {result.nextSteps.map((step, i) => (
                  <li key={i} className="text-verdex-800 text-sm flex gap-2">
                    <span className="font-bold">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Relevant Clauses */}
            <div className="glass-card rounded-3xl p-6 result-card">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-display font-medium">Relevant Clauses</h2>
                <Link
                  href={`/search?q=${encodeURIComponent(clauseSearchQuery)}`}
                  className="text-xs text-verdex-600 hover:text-verdex-700 font-medium"
                  target='_blank'
                >
                  View All →
                </Link>
              </div>

              {clausesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin w-5 h-5 border-2 border-verdex-600 border-t-transparent rounded-full" />
                </div>
              ) : relevantClauses.length > 0 ? (
                <div className="space-y-3">
                  {relevantClauses.slice(0, 6).map((clause, idx) => (
                    <div
                      key={clause.id}
                      className="bg-white/60 border border-gray-200 rounded-xl p-3 hover:bg-white/80 transition-all cursor-pointer"
                      onClick={() => { setSelectedClauseModal(clause); setOriginalClauseExpanded(false); }}
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs text-gray-400 flex-shrink-0">#{idx + 1}</span>
                          {clause.metadata.clauseType && (
                            <span className="text-xs bg-verdex-100 text-verdex-800 px-2 py-0.5 rounded-full truncate">
                              {clause.metadata.clauseType.replace(/_/g, ' ')}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-verdex-600 font-medium flex-shrink-0">
                          {(clause.score * 100).toFixed(0)}% match
                        </span>
                      </div>

                      {/* Relevance score row */}
                      {clause.advice && (
                        <div className="mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${clause.advice.relevanceScore >= 7 ? 'bg-emerald-100 text-emerald-800' :
                            clause.advice.relevanceScore >= 4 ? 'bg-amber-100 text-amber-800' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            {clause.advice.relevanceScore}/10 project relevance
                          </span>
                        </div>
                      )}

                      {/* AI Summary */}
                      {clause.adviceLoading ? (
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="animate-spin w-3 h-3 border border-verdex-400 border-t-transparent rounded-full" />
                          Analyzing relevance...
                        </div>
                      ) : clause.advice ? (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {clause.advice.relevanceSummary}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {clause.content.substring(0, 120)}...
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No relevant clauses found
                </p>
              )}

              <Link
                href={`/search?q=${encodeURIComponent(clauseSearchQuery)}`}
                className="mt-4 block w-full text-center bg-verdex-50 hover:bg-verdex-100 text-verdex-700 font-medium text-sm py-2.5 rounded-xl transition-colors border border-verdex-200"
                target='_blank'
              >
                Search All LMA Clauses
              </Link>
            </div>

            {/* Country Info */}
            {result.countryInfo && (
              <div className="glass-card rounded-3xl p-6 result-card">
                <h2 className="text-lg font-display font-medium mb-3">Country Context</h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Region</dt>
                    <dd className="font-medium">{result.countryInfo.region.replace('_', ' ')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Legal System</dt>
                    <dd className="font-medium">{result.countryInfo.legalSystem.replace('_', ' ')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Currency</dt>
                    <dd className="font-medium">{result.countryInfo.currency}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Sovereign Rating</dt>
                    <dd className="font-medium">{result.countryInfo.sovereignRating || 'N/A'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Political Risk</dt>
                    <dd className={`font-medium ${result.countryInfo.politicalRisk === 'low' ? 'text-verdex-600' :
                      result.countryInfo.politicalRisk === 'medium' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                      {result.countryInfo.politicalRisk}
                    </dd>
                  </div>
                  {result.countryInfo.ndcTarget && (
                    <div className="pt-2 border-t">
                      <dt className="text-gray-500 mb-1">NDC Target</dt>
                      <dd className="text-xs">{result.countryInfo.ndcTarget}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Assessment Info */}
            <div className="glass-card rounded-3xl p-6 result-card bg-gray-50/60">
              <h2 className="text-lg font-display font-medium mb-3">Assessment Info</h2>
              <p className="text-sm text-gray-600">
                Generated: {new Date(result.assessmentDate).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                This assessment is based on LMA Transition Loan Principles and does not constitute financial advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clause Modal */}
      {selectedClauseModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedClauseModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-verdex-100 bg-verdex-50/30">
              <div className="flex items-center gap-4">
                <h3 className="font-medium text-verdex-900">Clause Analysis</h3>
                <div className="flex items-center gap-2">
                  {selectedClauseModal.metadata.clauseType && (
                    <span className="text-xs text-verdex-600 font-medium">
                      {selectedClauseModal.metadata.clauseType.replace(/_/g, ' ')}
                    </span>
                  )}
                  {selectedClauseModal.metadata.documentType && (
                    <>
                      <span className="text-verdex-300">·</span>
                      <span className="text-xs text-verdex-600 font-medium">
                        {selectedClauseModal.metadata.documentType.replace(/_/g, ' ')}
                      </span>
                    </>
                  )}
                  {selectedClauseModal.advice && (
                    <>
                      <span className="text-verdex-300">·</span>
                      <span className={`text-xs font-medium ${selectedClauseModal.advice.relevanceScore >= 7 ? 'text-emerald-600' :
                        selectedClauseModal.advice.relevanceScore >= 4 ? 'text-amber-600' :
                          'text-gray-500'
                        }`}>
                        {selectedClauseModal.advice.relevanceScore}/10 relevance
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedClauseModal(null)}
                className="text-verdex-600 hover:text-verdex-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 overflow-auto max-h-[60vh] space-y-5">
              {/* Loading State */}
              {selectedClauseModal.adviceLoading && (
                <div className="flex items-center gap-3 text-verdex-600">
                  <div className="w-4 h-4 border-2 border-verdex-200 border-t-verdex-600 rounded-full animate-spin" />
                  <span className="text-sm">Analyzing...</span>
                </div>
              )}

              {selectedClauseModal.advice && (
                <div className="space-y-6">
                  {/* Contextualized Example Clause - Minimal style */}
                  {selectedClauseModal.advice.contextualizedExample && (
                    <div className="group pb-6 border-b border-verdex-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-verdex-600 uppercase tracking-wider">Adapted for your project</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(selectedClauseModal.advice?.contextualizedExample || '')}
                          className="opacity-0 group-hover:opacity-100 text-verdex-600 hover:text-verdex-600 transition-all text-xs flex items-center gap-1"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </button>
                      </div>
                      <div className="relative pl-4 border-l-2 border-verdex-400">
                        <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {selectedClauseModal.advice.contextualizedExample}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* AI Analysis Summary */}
                  <div className="pb-6 border-b border-verdex-100">
                    <p className="text-sm text-verdex-700 leading-relaxed">{selectedClauseModal.advice.relevanceSummary}</p>
                  </div>

                  {/* Two Column Grid: How to Apply & When to Use */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-verdex-100">
                    <div>
                      <h4 className="text-xs font-medium text-verdex-600 uppercase tracking-wider mb-3">How to Apply</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedClauseModal.advice.howToApply}</p>
                    </div>
                    <div className="md:border-l md:border-verdex-100 md:pl-8">
                      <h4 className="text-xs font-medium text-verdex-600 uppercase tracking-wider mb-3">When to Use</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedClauseModal.advice.whenToUse}</p>
                    </div>
                  </div>

                  {/* Key Considerations */}
                  {selectedClauseModal.advice.keyConsiderations?.length > 0 && (
                    <div className="pb-6 border-b border-verdex-100">
                      <h4 className="text-xs font-medium text-verdex-600 uppercase tracking-wider mb-4">Key Considerations</h4>
                      <ul className="space-y-3">
                        {selectedClauseModal.advice.keyConsiderations.map((consideration, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                            <span className="text-verdex-300 select-none font-mono text-xs pt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                            <span className="leading-relaxed">{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggested Modifications */}
                  {selectedClauseModal.advice.suggestedModifications && (
                    <div className="pl-4 border-l-2 border-amber-300">
                      <h4 className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-2">Suggested Modification</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedClauseModal.advice.suggestedModifications}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Original Clause Content - Collapsible */}
              <div className="pt-4 mt-2 border-t border-verdex-100">
                <button
                  onClick={() => setOriginalClauseExpanded(!originalClauseExpanded)}
                  className="flex items-center gap-2 text-verdex-600 hover:text-verdex-600 transition-colors group"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${originalClauseExpanded ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-xs font-medium uppercase tracking-wider text-verdex-600">Original Template</span>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${originalClauseExpanded ? 'max-h-[300px] mt-4' : 'max-h-0'}`}>
                  <div className="pl-4 border-l border-verdex-200">
                    <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed max-h-[200px] overflow-auto">
                      {formatClauseContent(selectedClauseModal.content)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-verdex-100 bg-verdex-50/30 flex items-center justify-between">
              {selectedClauseModal.metadata.source && (
                <span className="text-xs text-verdex-600">{selectedClauseModal.metadata.source}</span>
              )}
              <div className="flex items-center gap-4 ml-auto">
                <Link
                  href={`/search?q=${encodeURIComponent(clauseSearchQuery)}`}
                  className="text-sm text-verdex-600 hover:text-verdex-800 transition-colors"
                  onClick={() => setSelectedClauseModal(null)}
                >
                  Search similar
                </Link>
                <button
                  onClick={() => navigator.clipboard.writeText(selectedClauseModal.content)}
                  className="bg-verdex-600 hover:bg-verdex-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Copy clause
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Draft Modal */}
      {draftModalOpen && generatedDraft && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setDraftModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-verdex-100 bg-verdex-50/30 flex-shrink-0">
              <div className="flex items-center gap-6">
                <h3 className="font-medium text-verdex-900">Generated Draft</h3>
                {draftMetadata && (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-verdex-600">Target</span>
                      <span className="text-verdex-700 font-medium">{draftMetadata.targetDFI}</span>
                    </div>
                    <div className="h-4 w-px bg-verdex-200" />
                    <div className="flex items-center gap-2">
                      <span className="text-verdex-600">Sector</span>
                      <span className="text-verdex-700 font-medium capitalize">{draftMetadata.sector}</span>
                    </div>
                    <div className="h-4 w-px bg-verdex-200" />
                    <div className="flex items-center gap-2">
                      <span className="text-verdex-600">Generated</span>
                      <span className="text-verdex-700 font-medium">{new Date(draftMetadata.generatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setDraftModalOpen(false)}
                className="text-verdex-600 hover:text-verdex-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-auto px-6 py-4">
              <div className="max-w-none">
                {/* Render markdown content with table support */}
                {(() => {
                  const lines = generatedDraft.split('\n');
                  const elements: React.ReactNode[] = [];
                  let i = 0;

                  while (i < lines.length) {
                    const trimmed = lines[i].trim();

                    // Check if this is a table start
                    if (trimmed.startsWith('|') && !trimmed.match(/^\|[\s\-:|]+\|$/)) {
                      // Parse table
                      const tableLines: string[] = [];
                      while (i < lines.length && lines[i].trim().startsWith('|')) {
                        tableLines.push(lines[i].trim());
                        i++;
                      }

                      // Parse into headers and rows
                      const headers: string[] = [];
                      const rows: string[][] = [];
                      let tableIdx = 0;

                      // Header row
                      if (tableLines[tableIdx]) {
                        const headerCells = tableLines[tableIdx].split('|').filter(c => c.trim()).map(c => c.trim().replace(/\*\*/g, ''));
                        headers.push(...headerCells);
                        tableIdx++;
                      }

                      // Skip separator
                      if (tableLines[tableIdx]?.match(/^\|[\s\-:|]+\|$/)) {
                        tableIdx++;
                      }

                      // Data rows
                      while (tableIdx < tableLines.length) {
                        const rowLine = tableLines[tableIdx];
                        if (!rowLine.match(/^\|[\s\-:|]+\|$/)) {
                          const cells = rowLine.split('|').filter(c => c.trim()).map(c => c.trim().replace(/\*\*/g, ''));
                          if (cells.length > 0) rows.push(cells);
                        }
                        tableIdx++;
                      }

                      if (headers.length > 0 && rows.length > 0) {
                        elements.push(
                          <div key={`table-${elements.length}`} className="my-4 overflow-x-auto">
                            <table className="min-w-full">
                              <thead>
                                <tr className="border-b border-verdex-200 bg-verdex-50/50">
                                  {headers.map((h, hi) => (
                                    <th key={hi} className="px-3 py-2 text-left text-xs font-medium text-verdex-600 uppercase tracking-wider">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-verdex-50">
                                {rows.map((row, ri) => (
                                  <tr key={ri}>
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="px-3 py-2 text-sm text-gray-700">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      continue;
                    }

                    // Regular line processing
                    if (!trimmed) {
                      elements.push(<div key={`line-${i}`} className="h-2" />);
                    } else if (trimmed.startsWith('### ')) {
                      elements.push(
                        <h3 key={`line-${i}`} className="text-md font-medium text-verdex-600 uppercase tracking-wider mt-5 mb-2">
                          {trimmed.replace('### ', '').replace(/\*\*/g, '')}
                        </h3>
                      );
                    } else if (trimmed.startsWith('## ')) {
                      elements.push(
                        <h2 key={`line-${i}`} className="text-sm font-semibold text-verdex-800 mt-6 mb-2 pb-2 border-b border-verdex-100">
                          {trimmed.replace('## ', '').replace(/\*\*/g, '')}
                        </h2>
                      );
                    } else if (trimmed.startsWith('# ')) {
                      elements.push(
                        <h1 key={`line-${i}`} className="text-base font-medium text-verdex-900 mb-1">
                          {trimmed.replace('# ', '').replace(/\*\*/g, '')}
                        </h1>
                      );
                    } else if (trimmed.startsWith('---')) {
                      elements.push(<hr key={`line-${i}`} className="my-5 border-verdex-100" />);
                    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                      const content = trimmed.substring(2);
                      elements.push(
                        <div key={`line-${i}`} className="flex items-start gap-2 my-1">
                          <span className="text-verdex-300 select-none">—</span>
                          <span className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{
                            __html: content.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-medium text-verdex-900">$1</strong>')
                          }} />
                        </div>
                      );
                    } else if (/^\d+\.\s/.test(trimmed)) {
                      const match = trimmed.match(/^(\d+)\.\s(.*)$/);
                      if (match) {
                        elements.push(
                          <div key={`line-${i}`} className="flex items-start gap-2 my-1">
                            <span className="text-verdex-300 select-none font-mono text-xs pt-0.5">{match[1].padStart(2, '0')}</span>
                            <span className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{
                              __html: match[2].replace(/\*\*([^*]+)\*\*/g, '<strong class="font-medium text-verdex-900">$1</strong>')
                            }} />
                          </div>
                        );
                      }
                    } else {
                      elements.push(
                        <p key={`line-${i}`} className="text-sm text-gray-700 leading-relaxed my-1" dangerouslySetInnerHTML={{
                          __html: trimmed.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-medium text-verdex-900">$1</strong>')
                        }} />
                      );
                    }
                    i++;
                  }

                  return elements;
                })()}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-verdex-100 bg-verdex-50/30 flex-shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-xs text-verdex-700">Review with legal counsel before use</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedDraft);
                    }}
                    className="text-sm text-verdex-600 hover:text-verdex-800 transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    onClick={exportDraftToPDF}
                    className="bg-verdex-600 hover:bg-verdex-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
