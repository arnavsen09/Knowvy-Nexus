import React, { useState } from 'react';
import { 
  ArrowRight, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Zap, 
  AlertTriangle, 
  ShieldAlert, 
  Cpu, 
  Target, 
  Check, 
  Code2, 
  HelpCircle, 
  Clock, 
  Maximize2,
  X
} from 'lucide-react';
import { NavView } from './Navbar';
import concept1Img from '../assets/images/nexus_concept_1.jpg';
import concept2Img from '../assets/images/nexus_concept_2.jpg';

interface LandingViewProps {
  onNavigate: (view: NavView, sectionId?: string) => void;
  onTriggerDemo: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ 
  onNavigate, 
  onTriggerDemo
}) => {
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION: High-impact 2-column layout                     */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Subheadline & 3 CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/90 text-indigo-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI-powered project-to-team intelligence</span>
              </div>

              {/* Headline with visual emphasis on second line */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Build the right team, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
                  not just a bigger team.
                </span>
              </h1>

              {/* Clear, concise subheadline */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Turn a project idea into the right team — with AI-powered capability matching and gap analysis.
              </p>

              {/* 3 Clear CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-build-my-team-btn"
                  onClick={() => onNavigate('project')}
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Build My Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-try-demo-btn"
                  onClick={onTriggerDemo}
                  className="px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Try Demo</span>
                </button>

                <button
                  id="hero-explore-community-btn"
                  onClick={() => onNavigate('community')}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>Explore Community</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Zero skill duplication
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Deterministic capability engine
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Transparent "Why Me" reasoning
                </span>
              </div>

            </div>

            {/* Right Column: Interactive Visual Network Flow */}
            {/* Communicating: PROJECT -> REQUIRED SKILLS -> AI ANALYSIS -> 3 PEOPLE -> TEAM */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-3.5">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    Project-to-Team Pipeline
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Live Synthesis
                  </span>
                </div>

                {/* Node 1: PROJECT */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                      1. Project Input
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">EdTech AI Domain</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Adaptive Math Comprehension Diagnostician
                  </h4>
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center -my-1 text-slate-300">
                  <div className="w-0.5 h-3 bg-indigo-200" />
                </div>

                {/* Node 2: REQUIRED CAPABILITIES */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-violet-700 tracking-wider">
                      2. Required Capabilities
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Gemini Extraction</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[11px] font-medium">
                      LLM Reasoning Pipeline
                    </span>
                    <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-800 text-[11px] font-medium">
                      React UI / Mastery Heatmaps
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 text-[11px] font-medium">
                      FastAPI & Relational DB
                    </span>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center -my-1 text-slate-300">
                  <div className="w-0.5 h-3 bg-indigo-200" />
                </div>

                {/* Node 3: AI ANALYSIS & CANDIDATE MATCH */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-slate-50 border border-indigo-200 text-left space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      3. AI Complementary Match
                    </span>
                    <span className="text-[11px] font-mono font-bold text-indigo-700">
                      0% Redundancy
                    </span>
                  </div>

                  {/* 3 People Cards */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs text-center space-y-0.5">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold mx-auto flex items-center justify-center">
                        AS
                      </div>
                      <p className="text-[11px] font-bold text-slate-900 truncate">Arnav</p>
                      <p className="text-[9px] text-indigo-600 font-medium truncate">AI Lead</p>
                    </div>

                    <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs text-center space-y-0.5">
                      <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold mx-auto flex items-center justify-center">
                        RV
                      </div>
                      <p className="text-[11px] font-bold text-slate-900 truncate">Rahul</p>
                      <p className="text-[9px] text-purple-600 font-medium truncate">Backend</p>
                    </div>

                    <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs text-center space-y-0.5">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 text-[10px] font-bold mx-auto flex items-center justify-center">
                        SL
                      </div>
                      <p className="text-[11px] font-bold text-slate-900 truncate">Sara</p>
                      <p className="text-[9px] text-cyan-600 font-medium truncate">UI/UX Lead</p>
                    </div>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center -my-1 text-slate-300">
                  <div className="w-0.5 h-3 bg-indigo-200" />
                </div>

                {/* Node 4: TEAM OUTCOME */}
                <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                      4. Assembled Squad
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      High-Velocity Hackathon Unit
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black font-mono text-emerald-600">
                      93%
                    </span>
                    <span className="text-[10px] text-slate-500 block">Synergy</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: "How Nexus Works" (5 visual steps)                 */}
      {/* ------------------------------------------------------------- */}
      <section id="how-nexus-works" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Step-by-Step Architecture</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              How Nexus Works
            </h2>
            <p className="text-sm text-slate-600">
              From raw concept to balanced execution team in five deliberate intelligence stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 relative group hover:border-indigo-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Describe your project
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your problem statement, tech stack, domain constraints, and desired team size.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 relative group hover:border-indigo-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-violet-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Gemini extracts capabilities
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates architectural pillars, technical complexity, and maps critical skills required for MVP delivery.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 relative group hover:border-indigo-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Nexus finds complementary talent
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scans 16 active community builders. Maximizes capability coverage while penalizing redundant overlaps.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 relative group hover:border-indigo-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Nexus identifies skill gaps
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Audits team coverage against requirements. Pinpoints vulnerabilities (e.g. Cloud deployment) before building.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 relative group hover:border-indigo-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                05
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Generate execution roadmap
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Outputs an actionable 5-phase delivery plan with milestones, assigned leads, and risk mitigations.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: “Built Around Your Project” (Visual Comparison)   */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>Core Paradigm Shift</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Built Around Your Project
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Most networking platforms match people to generic opportunity boards. Nexus starts with the <strong className="text-slate-900">PROJECT</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Traditional Platform Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Traditional Matching
                </span>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  High Friction
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 text-center">
                Person → Opportunity
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Individuals search unstructured chat threads and Discord channels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Teams assemble with 3 frontend devs and zero backend or cloud capability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Duplicate efforts lead to hackathon burnout and abandoned repositories.</span>
                </li>
              </ul>
            </div>

            {/* Nexus Intelligent Matching Box */}
            <div className="p-6 rounded-2xl bg-white border-2 border-indigo-500/80 shadow-md space-y-4 text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase text-indigo-700 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Nexus Intelligence
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Complementary
                </span>
              </div>

              <div className="p-3 rounded-lg bg-indigo-50/80 border border-indigo-200 font-mono text-xs text-indigo-900 font-semibold text-center">
                Project → Skills → People → Team
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>The project requirements define the exact skill matrix required.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Deterministic engine selects complementary candidates with zero overlap.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pre-identifies unassigned dependencies (e.g. deployment) before coding.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: “Team Intelligence” (Interactive Capability Map)    */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Full-Stack Diagnostics</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Team Intelligence & Capability Map
            </h2>
            <p className="text-sm text-slate-600">
              Real-time audit displaying covered strengths, partial coverage, and critical missing dependencies.
            </p>
          </div>

          {/* Capability Map Display */}
          <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Adaptive Learning System — Capability Audit
                </h3>
                <p className="text-xs text-slate-500">
                  Evaluated across 3 assigned contributors
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Covered (80%+)
                </span>
                <span className="flex items-center gap-1.5 text-amber-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Partial (50–79%)
                </span>
                <span className="flex items-center gap-1.5 text-rose-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Missing (&lt;50%)
                </span>
              </div>
            </div>

            {/* Visual Capability Meters */}
            <div className="space-y-4">
              
              {/* 1. AI/LLM */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">AI / LLM Orchestration</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">Lead: Arnav Sen</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Covered • 95%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              {/* 2. Frontend */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Frontend / Interactive UI</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">Lead: Arnav Sen</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Covered • 90%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              {/* 3. Backend */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Backend API & Relational Modeling</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">Lead: Rahul Varma</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Covered • 88%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              {/* 4. UX / Research */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">UI/UX & Pedagogical Experience</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">Lead: Sara Lindqvist</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Covered • 85%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* 5. User Research */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">K-12 User Testing & Validation</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">Shared</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Partial • 55%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '55%' }} />
                </div>
              </div>

              {/* 6. Deployment / Cloud */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Cloud Infrastructure & CI/CD</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-rose-600 font-medium">Uncovered Vulnerability</span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      Missing • 20%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>

            </div>

            {/* Actionable Callout */}
            <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 flex items-start gap-3 text-xs text-slate-700">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">Pre-Hackathon Risk Detected:</strong> None of the 3 chosen members specialize in production cloud deployment. Nexus automatically recommends recruiting a DevOps contributor (e.g. Priya Patel) or adopting zero-config platforms like Vercel.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: “Why Me?” (Realistic Transparency Example)          */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Transparent Selection Intelligence</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Why Was Each Contributor Selected?
            </h2>
            <p className="text-sm text-slate-600">
              No black-box recommendations. Every team member receives an honest, data-backed "Why Me?" breakdown.
            </p>
          </div>

          {/* Example "Why Me" Card */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-left">
            
            {/* Candidate Identity Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  AS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">Arnav Sen</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      95% Match Fit
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600 font-semibold">Assigned: AI & Frontend Lead</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Perspective: Candidate View
              </span>
            </div>

            {/* Explanation Heading */}
            <div className="space-y-1">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Why you were selected for this project:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 italic">
                "You were matched because your LLM prompt evaluation workflows and React TypeScript skills directly solve the primary technical bottleneck of the EdTech diagnostic brief."
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1. Critical Technical Fit</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Your experience with Gemini API and agentic prompt chains covers the #1 critical capability required for student evaluation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-700">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>2. Domain Alignment</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Your past project CogniFlow and background in adaptive education directly matches the project's pedagogical domain.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>3. Team Complement</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  You own the frontend user experience without overlapping Rahul's backend SQL schemas, keeping team redundancy at 0%.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>4. Hackathon Availability</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Your active opt-in status and 25 hrs/week commitment matches the sprint velocity needed for demo day.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: FINAL CTA                                          */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Ready for your next hackathon or startup MVP?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Have an idea? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Build the team to make it real.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Input your requirements. Let Gemini analyze the architecture, match complementary community talent, and deliver an execution plan in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="final-cta-build-btn"
              onClick={() => onNavigate('project')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Build My Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="final-cta-demo-btn"
              onClick={onTriggerDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Try Demo Case Study</span>
            </button>
          </div>

        </div>
      </section>

      {/* Image Modal for Full View (Lifecycle Diagrams) */}
      {activeModalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveModalImage(null)}
        >
          <div 
            className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl space-y-4 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{activeModalImage.title}</h3>
                <p className="text-xs text-slate-500">{activeModalImage.desc}</p>
              </div>
              <button
                onClick={() => setActiveModalImage(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img 
                src={activeModalImage.src} 
                alt={activeModalImage.title} 
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-xs" 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
