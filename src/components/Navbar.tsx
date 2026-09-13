import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  Menu, 
  X, 
  Layers, 
  Users, 
  PlusCircle, 
  HelpCircle,
  Activity,
  ArrowRight
} from 'lucide-react';

export type NavView = 'landing' | 'project' | 'community' | 'match' | 'team' | 'plan';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView, sectionId?: string) => void;
  onTriggerDemo: () => void;
  hasMatchResult: boolean;
  isAiActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onTriggerDemo,
  hasMatchResult,
  isAiActive
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: NavView, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
    if (sectionId && view === 'landing') {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo + Brand Name */}
          <div className="flex items-center gap-6">
            <button 
              id="brand-home-btn"
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
              title="Knowvy Nexus Home"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:bg-indigo-700 transition-colors">
                <Layers className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 tracking-tight text-base group-hover:text-indigo-600 transition-colors">
                    Knowvy Nexus
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                    Platform
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 hidden md:block font-normal">
                  Build the right team, not just a bigger team.
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
              <button
                id="nav-link-home"
                onClick={() => handleNavClick('landing')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentView === 'landing'
                    ? 'text-indigo-600 font-semibold bg-indigo-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Home
              </button>

              <button
                id="nav-link-build-team"
                onClick={() => handleNavClick('project')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentView === 'project'
                    ? 'text-indigo-600 font-semibold bg-indigo-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Build a Team
              </button>

              <button
                id="nav-link-community"
                onClick={() => handleNavClick('community')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentView === 'community'
                    ? 'text-indigo-600 font-semibold bg-indigo-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Community
              </button>

              <button
                id="nav-link-how-it-works"
                onClick={() => handleNavClick('landing', 'how-nexus-works')}
                className="px-3 py-1.5 rounded-md hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-slate-600"
              >
                How It Works
              </button>

              {/* Active Workspace Indicators if a team was matched */}
              {hasMatchResult && (
                <div className="flex items-center gap-1 pl-2 ml-2 border-l border-slate-200">
                  <button
                    id="nav-link-recommended-squad"
                    onClick={() => handleNavClick('match')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      currentView === 'match'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                    }`}
                  >
                    Matched Squad
                  </button>
                  <button
                    id="nav-link-readiness-gaps"
                    onClick={() => handleNavClick('team')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      currentView === 'team'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Gap Analysis
                  </button>
                  <button
                    id="nav-link-execution-plan"
                    onClick={() => handleNavClick('plan')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      currentView === 'plan'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Roadmap
                  </button>
                </div>
              )}
            </nav>
          </div>

          {/* Right Side: Gemini Status Indicator & CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Subtle, Professional Gemini Indicator */}
            <div 
              className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100/90 border border-slate-200 text-xs text-slate-700"
              title={isAiActive ? 'Connected to Google Gemini 3.8 Flash' : 'Deterministic offline mode'}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isAiActive ? 'bg-emerald-400' : 'bg-slate-400'
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isAiActive ? 'bg-emerald-500' : 'bg-slate-400'
                }`} />
              </span>
              <span className="font-mono text-[11px] font-medium text-slate-600">
                {isAiActive ? 'Gemini 3.8 Flash' : 'Demo Engine'}
              </span>
            </div>

            {/* Try Demo Button */}
            <button
              id="nav-try-demo-btn"
              type="button"
              onClick={onTriggerDemo}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
              title="Preload sample EdTech AI project with candidate evaluations"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Try Demo</span>
            </button>

            {/* Primary Action Button */}
            <button
              id="nav-primary-build-btn"
              type="button"
              onClick={() => handleNavClick('project')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Build a Team</span>
            </button>

          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="nav-try-demo-mobile-btn"
              type="button"
              onClick={onTriggerDemo}
              className="p-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              title="Try Demo"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            </button>

            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          
          {/* Gemini Status in Mobile Menu */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-medium">AI Intelligence Status</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className={`w-2 h-2 rounded-full ${isAiActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              <span>{isAiActive ? 'Gemini 3.8 Flash Online' : 'Deterministic Mode'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleNavClick('landing')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'landing' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('project')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'project' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Build a Team
            </button>

            <button
              onClick={() => handleNavClick('community')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentView === 'community' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Community Pool (16 Builders)
            </button>

            <button
              onClick={() => handleNavClick('landing', 'how-nexus-works')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              How It Works
            </button>
          </div>

          {hasMatchResult && (
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-3 tracking-wider">
                Current Matched Project
              </span>
              <button
                onClick={() => handleNavClick('match')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-700 hover:bg-indigo-50 flex items-center justify-between"
              >
                <span>Recommended Squad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleNavClick('team')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Team Gap Forensics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleNavClick('plan')}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Sprint Execution Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('project')}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Start Project Brief</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
