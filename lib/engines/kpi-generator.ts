// AI-Powered KPI & SPT Generator
// Sources: SBTi Sector Pathways, ICMA Green Bond Principles, LMA Transition Loan Principles

import { callAI } from '../ai/api-handler';
import type { ProjectInput, Sector } from '../types';

export interface KPIRecommendation {
  name: string;
  unit: string;
  description: string;
  suggestedTarget: string;
  source: string; // Framework reference
  rationale: string;
}

export interface SPTRecommendation {
  name: string;
  baseline: string;
  target: string;
  marginImpact: string;
  verificationMethod: string;
  source: string;
}

export interface KPISPTResult {
  kpis: KPIRecommendation[];
  spts: SPTRecommendation[];
  frameworksReferenced: string[];
  aiGenerated: boolean;
}

// Framework reference data to include in prompt
const FRAMEWORK_CONTEXT = `
## Official Framework References

### SBTi (Science Based Targets Initiative) Requirements:
- 1.5°C pathway requires 42% absolute reduction in Scope 1+2 by 2030 (from 2020 baseline)
- Well-below 2°C requires 25% reduction by 2030
- Scope 3 required if >40% of total emissions
- Near-term targets: 5-10 years; Long-term: by 2050

### SBTi Sector Pathways:
- Power: 100% renewable electricity by 2040
- Buildings: 78% reduction in emissions intensity by 2030
- Transport: 59% reduction in emissions per vehicle-km by 2030
- Cement: 23% reduction in clinker-to-cement ratio by 2030
- Steel: 29% reduction in emissions intensity by 2030
- Agriculture: 30% reduction in emissions intensity; zero deforestation

### ICMA Green Bond Principles - Eligible Categories:
- Renewable energy
- Energy efficiency
- Clean transportation
- Sustainable water management
- Pollution prevention
- Environmentally sustainable agriculture
- Green buildings

### LMA Transition Loan Principles Requirements:
1. Borrower's climate transition strategy must be:
   - Aligned with Paris Agreement goals
   - Relevant to environmentally material parts of business
   - Science-based where credible methodologies exist

2. Sustainability Performance Targets (SPTs) must be:
   - Ambitious (beyond business-as-usual)
   - Measurable and externally verifiable
   - Benchmarked against science-based trajectories
   - Linked to loan margin adjustments

### Common SPT Margin Adjustments:
- Typical range: ±2.5 to ±10 basis points per target
- Annual verification required
- Lookback period usually 12 months

### African Context (NDCs & Regional Targets):
- Kenya: 32% GHG reduction by 2030
- Nigeria: 20% unconditional, 47% conditional reduction by 2030
- South Africa: 398-510 MtCO2e by 2025-2030
- Morocco: 45.5% reduction by 2030
- Ethiopia: 68.8% reduction by 2030
`;

const SYSTEM_PROMPT = `You are an expert in sustainable finance, specializing in transition loans and green finance frameworks. Your role is to recommend specific, measurable KPIs and SPTs for African transition projects based on official frameworks.

${FRAMEWORK_CONTEXT}

IMPORTANT GUIDELINES:
1. Always cite the source framework for each recommendation (SBTi, ICMA, LMA, or regional NDC)
2. Tailor recommendations to the specific sector and project type
3. Ensure targets are ambitious but achievable for African context
4. Include both environmental AND social KPIs (local employment, community benefit)
5. SPTs must be verifiable by third parties
6. Consider data availability constraints in African markets

Respond in JSON format only.`;

