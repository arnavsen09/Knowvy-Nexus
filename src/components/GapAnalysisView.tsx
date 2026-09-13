import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  Cpu, 
  UserPlus, 
  AlertCircle,
  HelpCircle,
  Check,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { GapAnalysis, Project, TeamRecommendation } from '../types/nexus';

interface GapAnalysisViewProps {
  gapAnalysis: GapAnalysis;
  project: Project;
  team: TeamRecommendation;
  onGeneratePlan: () => void;
  onExploreRecruits: () => void;
  isGeneratingPlan?: boolean;
}

export const GapAnalysisView: React.FC<GapAnalysisViewProps> = ({
  gapAnalysis,
  project,
  team,
  onGeneratePlan,
  onExploreRecruits,
  isGeneratingPlan = false
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>Stage 3 • Team Readiness & Capability Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Team Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Auditing coverage, identifying blind spots, and mitigating pre-launch risks for <strong className="text-slate-900">{project.name || 'Your Project'}</strong>.
          </p>
        </div>

        {/* Large Prominent Team Readiness Block */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-indigo-200 shadow-xs">
          <div className="space-y-0.5 text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
              TEAM READINESS
            </span>
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono">
                {gapAnalysis.readiness_score}%
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Composite Readiness Score
            </span>
          </div>

          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* WOW FEATURE: CRITICAL GAP SPOTLIGHT BANNER                     */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl border-2 border-rose-300 bg-gradient-to-r from-rose-50/90 via-white to-rose-50/50 p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rose-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-black tracking-wider text-rose-700">
                CRITICAL GAP IDENTIFIED
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {gapAnalysis.critical_missing_capability || 'Deployment / Cloud Infrastructure'}
              </h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200 self-start sm:self-auto">
            High Severity Risk
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          
          {/* WHY Section */}
          <div className="space-y-1.5 bg-white/80 p-4 rounded-xl border border-rose-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>WHY?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              "{gapAnalysis.missing_capability_explanation || 'No selected member has strong deployment or production cloud experience.'}"
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              If unaddressed, teams often spend the final 4 hours of hackathons battling CORS, Docker builds, and environment variables instead of polishing their demo.
            </p>
          </div>

          {/* RECOMMENDED ACTION Section */}
          <div className="space-y-2 bg-white/80 p-4 rounded-xl border border-indigo-200">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-800">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>RECOMMENDED ACTION:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
              "{gapAnalysis.recommended_action || 'Find a cloud/deployment contributor or assign deployment ownership to the backend member.'}"
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onExploreRecruits}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Search Community for Cloud Contributor</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CAPABILITY COVERAGE VISUALIZATION & PRE-LAUNCH RISKS           */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Capability Coverage Breakdown (Strong / Partial / Missing) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Capability Coverage Breakdown
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluated across {team.selected_candidates?.length || 3} selected squad members
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Target: 80%+
              </span>
            </div>

            {/* Visual Coverage List */}
            <div className="space-y-4">
              {gapAnalysis.capability_coverage.map((cap, idx) => {
                const isStrong = cap.coverage_percentage >= 80;
                const isPartial = cap.coverage_percentage >= 50 && cap.coverage_percentage < 80;
                const isMissing = cap.coverage_percentage < 50;

                const statusLabel = isStrong ? 'Strong' : isPartial ? 'Partial' : 'Missing';
                const statusBadgeStyle = isStrong 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : isPartial 
                  ? 'bg-amber-50 text-amber-700 border-amber-200' 
                  : 'bg-rose-50 text-rose-700 border-rose-200';

                const barColor = isStrong 
                  ? 'bg-emerald-500' 
                  : isPartial 
                  ? 'bg-amber-500' 
                  : 'bg-rose-500';

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {cap.capability}
                        </span>
                        {cap.covered_by && cap.covered_by.length > 0 ? (
                          <span className="text-[10px] text-slate-500 font-mono">
                            ({cap.covered_by.join(', ')})
                          </span>
                        ) : (
                          <span className="text-[10px] text-rose-500 font-mono font-medium">
                            (Unassigned)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-700">
                          {cap.coverage_percentage}%
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadgeStyle}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>

                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${Math.max(cap.coverage_percentage, 5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Strong (&gt;=80%)
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Partial (50–79%)
              </span>
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Missing (&lt;50%)
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Pre-Hackathon Risks & Suggested Recruits */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Critical Risks Audit */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs uppercase tracking-wider text-slate-700 font-bold">
                Pre-Hackathon Risk Audit
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              {gapAnalysis.critical_risks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Community Recruits */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs uppercase tracking-wider text-slate-700 font-bold">
                  Complementary Recruits
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                Available in Pool
              </span>
            </div>

            <div className="space-y-2">
              {gapAnalysis.suggested_recruits.map((recruit, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-indigo-950">{recruit}</span>
                  <button
                    type="button"
                    onClick={onExploreRecruits}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onExploreRecruits}
              className="w-full py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Browse All 16 Builders
            </button>
          </div>

        </div>

      </div>

      {/* Bottom CTA to Sprint Execution Plan */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-bold">Mitigate Gaps in Your Sprint Plan</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Nexus assigns milestone owners and risk safeguards across a 5-phase delivery roadmap.
          </p>
        </div>

        <button
          id="gap-to-roadmap-btn"
          type="button"
          onClick={onGeneratePlan}
          disabled={isGeneratingPlan}
          className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
        >
          <span>{isGeneratingPlan ? 'Synthesizing...' : 'Generate 5-Phase Execution Plan'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
