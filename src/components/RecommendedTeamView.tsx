import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Cpu, 
  X,
  Clock,
  ShieldCheck,
  Award,
  Layers,
  Zap,
  Target,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { 
  Project, 
  TeamRecommendation, 
  CandidateEvaluation
} from '../types/nexus';

interface RecommendedTeamViewProps {
  project: Project;
  recommendation: TeamRecommendation;
  evaluations: CandidateEvaluation[];
  onNavigateToTeamGap: () => void;
  onNavigateToPlan: () => void;
}

export const RecommendedTeamView: React.FC<RecommendedTeamViewProps> = ({
  project,
  recommendation,
  evaluations,
  onNavigateToTeamGap,
  onNavigateToPlan
}) => {
  const [activeWhyMeModal, setActiveWhyMeModal] = useState<CandidateEvaluation | null>(null);

  const selectedMembers = recommendation.selected_candidates || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in text-left">
      
      {/* Top Banner & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Stage 2 • Complementary Squad Recommendation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Recommended Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Algorithmically balanced for <strong className="text-slate-900">{project.name || 'Your Project'}</strong> ({project.domain}).
          </p>
        </div>

        {/* Large Compatibility Metric Card */}
        <div className="flex items-center gap-3">
          <div className="p-4 rounded-xl bg-white border border-indigo-200 shadow-xs text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
              Team Compatibility
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-3xl font-black font-mono text-indigo-600">
                {recommendation.team_fit_score}%
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">
              Synergistic Match
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
              Complementarity
            </span>
            <span className="text-xl font-bold font-mono text-purple-600">
              {recommendation.complementarity_score}%
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">
              0% Overlap
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
              Redundancy Level
            </span>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
              {recommendation.redundancy_level}
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONNECTED NETWORK DIAGRAM: PROJECT -> CANDIDATES               */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs uppercase tracking-wider text-indigo-800 font-bold">
              Architectural Team Topology
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {selectedMembers.length} Members Assembled
          </span>
        </div>

        {/* Central Visual Structure */}
        <div className="py-4 max-w-4xl mx-auto space-y-6">
          
          {/* Top Node: PROJECT */}
          <div className="flex flex-col items-center">
            <div className="px-6 py-3 rounded-xl bg-slate-900 text-white shadow-md text-center max-w-md border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider block">
                Target Project
              </span>
              <h4 className="text-sm font-bold truncate">
                {project.name || 'Adaptive Math Diagnostician'}
              </h4>
              <p className="text-[11px] text-slate-300">
                {project.domain} • {project.desiredTeamSize} Desired Contributors
              </p>
            </div>

            {/* Vertical connector */}
            <div className="w-0.5 h-6 bg-indigo-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100" />
            <div className="w-0.5 h-4 bg-indigo-300" />
          </div>

          {/* Branching to Candidates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {evaluations.slice(0, 3).map((evalItem, idx) => {
              const memberProfile = selectedMembers.find(m => m.id === evalItem.candidate_id);
              const initials = evalItem.name.split(' ').map(n => n[0]).join('');

              const borderHighlight = 
                idx === 0 ? 'border-indigo-200 bg-indigo-50/30' :
                idx === 1 ? 'border-purple-200 bg-purple-50/30' :
                'border-cyan-200 bg-cyan-50/30';

              const badgeColor =
                idx === 0 ? 'bg-indigo-600 text-white' :
                idx === 1 ? 'bg-purple-600 text-white' :
                'bg-cyan-600 text-white';

              return (
                <div 
                  key={evalItem.candidate_id}
                  className={`p-4 rounded-xl border ${borderHighlight} shadow-2xs space-y-3 relative group hover:border-indigo-400 transition-all`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {memberProfile?.avatar ? (
                        <img 
                          src={memberProfile.avatar} 
                          alt={evalItem.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-xl ${badgeColor} font-bold text-xs flex items-center justify-center`}>
                          {initials}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{evalItem.name}</h4>
                        <span className="text-[11px] font-semibold text-indigo-600 block">
                          {evalItem.primary_role}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {evalItem.match_confidence}% Match
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Role Responsibility
                    </span>
                    <p className="text-xs text-slate-700 leading-snug">
                      {evalItem.assigned_tasks?.[0] || 'Direct engineering execution'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {memberProfile?.availability || '20 hrs/wk'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveWhyMeModal(evalItem)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Why Me?</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* "Why this team?" Synthesis Card                                */}
      {/* ------------------------------------------------------------- */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5 text-left">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs uppercase tracking-wider text-indigo-700 font-bold">
            Why this team?
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
          "{recommendation.selection_reason}"
        </p>
        <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 border-t border-slate-100">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero redundant role overlap across core deliverables</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Aligned commit capacity with hackathon sprint timelines</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Direct domain interest matches the problem statement</span>
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DETAILED CANDIDATE EVALUATION CARDS WITH "WHY ME" PILLARS     */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            Detailed Candidate Selection & Responsibilities
          </h3>
          <span className="text-xs text-slate-400">
            Click "Why Me?" for transparent selection breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {evaluations.map((evalItem) => {
            const memberProfile = selectedMembers.find(m => m.id === evalItem.candidate_id);

            return (
              <div
                key={evalItem.candidate_id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5 text-left hover:border-slate-300 transition-colors"
              >
                {/* Candidate Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    {memberProfile?.avatar ? (
                      <img
                        src={memberProfile.avatar}
                        alt={evalItem.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-2xs">
                        {evalItem.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">{evalItem.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {evalItem.match_confidence}% Match
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                        {evalItem.primary_role} • {memberProfile?.availability || '20 hrs/wk'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveWhyMeModal(evalItem)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>View "Why Me?" Breakdown</span>
                  </button>
                </div>

                {/* Candidate Rationale & Responsibilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  {/* Left: Why Selected & Strengths */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Why Selected
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {evalItem.why_selected}
                    </p>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                        Skills Contributed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {evalItem.strengths_brought.map((strength, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 text-[11px] font-medium border border-indigo-100"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Assigned Responsibilities */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Assigned Sprint Responsibilities
                    </span>
                    <ul className="space-y-1.5 text-slate-700">
                      {evalItem.assigned_tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions to Next Views */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-bold">What's Next?</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Audit team readiness to detect missing capabilities, or proceed directly to the 5-phase execution plan.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="match-to-team-gap-btn"
            type="button"
            onClick={onNavigateToTeamGap}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Analyze Team Gaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="match-to-plan-btn"
            type="button"
            onClick={onNavigateToPlan}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>View 5-Phase Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* "Why Me?" Deep-Dive Modal */}
      {activeWhyMeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveWhyMeModal(null)}
        >
          <div 
            className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl p-6 sm:p-7 space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {activeWhyMeModal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{activeWhyMeModal.name}</h3>
                  <p className="text-xs text-indigo-600 font-semibold">
                    {activeWhyMeModal.primary_role} • {activeWhyMeModal.match_confidence}% Match
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveWhyMeModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Transparent Selection Rationale
              </span>
              <p className="text-xs text-slate-700 italic">
                "{activeWhyMeModal.why_selected}"
              </p>
            </div>

            {/* 4 Pillars Breakdown */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-emerald-700 block">
                  1. Critical Technical Skill Fit
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeWhyMeModal.why_me.skillFit}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-purple-700 block">
                  2. Domain Alignment & Interest
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeWhyMeModal.why_me.domainInterest}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-indigo-700 block">
                  3. Team Complementarity & Anti-Redundancy
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeWhyMeModal.why_me.teamComplement}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-amber-700 block">
                  4. Availability & Hackathon Capacity
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeWhyMeModal.why_me.availabilityFit}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveWhyMeModal(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                Close Breakdown
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