export async function generateKPIRecommendationsAI(
  project: ProjectInput
): Promise<KPISPTResult> {
  const userPrompt = `Generate KPI and SPT recommendations for this African transition project:

PROJECT DETAILS:
- Name: ${project.projectName}
- Country: ${project.country}
- Sector: ${project.sector}
- Project Type: ${project.projectType || 'Not specified'}
- Description: ${project.description}
- Total Cost: USD ${project.totalCost?.toLocaleString() || 'Not specified'}
- Current Emissions (Scope 1): ${project.currentEmissions?.scope1 || 0} tCO2e/year
- Current Emissions (Scope 2): ${project.currentEmissions?.scope2 || 0} tCO2e/year
- Target Emissions (Scope 1): ${project.targetEmissions?.scope1 || 0} tCO2e/year
- Target Emissions (Scope 2): ${project.targetEmissions?.scope2 || 0} tCO2e/year
- Target Year: ${project.targetYear || 2030}
- Transition Strategy: ${project.transitionStrategy || 'Not specified'}

Generate 4-6 KPIs and 2-3 SPTs appropriate for this project.

Respond in this exact JSON format:
{
  "kpis": [
    {
      "name": "KPI name",
      "unit": "measurement unit",
      "description": "what this measures",
      "suggestedTarget": "specific target value/percentage",
      "source": "SBTi/ICMA/LMA/NDC reference",
      "rationale": "why this KPI is relevant for this project"
    }
  ],
  "spts": [
    {
      "name": "SPT name",
      "baseline": "starting point description",
      "target": "specific target to achieve",
      "marginImpact": "±X bps",
      "verificationMethod": "how to verify achievement",
      "source": "framework reference"
    }
  ],
  "frameworksReferenced": ["list of frameworks used"]
}`;

  try {
    const result = await callAI({
      systemPrompt: SYSTEM_PROMPT,
      userPrompt,
      jsonMode: true,
      temperature: 0.3,
      maxTokens: 2000
    });

    if (result.success && result.parsed) {
      return {
        kpis: result.parsed.kpis || [],
        spts: result.parsed.spts || [],
        frameworksReferenced: result.parsed.frameworksReferenced || [],
        aiGenerated: true
      };
    }

    // Fallback to hardcoded if AI fails
    console.log('[KPI Generator] AI failed, using fallback:', result.error);
    return getFallbackKPIs(project);

  } catch (error) {
    console.error('[KPI Generator] Error:', error);
    return getFallbackKPIs(project);
  }
}

