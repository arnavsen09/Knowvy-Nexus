import React from 'react';
import { Shield, GitBranch, Terminal, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-12 mt-16 text-slate-500 text-xs text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Layers className="w-4 h-4 stroke-[2.4]" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-base">
                  Knowvy Nexus
                </span>
                <span className="ml-2 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  v2.4
                </span>
              </div>
            </div>
            <p className="text-slate-600 max-w-md leading-relaxed text-xs">
              “Build the right team, not just a bigger team.” A project-to-team intelligence platform for hackathons, incubators, and engineering collectives. Combines deterministic synergy scoring with Gemini 3.8 capability analysis.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <Shield className="w-3.5 h-3.5 text-indigo-600" /> Server-Side Gemini API
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <GitBranch className="w-3.5 h-3.5 text-purple-600" /> Zero Redundancy Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                <Terminal className="w-3.5 h-3.5 text-cyan-600" /> Hackathon Edition
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Capabilities</h4>
            <ul className="space-y-2 text-slate-600">
              <li>Project-First Capability Extraction</li>
              <li>Complementary Skill Matching</li>
              <li>Anti-Redundancy Penalty Scorer</li>
              <li>Team Gap & Readiness Forensics</li>
              <li>5-Phase Delivery Workspace</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-xs uppercase tracking-wider">Architecture</h4>
            <ul className="space-y-2 text-slate-600">
              <li>16 Active Builder Profiles</li>
              <li>Mathematical Capability Matrix</li>
              <li>Transparent "Why Me" Explanations</li>
              <li>Zero Client-Side Secret Exposure</li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Knowvy Nexus. Engineered for Hackathon & Team Formation Excellence.</p>
          <p className="font-semibold text-indigo-900">Build the right team, not just a bigger team.</p>
        </div>
      </div>
    </footer>
  );
};
