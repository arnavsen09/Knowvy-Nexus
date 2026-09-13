import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  UserCheck,
  Calendar,
  Clock,
  ShieldCheck,
  FileCheck2,
  ChevronRight,
  Code2
} from 'lucide-react';
import { ExecutionRoadmap, Project, TeamRecommendation, GapAnalysis } from '../types/nexus';

interface ExecutionPlanViewProps {
  roadmap: ExecutionRoadmap | null;
  project: Project;
  team: TeamRecommendation;
  gapAnalysis: GapAnalysis | null;
  onRegeneratePlan: () => Promise<void>;
  isLoading: boolean;
}

export const ExecutionPlanView: React.FC<ExecutionPlanViewProps> = ({
  roadmap,
  project,
  team,
  gapAnalysis,
  onRegeneratePlan,
  isLoading
}) => {
  const [copied, setCopied] = useState(false);
  const [phaseStatuses, setPhaseStatuses] = useState<Record<number, string>>({
    0: 'In Progress',
    1: 'Planned',
    2: 'Planned',
    3: 'Planned',
    4: 'Planned'
  });
  const [checkedDeliverables, setCheckedDeliverables] = useState<Record<string, boolean>>({});

  const toggleDeliverable = (key: string) => {
    setCheckedDeliverables(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const cycleStatus = (index: number) => {
    const sequence = ['Planned', 'In Progress', 'Ready for Review', 'Completed'];
    const current = phaseStatuses[index] || 'Planned';
    const nextIdx = (sequence.indexOf(current) + 1) % sequence.length;
    setPhaseStatuses(prev => ({ ...prev, [index]: sequence[nextIdx] }));
  };

  const handleCopyMarkdown = () => {
    if (!roadmap) return;
    const lines: string[] = [
      `# ${roadmap.project_title} — Sprint Execution Workspace`,
      `**Team:** ${team.selected_candidates?.map(c => `${c.name} (${c.preferredRole})`).join(', ')}`,
      `**Strategy Summary:** ${roadmap.summary}`,
      '',
      '## Phases & Milestones'
    ];

    roadmap.phases.forEach((p, idx) => {
      lines.push(`### ${p.phase} [${phaseStatuses[idx] || 'Planned'}]`);
      lines.push(`- **Milestone:** ${p.milestone}`);
      lines.push(`- **Owner:** ${p.owner_role}`);
      lines.push(`- **Focus Area:** ${p.focus_area}`);
      if (p.deliverables && p.deliverables.length > 0) {
        lines.push('- **Deliverables:**');
        p.deliverables.forEach(d => lines.push(`  * [ ] ${d}`));
      }
      if (p.risk_mitigation) {
        lines.push(`- **Risk Mitigation:** ${p.risk_mitigation}`);
      }
      lines.push('');
    });

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJSON = () => {
    if (!roadmap) return;
    const exportData = {
      project: project.name,
      team: team.selected_candidates?.map(c => ({ name: c.name, role: c.preferredRole })),
      roadmap: roadmap.phases.map((p, idx) => ({
        ...p,
        status: phaseStatuses[idx] || 'Planned'
      }))
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(project.name || 'project').toLowerCase().replace(/[^a-z0-9]/g, '-')}-roadmap.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!roadmap) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Layers className="w-10 h-10 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">No Roadmap Loaded</h2>
        <p className="text-xs text-slate-500">Please match a team first to generate a structured delivery plan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Stage 4 • Structured Delivery Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Sprint Execution Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-world delivery workspace for <strong className="text-slate-900">{project.name || 'Your Project'}</strong> with assigned leads and deliverables.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Copy as Markdown for GitHub / Notion"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadJSON}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Export JSON"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={onRegeneratePlan}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs disabled:opacity-60"
            title="Regenerate with Gemini"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Synthesizing...' : 'Regenerate Plan'}</span>
          </button>
        </div>
      </div>

      {/* Workspace Summary Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Total Phases
          </span>
          <p className="text-xl font-mono font-black text-slate-900">
            {roadmap.phases.length} Sprints
          </p>
          <span className="text-[11px] text-slate-500">End-to-End Delivery</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Assigned Leads
          </span>
          <p className="text-xl font-mono font-black text-indigo-600">
            {team.selected_candidates?.length || 3} Members
          </p>
          <span className="text-[11px] text-slate-500">Full Accountability</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Critical Risk Buffer
          </span>
          <p className="text-xl font-mono font-black text-emerald-600">
            Active
          </p>
          <span className="text-[11px] text-slate-500">Cloud & Testing Safeguards</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Workspace Status
          </span>
          <p className="text-xl font-mono font-black text-purple-600">
            Live
          </p>
          <span className="text-[11px] text-slate-500">Interactive Checklist</span>
        </div>
      </div>

      {/* Strategic Roadmap Narrative Box */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Execution Strategy
        </span>
        <p className="text-slate-700 leading-relaxed text-sm">
          "{roadmap.summary}"
        </p>
      </div>

      {/* Workspace Phases List (Phase -> Milestone -> Owner -> Status) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider">
            Phase-by-Phase Milestone Workspace
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Click status pill to toggle progress
          </span>
        </div>

        <div className="space-y-4">
          {roadmap.phases.map((phase, idx) => {
            const currentStatus = phaseStatuses[idx] || 'Planned';
            
            const statusStyle = 
              currentStatus === 'Completed'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : currentStatus === 'In Progress'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : currentStatus === 'Ready for Review'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-slate-100 text-slate-600 border-slate-200';

            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
              >
                {/* Phase Bar: Phase Name, Milestone, Owner, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-2xs">
                        0{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {phase.phase}
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 pl-8.5">
                      Milestone: <span className="text-indigo-900 font-normal">{phase.milestone}</span>
                    </p>
                  </div>

                  {/* Owner & Status Toggle */}
                  <div className="flex items-center gap-2.5 self-start sm:self-auto pl-8.5 sm:pl-0">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>{phase.owner_role}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => cycleStatus(idx)}
                      className={`px-3 py-1 rounded-md text-xs font-bold border transition-colors cursor-pointer ${statusStyle}`}
                      title="Click to cycle status"
                    >
                      {currentStatus} ↻
                    </button>
                  </div>
                </div>

                {/* Deliverables Checklist & Risk Mitigation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  {/* Left: Deliverables with interactive checkbox */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Key Deliverables Checklist
                    </span>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliv, delivIdx) => {
                        const delivKey = `${idx}-${delivIdx}`;
                        const isDone = Boolean(checkedDeliverables[delivKey]);

                        return (
                          <li
                            key={delivIdx}
                            onClick={() => toggleDeliverable(delivKey)}
                            className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                              isDone ? 'bg-emerald-50/60 text-slate-500 line-through' : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center ${
                              isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="leading-snug">{deliv}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Right: Focus Area & Risk Safeguard */}
                  <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Focus Area
                      </span>
                      <p className="text-slate-700 font-medium mt-0.5">
                        {phase.focus_area}
                      </p>
                    </div>

                    {phase.risk_mitigation && (
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                          Risk Mitigation Safeguard
                        </span>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">
                          {phase.risk_mitigation}
                        </p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