// Fallback function if AI is unavailable
function getFallbackKPIs(project: ProjectInput): KPISPTResult {
  const kpis: KPIRecommendation[] = [
    {
      name: 'Absolute GHG Emissions (Scope 1+2)',
      unit: 'tCO2e/year',
      description: 'Total direct and indirect emissions from operations',
      suggestedTarget: '42% reduction by 2030 vs baseline',
      source: 'SBTi 1.5°C Pathway',
      rationale: 'Core requirement for Paris Agreement alignment'
    }
  ];

  const spts: SPTRecommendation[] = [];

  // Add sector-specific KPIs
  switch (project.sector) {
    case 'energy':
      kpis.push(
        {
          name: 'Renewable Energy Generation',
          unit: 'MWh/year',
          description: 'Annual clean electricity produced',
          suggestedTarget: 'As per project design capacity',
          source: 'ICMA Green Bond Principles',
          rationale: 'Core output metric for renewable energy projects'
        },
        {
          name: 'Grid Emissions Avoided',
          unit: 'tCO2e/year',
          description: 'Emissions avoided by displacing fossil generation',
          suggestedTarget: 'Grid factor × generation',
          source: 'GHG Protocol',
          rationale: 'Quantifies climate benefit of project'
        }
      );
      spts.push({
        name: 'Annual Generation Target',
        baseline: 'P50 generation forecast',
        target: '≥95% of P50 annually',
        marginImpact: '±5 bps',
        verificationMethod: 'SCADA data verified by Independent Engineer',
        source: 'LMA Transition Loan Principles'
      });
      break;

    case 'manufacturing':
      kpis.push(
        {
          name: 'Energy Intensity',
          unit: 'kWh/unit produced',
          description: 'Energy consumption per unit of output',
          suggestedTarget: '30% reduction by 2030',
          source: 'SBTi Sectoral Pathways',
          rationale: 'Key efficiency metric for manufacturing'
        },
        {
          name: 'Renewable Energy Share',
          unit: '%',
          description: 'Proportion of energy from renewable sources',
          suggestedTarget: '≥50% by 2030',
          source: 'RE100 Initiative',
          rationale: 'Transition pathway for industrial operations'
        }
      );
      spts.push({
        name: 'Energy Efficiency Improvement',
        baseline: 'Current energy intensity',
        target: '25% reduction by target year',
        marginImpact: '±5 bps',
        verificationMethod: 'Annual energy audit by accredited verifier',
        source: 'LMA Transition Loan Principles'
      });
      break;

    case 'agriculture':
      kpis.push(
        {
          name: 'Emissions Intensity',
          unit: 'kgCO2e/tonne product',
          description: 'GHG emissions per unit of agricultural output',
          suggestedTarget: '30% reduction by 2030',
          source: 'SBTi FLAG Guidance',
          rationale: 'Sector-specific pathway for agriculture'
        },
        {
          name: 'Sustainable Certification',
          unit: '% of output',
          description: 'Products with sustainability certification',
          suggestedTarget: '100% certified by 2030',
          source: 'ICMA Green Bond Principles',
          rationale: 'Demonstrates sustainable practices'
        }
      );
      spts.push({
        name: 'Certified Sustainable Production',
        baseline: 'Current certification %',
        target: '100% Fairtrade/Organic/Rainforest Alliance',
        marginImpact: '±5 bps',
        verificationMethod: 'Annual certification audit',
        source: 'ICMA Sustainability-Linked Bond Principles'
      });
      break;

    case 'transport':
      kpis.push(
        {
          name: 'Zero-Emission Vehicle Share',
          unit: '%',
          description: 'Proportion of fleet that is electric/hydrogen',
          suggestedTarget: '50% by 2030',
          source: 'SBTi Transport Pathway',
          rationale: 'Fleet transition metric'
        },
        {
          name: 'Emissions per Vehicle-km',
          unit: 'gCO2/km',
          description: 'Fleet average emissions intensity',
          suggestedTarget: '59% reduction by 2030',
          source: 'SBTi 1.5°C Transport Pathway',
          rationale: 'Science-based intensity target'
        }
      );
      spts.push({
        name: 'Fleet Electrification',
        baseline: 'Current EV %',
        target: '50% EV by 2030',
        marginImpact: '±5 bps',
        verificationMethod: 'Fleet registry verification',
        source: 'LMA Transition Loan Principles'
      });
      break;

    case 'mining':
      kpis.push(
        {
          name: 'Emissions per Tonne Extracted',
          unit: 'tCO2e/tonne ore',
          description: 'GHG intensity of mining operations',
          suggestedTarget: '30% reduction by 2030',
          source: 'ICMM Climate Commitment',
          rationale: 'Industry-aligned intensity metric'
        },
        {
          name: 'Renewable Energy Share',
          unit: '%',
          description: 'Operations powered by renewables',
          suggestedTarget: '≥50% by 2030',
          source: 'RE100 / ICMM',
          rationale: 'Mining sector transition pathway'
        }
      );
      spts.push({
        name: 'Diesel Consumption Reduction',
        baseline: 'Current diesel use',
        target: '40% reduction by target year',
        marginImpact: '±5 bps',
        verificationMethod: 'Fuel purchase records, third-party audit',
        source: 'LMA Transition Loan Principles'
      });
      break;
  }

  // Add universal social KPIs for African context
  kpis.push(
    {
      name: 'Local Employment',
      unit: '% of workforce',
      description: 'Jobs filled by local community members',
      suggestedTarget: '≥60%',
      source: 'IFC Performance Standards',
      rationale: 'Development impact requirement for African projects'
    },
    {
      name: 'Community Investment',
      unit: 'USD/year or % of revenue',
      description: 'Investment in community development programs',
      suggestedTarget: '1-2% of revenue',
      source: 'Equator Principles',
      rationale: 'Social license and DFI requirement'
    }
  );

  return {
    kpis,
    spts,
    frameworksReferenced: ['SBTi', 'ICMA Green Bond Principles', 'LMA Transition Loan Principles', 'IFC Performance Standards'],
    aiGenerated: false
  };
}
