export interface ClientProfile {
  companyName: string;
  industry: string;
  teamSize: string;
  coreBusiness: string;
  painPoints: string;
  currentTechStack: string;
  primaryGoal: string;
}

export interface ProcessTransformation {
  processName: string;
  currentWorkflow: string;
  aiEnhancedWorkflow: string;
  toolsRecommended: string[];
  estimatedEfficiencyGain: string;
  implementationDifficulty: 'Low' | 'Medium' | 'High';
}

export interface AnalysisResult {
  executiveSummary: string; // The "Grandma friendly" explanation
  industryTrends: string; // Sourced from Search Grounding
  strategicReasoning: string; // The "Why" and "How"
  benefitsScenario: string; // New: Concrete manifestation of benefits (Freedom/Lifestyle)
  transformations: ProcessTransformation[];
}

export enum AppState {
  ONBOARDING = 'ONBOARDING',
  INTERVIEW = 'INTERVIEW',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
}