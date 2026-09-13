import {
  Project,
  RequiredCapability,
  ProjectAnalysis,
  MatchResponsePayload,
  ExecutionRoadmap,
  Profile
} from '../types/nexus';
import { FALLBACK_MATCH_RESULT } from '../data/fallbackData';
import { DEMO_PROFILES } from '../data/mockProfiles';
import { runDeterministicTeamMatching } from './matchingEngine';

export async function checkServerHealth(): Promise<{ status: string; geminiConfigured: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend health check error, running in local browser fallback:', err);
    return { status: 'fallback', geminiConfigured: false };
  }
}

export async function fetchCommunityProfiles(): Promise<Profile[]> {
  try {
    const res = await fetch('/api/profiles');
    if (!res.ok) throw new Error('Failed to load profiles');
    const data = await res.json();
    return data.profiles || DEMO_PROFILES;
  } catch (err) {
    console.warn('Using local demo profiles fallback:', err);
    return DEMO_PROFILES;
  }
}

export async function analyzeProjectAPI(project: Project): Promise<{ analysis: ProjectAnalysis; mode: 'gemini' | 'fallback' }> {
  try {
    const res = await fetch('/api/analyze-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error(`Analyze API failed: ${res.status}`);
    const data = await res.json();
    if (!data.analysis || !data.analysis.required_capabilities) {
      throw new Error('Malformed analysis response');
    }
    return { analysis: data.analysis, mode: data.mode || 'gemini' };
  } catch (err) {
    console.warn('API error during project analysis, using high-quality local fallback:', err);
    // If project has custom title, adapt the fallback
    const adapted = {
      ...FALLBACK_MATCH_RESULT.analysis,
      project_title: project.name || FALLBACK_MATCH_RESULT.analysis.project_title,
      domain_category: project.domain || FALLBACK_MATCH_RESULT.analysis.domain_category,
      summary: project.description ? `${project.description.slice(0, 180)}...` : FALLBACK_MATCH_RESULT.analysis.summary
    };
    return { analysis: adapted, mode: 'fallback' };
  }
}

export async function matchTeamAPI(
  project: Project,
  capabilities: RequiredCapability[],
  teamSize: number = 3
): Promise<MatchResponsePayload> {
  try {
    const res = await fetch('/api/match-team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project, capabilities, teamSize }),
    });
    if (!res.ok) throw new Error(`Match API error: ${res.status}`);
    const data = await res.json();
    if (!data.teamRecommendation || !data.candidateEvaluations) {
      throw new Error('Incomplete matching response');
    }
    return data as MatchResponsePayload;
  } catch (err) {
    console.warn('API error during match-team, using deterministic matching engine:', err);
    const det = runDeterministicTeamMatching(DEMO_PROFILES, project, capabilities, teamSize);
    return {
      analysis: {
        project_title: project.name,
        domain_category: project.domain,
        complexity_level: 'High',
        summary: project.description,
        required_capabilities: capabilities
      },
      teamRecommendation: det.recommendation,
      candidateEvaluations: det.evaluations,
      gapAnalysis: det.gapAnalysis,
      roadmap: FALLBACK_MATCH_RESULT.roadmap,
      mode: 'fallback'
    };
  }
}

export async function generateRoadmapAPI(
  project: Project,
  team: any,
  gapAnalysis: any
): Promise<{ roadmap: ExecutionRoadmap; mode: 'gemini' | 'fallback' }> {
  try {
    const res = await fetch('/api/execution-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project, team, gapAnalysis }),
    });
    if (!res.ok) throw new Error(`Roadmap API failed: ${res.status}`);
    const data = await res.json();
    if (!data.roadmap || !Array.isArray(data.roadmap.phases)) {
      throw new Error('Invalid roadmap payload');
    }
    return { roadmap: data.roadmap, mode: data.mode || 'gemini' };
  } catch (err) {
    console.warn('API error during roadmap generation, using fallback roadmap:', err);
    return { roadmap: FALLBACK_MATCH_RESULT.roadmap!, mode: 'fallback' };
  }
}
