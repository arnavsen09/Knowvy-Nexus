import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Clock, 
  CheckCircle, 
  ShieldCheck,
  X,
  ExternalLink,
  Code2,
  FolderGit2,
  Sparkles,
  Layers,
  Award,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Profile } from '../types/nexus';

interface CommunityViewProps {
  profiles: Profile[];
  onSelectCandidate?: (profile: Profile) => void;
  onNavigateToProject?: () => void;
}

const DOMAIN_INTEREST_FILTERS = [
  'All Domains',
  'EdTech',
  'Generative AI',
  'Developer Tooling',
  'Systems',
  'FinTech',
  'BioTech',
  'Accessibility'
];

const ROLE_FILTERS = [
  'All Roles',
  'AI / ML',
  'Frontend',
  'Backend',
  'UI/UX',
  'DevOps/Cloud',
  'Product/Research'
];

export const CommunityView: React.FC<CommunityViewProps> = ({ 
  profiles,
  onSelectCandidate,
  onNavigateToProject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All Roles');
  const [selectedDomain, setSelectedDomain] = useState<string>('All Domains');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        p.name.toLowerCase().includes(query) ||
        p.headline.toLowerCase().includes(query) ||
        p.bio.toLowerCase().includes(query) ||
        p.skills.some((s) => s.name.toLowerCase().includes(query)) ||
        p.interests.some((i) => i.toLowerCase().includes(query)) ||
        p.projects.some((proj) => proj.toLowerCase().includes(query));

      const matchesRole =
        selectedRole === 'All Roles' ||
        p.preferredRole.toLowerCase().includes(selectedRole.toLowerCase().replace(' / ', '')) ||
        p.skills.some((s) => s.category.toLowerCase().includes(selectedRole.toLowerCase().replace(' / ', '')));

      const matchesDomain =
        selectedDomain === 'All Domains' ||
        p.interests.some((i) => i.toLowerCase().includes(selectedDomain.toLowerCase()));

      return matchesSearch && matchesRole && matchesDomain;
    });
  }, [profiles, searchQuery, selectedRole, selectedDomain]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Platform Info Banner */}
      <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong className="text-slate-900">Builder Directory:</strong> 16 verified profiles evaluated by Nexus for capability matching, non-redundancy, and sprint availability.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-mono border border-emerald-200">
            100% Opt-In Active
          </span>
        </div>
      </div>

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-1.5">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Community Pool ({filteredProfiles.length} Builders Available)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Discover Builders & Collaborators
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-1">
            Engineers, designers, AI researchers, and systems developers who build real products and hackathon MVPs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="community-search-input"
            placeholder="Search by skill, framework, or interest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors shadow-2xs"
          />
        </div>
      </div>

      {/* Filter Controls: Roles and Domains */}
      <div className="space-y-2 text-left">
        
        {/* Role Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Role:
          </span>
          {ROLE_FILTERS.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                selectedRole === role
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Domain Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Domain:
          </span>
          {DOMAIN_INTEREST_FILTERS.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                selectedDomain === domain
                  ? 'bg-purple-600 text-white border-purple-600 shadow-2xs font-semibold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

      </div>

      {/* Profiles Grid */}
      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => setSelectedProfile(profile)}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative"
            >
              {/* Card Top: Avatar, Name, Primary Role, Opt-In Status */}
              <div className="space-y-3">
                
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 group-hover:ring-2 group-hover:ring-indigo-500/20 transition-all"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {profile.name}
                      </h3>
                      <p className="text-xs font-semibold text-indigo-600">
                        {profile.preferredRole}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {profile.location || 'Remote'} • {profile.timezone || 'UTC'}
                      </span>
                    </div>
                  </div>

                  {/* Opt-in status badge */}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>

                {/* Headline / Bio */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {profile.headline || profile.bio}
                </p>

                {/* Top Skills with Visual Level Indicators */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Core Technical Strengths
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200/80 text-slate-700 text-[11px] font-mono"
                      >
                        <span>{skill.name}</span>
                        <span className="text-indigo-600 font-bold">L{skill.level}</span>
                      </span>
                    ))}
                    {profile.skills.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
                        +{profile.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Projects Built */}
                {profile.projects && profile.projects.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3" /> Built Projects:
                    </span>
                    <p className="text-[11px] text-slate-700 font-medium truncate">
                      {profile.projects.join(' • ')}
                    </p>
                  </div>
                )}

                {/* Interests */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Domain Interests
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {profile.interests.slice(0, 3).map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-medium border border-purple-100"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Bottom: Availability & View Details */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px]">{profile.availability}</span>
                </div>
                <span className="text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold text-[11px]">
                  View Profile <ArrowRight className="w-3 h-3" />
                </span>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-xl space-y-3">
          <Users className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Builders Match Criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, role filters, or domain interests to explore more candidates.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRole('All Roles');
              setSelectedDomain('All Domains');
            }}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Candidate Deep-Dive Modal */}
      {selectedProfile && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedProfile(null)}
        >
          <div 
            className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl p-6 sm:p-7 space-y-6 text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={selectedProfile.avatar}
                  alt={selectedProfile.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{selectedProfile.name}</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Opt-In Active
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                    {selectedProfile.preferredRole}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedProfile.location} • {selectedProfile.timezone}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProfile(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bio & Experience */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Background & Experience
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedProfile.bio}
              </p>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <strong className="text-slate-800">Track Record:</strong> {selectedProfile.experience}
              </div>
            </div>

            {/* Complete Skills Matrix */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Full Capability Matrix (1 = Beginner, 5 = Expert)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedProfile.skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 block truncate">{skill.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{skill.category}</span>
                    </div>
                    <span className="w-6 h-6 rounded bg-indigo-50 text-indigo-700 font-mono font-bold text-[11px] flex items-center justify-center border border-indigo-100">
                      L{skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects & Interests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Shipped Projects
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  {selectedProfile.projects.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Sprint Availability
                </h4>
                <div className="p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{selectedProfile.availability}</span>
                  </div>
                  <p className="text-[11px] text-indigo-700">
                    Ready to participate in project matching and sprint milestone execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProfile(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProfile(null);
                  if (onNavigateToProject) {
                    onNavigateToProject();
                  }
                }}
                className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Match With This Profile</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
