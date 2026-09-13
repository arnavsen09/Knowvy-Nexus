export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';
export type ComplexityLevel = 'Low' | 'Moderate' | 'High' | 'Very High';
export type CapabilityStatus = 'covered' | 'partial' | 'missing';

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'UI/UX' | 'Data' | 'DevOps/Cloud' | 'Mobile' | 'Product/Research';
  level: 1 | 2 | 3 | 4 | 5; // 1 = Beginner, 5 = Expert
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  bio: string;
  skills: SkillItem[];
  experience: string;
  projects: string[];
  interests: string[];
  preferredRole: string;
  learningGoals: string[];
  availability: string; // e.g. "25 hrs/wk (Hackathon ready)", "15 hrs/wk", "Full-time"
  weeklyHours: number;
  optInStatus: boolean;
  location?: string;
  timezone?: string;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  domain: string;
  desiredTeamSize: number;
  existingMembers?: string[];
  optionalSkills?: string[];
  createdAt?: string;
}

export interface RequiredCapability {
  name: string;
  category: string;
  priority: PriorityLevel;
  description: string;
  minLevel?: number;
}

export interface ProjectAnalysis {
  project_title: string;
  domain_category: string;
  complexity_level: ComplexityLevel;
  summary: string;
  required_capabilities: RequiredCapability[];
  key_deliverables?: string[];
}

export interface WhyMeBreakdown {
  skillFit: string;
  domainInterest: string;
  teamComplement: string;
  availabilityFit: string;
}

export interface CandidateEvaluation {
  candidate_id: string;
  name: string;
  primary_role: string;
  match_confidence: number; // 0 - 100
  deterministic_score?: number; // application score
  assigned_tasks: string[];
  strengths_brought: string[];
  why_selected: string;
  why_me: WhyMeBreakdown;
}

export interface TeamRecommendation {
  selected_candidate_ids: string[];
  selected_candidates?: Profile[];
  team_fit_score: number; // 0 - 100
  selection_reason: string;
  complementarity_score: number; // 0 - 100
  redundancy_level: 'Very Low (Optimal)' | 'Low' | 'Moderate' | 'High';
  role_distribution: { role: string; count: number }[];
}

export interface CapabilityCoverageItem {
  capability: string;
  category?: string;
  coverage_percentage: number; // 0 - 100
  status: CapabilityStatus;
  covered_by: string[];
}

export interface GapAnalysis {
  readiness_score: number; // 0 - 100 (e.g. 93%)
  capability_coverage: CapabilityCoverageItem[];
  critical_missing_capability: string; // e.g. "Deployment / Cloud"
  missing_capability_explanation: string;
  recommended_action: string;
  missing_skills: string[];
  critical_risks: string[];
  suggested_recruits: string[];
}

export interface ExecutionPhase {
  phase: string; // e.g. "Phase 1 — Architecture & Data Pipeline"
  milestone: string;
  owner_role: string;
  deliverables: string[];
  focus_area: string;
  risk_mitigation?: string;
}

export interface ExecutionRoadmap {
  project_title: string;
  total_phases: number;
  phases: ExecutionPhase[];
  summary: string;
}

export interface MatchResponsePayload {
  analysis: ProjectAnalysis;
  teamRecommendation: TeamRecommendation;
  candidateEvaluations: CandidateEvaluation[];
  gapAnalysis: GapAnalysis;
  roadmap?: ExecutionRoadmap;
  mode: 'gemini' | 'fallback';
}
