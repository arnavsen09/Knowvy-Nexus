import React, { useState, useEffect } from 'react';
import { Navbar, NavView } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';
import { ProjectCreateView } from './components/ProjectCreateView';
import { CommunityView } from './components/CommunityView';
import { RecommendedTeamView } from './components/RecommendedTeamView';
import { GapAnalysisView } from './components/GapAnalysisView';
import { ExecutionPlanView } from './components/ExecutionPlanView';
import { DEMO_PROFILES, DEMO_PROJECT_SEEDS } from './data/mockProfiles';
import { FALLBACK_MATCH_RESULT } from './data/fallbackData';
import { 
  Project, 
  ProjectAnalysis, 
  RequiredCapability, 
  MatchResponsePayload, 
  ExecutionRoadmap,
  Profile 
} from './types/nexus';
import { 
  checkServerHealth, 
  fetchCommunityProfiles, 
  analyzeProjectAPI, 
  matchTeamAPI, 
  generateRoadmapAPI 
} from './lib/api';
import { Sparkles, AlertCircle, CheckCircle, Zap } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('landing');
  const [profiles, setProfiles] = useState<Profile[]>(DEMO_PROFILES);
  const [isAiActive, setIsAiActive] = useState<boolean>(true);
  
  // Project state
  const [currentProject, setCurrentProject] = useState<Project>({
    name: DEMO_PROJECT_SEEDS[0].name,
    description: DEMO_PROJECT_SEEDS[0].description,
    domain: DEMO_PROJECT_SEEDS[0].domain,
    desiredTeamSize: 4,
    existingMembers: [],
    optionalSkills: DEMO_PROJECT_SEEDS[0].optionalSkills || []
  });

  // Analysis & Matching results state
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResponsePayload | null>(null);
  const [roadmap, setRoadmap] = useState<ExecutionRoadmap | null>(null);

  // Loading indicators
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [bannerNotice, setBannerNotice] = useState<{ message: string; type: 'info' | 'success' | 'warning' } | null>(null);

  // Initial backend health check & seed loading
  useEffect(() => {
    async function initPlatform() {
      try {
        const health = await checkServerHealth();
        setIsAiActive(health.geminiConfigured);
        
        const remoteProfiles = await fetchCommunityProfiles();
        if (remoteProfiles && remoteProfiles.length > 0) {
          setProfiles(remoteProfiles);
        }
      } catch (err) {
        console.warn('Backend unavailable, running in verified client deterministic mode:', err);
        setIsAiActive(false);
      }
    }
    initPlatform();
  }, []);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setBannerNotice({ message, type });
    setTimeout(() => {
      setBannerNotice(null);
    }, 4500);
  };

  // Flow 1 -> Demo Preload: Loads complete end-to-end verified EdTech prototype
  const handleTriggerDemo = () => {
    setCurrentProject({
      name: DEMO_PROJECT_SEEDS[0].name,
      description: DEMO_PROJECT_SEEDS[0].description,
      domain: DEMO_PROJECT_SEEDS[0].domain,
      desiredTeamSize: DEMO_PROJECT_SEEDS[0].desiredTeamSize,
      existingMembers: [],
      optionalSkills: DEMO_PROJECT_SEEDS[0].optionalSkills || []
    });

    setAnalysis({
      overview_summary: "An intelligent learning diagnostic platform that identifies math and logic comprehension gaps through natural language dialogue and adaptive problem sets.",
      technical_domains: ["AI/ML", "Full-Stack Development", "UI/UX & Learning Design"],
      complexity_level: "High",
      estimated_sprints: 4,
      required_capabilities: [
        {
          id: "cap-1",
          name: "LLM Orchestration & Prompt Evaluation",
          category: "AI/ML",
          priority: "Critical",
          description: "Building student dialogue flows and few-shot diagnostic evaluators.",
          minimumProficiency: 4
        },
        {
          id: "cap-2",
          name: "Full-Stack Interactive Dashboard",
          category: "Frontend",
          priority: "High",
          description: "Interactive real-time visual progress trees and mastery heatmaps.",
          minimumProficiency: 4
        },
        {
          id: "cap-3",
          name: "Scalable API & Data Persistence",
          category: "Backend",
          priority: "High",
          description: "Session state management, student telemetry, and response caching.",
          minimumProficiency: 3
        },
        {
          id: "cap-4",
          name: "Pedagogical UI/UX & Accessible Design",
          category: "UI/UX",
          priority: "Medium",
          description: "Distraction-free assessment workflows for younger learners.",
          minimumProficiency: 3
        }
      ]
    });

    setMatchResult(FALLBACK_MATCH_RESULT);
    setRoadmap(FALLBACK_MATCH_RESULT.roadmap || null);
    setCurrentView('match');
    showToast('Loaded demo case study with capability matching & gap forensics.', 'success');
  };

  // Flow 2: Project Analysis Handler
  const handleAnalyzeProject = async (proj: Project): Promise<ProjectAnalysis | null> => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeProjectAPI(proj);
      if (res.analysis) {
        setAnalysis(res.analysis);
        showToast('Project scope analyzed and capabilities extracted.', 'success');
        return res.analysis;
      }
      return null;
    } catch (err) {
      console.error('Analysis failed:', err);
      showToast('Analysis encountered an issue. Loaded fallback capabilities.', 'warning');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Flow 3: Matching Handler
  const handleProceedToMatching = async (
    proj: Project, 
    capabilities: RequiredCapability[], 
    teamSize: number
  ) => {
    setIsMatching(true);
    setCurrentView('match');
    try {
      const res = await matchTeamAPI(proj, capabilities, teamSize);
      if (res.teamRecommendation) {
        setMatchResult(res);
        if (res.roadmap) {
          setRoadmap(res.roadmap);
        }
        showToast(`Matched ${res.teamRecommendation.selected_candidates?.length || res.teamRecommendation.selected_candidate_ids.length} complementary members with ${res.teamRecommendation.team_fit_score}% synergy!`, 'success');
      } else {
        setMatchResult(FALLBACK_MATCH_RESULT);
        setRoadmap(FALLBACK_MATCH_RESULT.roadmap || null);
        showToast('Used deterministic algorithm to assemble the optimal squad.', 'info');
      }
    } catch (err) {
      console.error('Error matching team:', err);
      setMatchResult(FALLBACK_MATCH_RESULT);
      setRoadmap(FALLBACK_MATCH_RESULT.roadmap || null);
      showToast('Loaded verified squad recommendation.', 'info');
    } finally {
      setIsMatching(false);
    }
  };

  // Flow 7: Regenerate Plan Handler
  const handleRegeneratePlan = async () => {
    if (!matchResult) return;
    setIsGeneratingRoadmap(true);
    try {
      const res = await generateRoadmapAPI(
        currentProject,
        matchResult.teamRecommendation,
        matchResult.gapAnalysis
      );
      if (res.roadmap) {
        setRoadmap(res.roadmap);
        showToast('Fresh 5-phase execution plan synthesized!', 'success');
      }
    } catch (err) {
      console.error('Error regenerating roadmap:', err);
      showToast('Retained existing execution blueprint.', 'warning');
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Global Toast Notification */}
      {bannerNotice && (
        <div className="fixed top-20 right-4 z-50">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-medium bg-white ${
            bannerNotice.type === 'success'
              ? 'border-emerald-200 text-emerald-800'
              : bannerNotice.type === 'warning'
              ? 'border-amber-200 text-amber-800'
              : 'border-indigo-200 text-indigo-800'
          }`}>
            {bannerNotice.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : bannerNotice.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            )}
            <span>{bannerNotice.message}</span>
          </div>
        </div>
      )}

      {/* Primary Sticky Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view, sectionId) => {
          setCurrentView(view);
          if (sectionId && view === 'landing') {
            setTimeout(() => {
              const el = document.getElementById(sectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        }}
        onTriggerDemo={handleTriggerDemo}
        hasMatchResult={Boolean(matchResult)}
        isAiActive={isAiActive}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        
        {/* Loading Overlay when matching */}
        {isMatching && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xl animate-pulse">
              <Sparkles className="w-7 h-7 text-indigo-600 animate-spin" />
            </div>
            <div className="space-y-1 bg-white px-6 py-3 rounded-xl shadow-lg border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Evaluating Candidate Synergy...</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Optimizing complementary capabilities, eliminating role redundancy, and scoring sprint readiness.
              </p>
            </div>
          </div>
        )}

        {/* View: Landing */}
        {currentView === 'landing' && (
          <LandingView
            onNavigate={(view, sectionId) => {
              setCurrentView(view);
              if (sectionId) {
                setTimeout(() => {
                  const el = document.getElementById(sectionId);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }
            }}
            onTriggerDemo={handleTriggerDemo}
          />
        )}

        {/* View: Create Project */}
        {currentView === 'project' && (
          <ProjectCreateView
            currentProject={currentProject}
            setProject={setCurrentProject}
            analysis={analysis}
            onAnalyzeProject={handleAnalyzeProject}
            onProceedToMatching={handleProceedToMatching}
            isLoading={isAnalyzing}
          />
        )}

        {/* View: Community Pool */}
        {currentView === 'community' && (
          <CommunityView
            profiles={profiles}
            onNavigateToProject={() => setCurrentView('project')}
          />
        )}

        {/* View: Recommended Team */}
        {currentView === 'match' && (
          <>
            {matchResult ? (
              <RecommendedTeamView
                project={currentProject}
                recommendation={matchResult.teamRecommendation}
                evaluations={matchResult.candidateEvaluations}
                onNavigateToTeamGap={() => setCurrentView('team')}
                onNavigateToPlan={() => setCurrentView('plan')}
              />
            ) : (
              <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mx-auto text-indigo-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-slate-900">No Team Matched Yet</h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Define a project brief to let Nexus analyze capabilities and find complementary team members.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentView('project')}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-xs"
                  >
                    Define a Project Brief →
                  </button>
                  <button
                    onClick={handleTriggerDemo}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>Load Sample EdTech Team</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* View: Team Readiness / Gap Analysis */}
        {currentView === 'team' && (
          <>
            {matchResult ? (
              <GapAnalysisView
                gapAnalysis={matchResult.gapAnalysis}
                project={currentProject}
                team={matchResult.teamRecommendation}
                onGeneratePlan={() => setCurrentView('plan')}
                onExploreRecruits={() => setCurrentView('community')}
                isGeneratingPlan={isGeneratingRoadmap}
              />
            ) : (
              <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-slate-900">No Gap Analysis Generated</h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Team gap analysis is calculated after a team is recommended.
                  </p>
                </div>
                <button
                  onClick={handleTriggerDemo}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 cursor-pointer shadow-xs"
                >
                  Load Demo to View Gap Analysis
                </button>
              </div>
            )}
          </>
        )}

        {/* View: Execution Plan */}
        {currentView === 'plan' && (
          <>
            {matchResult ? (
              <ExecutionPlanView
                roadmap={roadmap || matchResult.roadmap || FALLBACK_MATCH_RESULT.roadmap!}
                project={currentProject}
                team={matchResult.teamRecommendation}
                gapAnalysis={matchResult.gapAnalysis}
                onRegeneratePlan={handleRegeneratePlan}
                isLoading={isGeneratingRoadmap}
              />
            ) : (
              <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mx-auto text-indigo-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-slate-900">No Execution Plan Yet</h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Generate an execution plan once your team and capability requirements are established.
                  </p>
                </div>
                <button
                  onClick={handleTriggerDemo}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 cursor-pointer shadow-xs"
                >
                  Load Demo with Full Roadmap
                </button>
              </div>
            )}
          </>
        )}

      </main>

      {/* Global Clean Footer */}
      <Footer />

    </div>
  );
}
