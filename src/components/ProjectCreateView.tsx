import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  Zap, 
  Plus, 
  X, 
  Layers, 
  Code2, 
  Check, 
  RotateCcw,
  ShieldAlert,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { Project, ProjectAnalysis, RequiredCapability } from '../types/nexus';
import { DEMO_PROJECT_SEEDS } from '../data/mockProfiles';

interface ProjectCreateViewProps {
  onAnalyzeProject: (project: Project) => Promise<ProjectAnalysis | null>;
  onProceedToMatching: (project: Project, capabilities: RequiredCapability[], teamSize: number) => void;
  currentProject: Project;
  setProject: (project: Project) => void;
  analysis: ProjectAnalysis | null;
  isLoading: boolean;
}

const DOMAIN_OPTIONS = [
  'Education / AI',
  'Healthcare & Biotech',
  'Fintech & Web3',
  'Developer Tools & Infrastructure',
  'Climate & Sustainability',
  'Productivity & Collaboration',
  'Consumer AI & Social'
];

const POPULAR_SKILL_SUGGESTIONS = [
  'Python', 'Gemini API', 'React', 'TypeScript', 'Node.js', 
  'PostgreSQL', 'FastAPI', 'Figma', 'Docker', 'Kubernetes', 'Next.js'
];

export const ProjectCreateView: React.FC<ProjectCreateViewProps> = ({
  onAnalyzeProject,
  onProceedToMatching,
  currentProject,
  setProject,
  analysis,
  isLoading
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [existingMemberInput, setExistingMemberInput] = useState('');
  
  // Multi-stage analysis progress simulation
  const [analysisStage, setAnalysisStage] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setAnalysisStage(0);
      interval = setInterval(() => {
        setAnalysisStage((prev) => (prev < 2 ? prev + 1 : prev));
      }, 1200);
    } else {
      setAnalysisStage(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const analysisStages = [
    { title: 'Understanding project scope & architecture...', desc: 'Parsing requirements, domain objectives, and tech stack parameters' },
    { title: 'Extracting required technical capabilities...', desc: 'Categorizing frontend, backend, AI orchestration, and domain pillars' },
    { title: 'Evaluating complexity & milestone risks...', desc: 'Formulating capability weightings and anti-redundancy rules' }
  ];

  const handleSeedSelect = (seedIndex: number) => {
    const seed = DEMO_PROJECT_SEEDS[seedIndex];
    if (seed) {
      setProject({
        name: seed.name,
        description: seed.description,
        domain: seed.domain,
        desiredTeamSize: seed.desiredTeamSize,
        existingMembers: [],
        optionalSkills: seed.optionalSkills || []
      });
      setErrorMsg(null);
    }
  };

  const handleAddSkill = (skillToAdd?: string) => {
    const val = (skillToAdd || skillInput).trim();
    if (val) {
      const current = currentProject.optionalSkills || [];
      if (!current.includes(val)) {
        setProject({ ...currentProject, optionalSkills: [...current, val] });
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = (currentProject.optionalSkills || []).filter(s => s !== skillToRemove);
    setProject({ ...currentProject, optionalSkills: updated });
  };

  const handleAddExistingMember = () => {
    if (existingMemberInput.trim()) {
      const current = currentProject.existingMembers || [];
      setProject({ ...currentProject, existingMembers: [...current, existingMemberInput.trim()] });
      setExistingMemberInput('');
    }
  };

  const handleRemoveExistingMember = (indexToRemove: number) => {
    const updated = (currentProject.existingMembers || []).filter((_, i) => i !== indexToRemove);
    setProject({ ...currentProject, existingMembers: updated });
  };

  const handleSubmitAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.name || currentProject.name.trim().length < 3) {
      setErrorMsg('Please provide a project name (at least 3 characters).');
      return;
    }
    if (!currentProject.description || currentProject.description.trim().length < 20) {
      setErrorMsg('Please describe your project idea in more detail (at least 20 characters) so Gemini can extract capabilities.');
      return;
    }
    setErrorMsg(null);
    await onAnalyzeProject(currentProject);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Stage 1 • Project Brief & Capability Extraction</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Define Your Project Idea
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Specify what you want to build. Nexus extracts the foundational engineering capabilities, balances team size, and prepares candidate matching.
        </p>
      </div>

      {/* Quick Pre-fill Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs text-left">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Quick Case Studies for Evaluation:</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Click to pre-fill</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DEMO_PROJECT_SEEDS.map((seed, idx) => (
            <button
              key={seed.name}
              type="button"
              onClick={() => handleSeedSelect(idx)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                currentProject.name === seed.name
                  ? 'bg-indigo-50/80 border-indigo-300 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-0.5">
                <span className="truncate">{seed.name}</span>
                <span className="text-[10px] font-normal text-indigo-600 font-mono shrink-0 ml-1">
                  {seed.domain.split(' ')[0]}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                {seed.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Project Creation Form */}
      <form onSubmit={handleSubmitAnalysis} className="space-y-6 text-left">
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
          
          {/* Error Banner if any */}
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Project Name */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="project-name-input" className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                Project Name <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {currentProject.name.length} / 80
              </span>
            </div>
            <input
              id="project-name-input"
              type="text"
              maxLength={80}
              placeholder="e.g., CogniFlow — Adaptive Learning Engine"
              value={currentProject.name}
              onChange={(e) => setProject({ ...currentProject, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors shadow-2xs"
              required
            />
            <p className="text-[11px] text-slate-500">
              A descriptive working title for your product or hackathon repo.
            </p>
          </div>

          {/* Project Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="project-desc-input" className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                Project Description & Scope <span className="text-rose-500">*</span>
              </label>
              <span className={`text-[11px] font-mono ${
                currentProject.description.length < 20 ? 'text-amber-600' : 'text-slate-400'
              }`}>
                {currentProject.description.length} chars (min 20)
              </span>
            </div>
            <textarea
              id="project-desc-input"
              rows={4}
              placeholder="Detail the problem you are solving, core system architecture, key user flows, and technical requirements..."
              value={currentProject.description}
              onChange={(e) => setProject({ ...currentProject, description: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors shadow-2xs leading-relaxed"
              required
            />
            <p className="text-[11px] text-slate-500">
              The more specific your architecture details, the better Gemini extracts frontend, backend, and domain roles.
            </p>
          </div>

          {/* Two-column Row: Domain & Team Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Domain */}
            <div className="space-y-1.5">
              <label htmlFor="project-domain-select" className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                Target Domain
              </label>
              <select
                id="project-domain-select"
                value={currentProject.domain}
                onChange={(e) => setProject({ ...currentProject, domain: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors shadow-2xs cursor-pointer"
              >
                {DOMAIN_OPTIONS.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">
                Helps Nexus prioritize candidates with matching sector background.
              </p>
            </div>

            {/* Team Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Target Team Size
                </label>
                <span className="text-xs font-mono font-bold text-indigo-700">
                  {currentProject.desiredTeamSize} Members
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[2, 3, 4, 5].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setProject({ ...currentProject, desiredTeamSize: size })}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      currentProject.desiredTeamSize === size
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {size} {size === 3 ? '★' : ''}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                Tip: 3 or 4 is the sweet spot for fast-moving hackathon teams.
              </p>
            </div>

          </div>

          {/* Existing Team Members (Optional) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
              Existing Team Members (Optional)
            </label>
            <p className="text-[11px] text-slate-500">
              Already have teammates? Enter their names/roles so Nexus matches complementary skills instead of duplicates.
            </p>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., Alex (Frontend Dev) or Myself"
                value={existingMemberInput}
                onChange={(e) => setExistingMemberInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddExistingMember();
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 shadow-2xs"
              />
              <button
                type="button"
                onClick={handleAddExistingMember}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Member</span>
              </button>
            </div>

            {currentProject.existingMembers && currentProject.existingMembers.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProject.existingMembers.map((m, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-medium"
                  >
                    <span>{m}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingMember(idx)}
                      className="text-indigo-400 hover:text-indigo-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Optional Preferred Skills */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
              Preferred Technologies & Tools (Optional)
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a technology or framework (e.g., LangChain, Docker)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => handleAddSkill()}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Quick Skill Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 mr-1 font-mono">Suggestions:</span>
              {POPULAR_SKILL_SUGGESTIONS.map((skill) => {
                const isSelected = (currentProject.optionalSkills || []).includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                    className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {skill} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>

            {/* Selected Skills Tags */}
            {currentProject.optionalSkills && currentProject.optionalSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentProject.optionalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Nexus uses Gemini to map architecture pillars before matching talent.
            </span>

            <button
              id="analyze-project-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-7 py-3 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLoading ? 'Analyzing Architecture...' : 'Analyze Architecture & Capabilities'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </form>

      {/* Multi-stage Professional Loading State */}
      {isLoading && (
        <div className="bg-white border border-indigo-200 rounded-xl p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in text-left">
          
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Gemini Intelligence Processing Brief
              </h3>
              <p className="text-xs text-slate-500">
                Applying structured prompt reasoning to extract balanced requirements
              </p>
            </div>
          </div>

          {/* 3 Progress Stages */}
          <div className="space-y-3">
            {analysisStages.map((stage, idx) => {
              const isCurrent = idx === analysisStage;
              const isPassed = idx < analysisStage;

              return (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                    isCurrent
                      ? 'bg-indigo-50/80 border-indigo-200'
                      : isPassed
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-slate-50 border-slate-200 opacity-50'
                  }`}
                >
                  <div className="mt-0.5">
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${
                      isCurrent ? 'text-indigo-900' : isPassed ? 'text-emerald-900' : 'text-slate-600'
                    }`}>
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Structured Analysis Results */}
      {analysis && !isLoading && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6 text-left animate-in fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Architecture Requirements Verified</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {analysis.project_title || currentProject.name}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Domain: {analysis.domain_category || currentProject.domain}
              </span>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                Complexity: {analysis.complexity_level}
              </span>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Technical Architectural Summary
            </span>
            <p className="text-slate-700 leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* Required Capabilities Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Extracted Capabilities Required ({analysis.required_capabilities.length})
              </h3>
              <span className="text-[11px] text-slate-400">
                Targeting zero redundancy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.required_capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {cap.name}
                      </h4>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 ${
                        cap.priority === 'critical'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : cap.priority === 'high'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cap.priority}
                      </span>
                    </div>
                    <span className="text-[10px] text-indigo-600 font-semibold font-mono block">
                      Category: {cap.category}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                  {cap.minLevel && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      Min Target Proficiency: {cap.minLevel}/5
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Proceed to Matching Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Ready to evaluate 16 candidate profiles against these requirements.
            </span>

            <button
              id="proceed-to-matching-btn"
              type="button"
              onClick={() => onProceedToMatching(
                currentProject, 
                analysis.required_capabilities, 
                currentProject.desiredTeamSize
              )}
              className="w-full sm:w-auto px-7 py-3 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Match Complementary Squad</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
