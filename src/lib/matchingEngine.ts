import {
  Profile,
  Project,
  RequiredCapability,
  CapabilityCoverageItem,
  TeamRecommendation,
  CandidateEvaluation,
  GapAnalysis
} from '../types/nexus';

export interface ScoredCandidate {
  profile: Profile;
  score: number;
  coveredCapabilities: string[];
  roleMatch: boolean;
  domainMatch: boolean;
  availabilityScore: number;
}

// Category matching heuristics
const CATEGORY_MAP: Record<string, string[]> = {
  'AI/ML': ['AI/ML', 'Data', 'Python', 'NLP', 'LLM', 'Machine Learning', 'PyTorch', 'LangChain', 'Gemini'],
  'Frontend': ['Frontend', 'UI/UX', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'CSS', 'JavaScript'],
  'Backend': ['Backend', 'Data', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Prisma', 'GraphQL', 'Go', 'Express', 'Redis'],
  'UI/UX': ['UI/UX', 'Product/Research', 'Figma', 'Design', 'User Research', 'Prototyping', 'Accessibility'],
  'DevOps/Cloud': ['DevOps/Cloud', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'CI/CD', 'Cloud'],
  'Data': ['Data', 'AI/ML', 'SQL', 'Python', 'ETL', 'Analytics', 'Pandas'],
  'Mobile': ['Mobile', 'Frontend', 'React Native', 'Flutter', 'iOS', 'Android'],
  'Product/Research': ['Product/Research', 'UI/UX', 'Product Management', 'Curriculum', 'UX Writing', 'Research']
};

export function scoreCandidate(
  profile: Profile,
  project: Project,
  capabilities: RequiredCapability[]
): ScoredCandidate {
  let skillPoints = 0;
  let maxPossibleSkillPoints = 0;
  const coveredCaps: string[] = [];

  const candidateSkillsText = profile.skills.map(s => `${s.name} ${s.category}`).join(' ').toLowerCase();
  const profileProjectsText = (profile.projects.join(' ') + ' ' + profile.bio + ' ' + profile.headline).toLowerCase();

  // 1. Skill Coverage & Strength (Weight ~50%)
  for (const cap of capabilities) {
    const weight = cap.priority === 'critical' ? 3 : cap.priority === 'high' ? 2 : 1;
    maxPossibleSkillPoints += weight * 5;

    // Check direct or category match
    const capNameLower = cap.name.toLowerCase();
    const capCat = cap.category;
    let bestLevel = 0;

    for (const skill of profile.skills) {
      const skillNameLower = skill.name.toLowerCase();
      // Exact or partial match
      if (
        skillNameLower.includes(capNameLower) ||
        capNameLower.includes(skillNameLower) ||
        (CATEGORY_MAP[capCat] && CATEGORY_MAP[capCat].some(k => skillNameLower.includes(k.toLowerCase()) || skill.category === capCat))
      ) {
        if (skill.level > bestLevel) {
          bestLevel = skill.level;
        }
      }
    }

    if (bestLevel > 0) {
      skillPoints += weight * bestLevel;
      coveredCaps.push(cap.name);
    }
  }

  const skillCoverageRatio = maxPossibleSkillPoints > 0 ? (skillPoints / maxPossibleSkillPoints) : 0.5;

  // 2. Domain & Project Interest Match (Weight ~20%)
  const domainWords = (project.domain + ' ' + project.name + ' ' + project.description)
    .toLowerCase()
    .split(/[\s,/-]+/)
    .filter(w => w.length > 3);
  
  let domainMatchesCount = 0;
  for (const interest of profile.interests) {
    const intLower = interest.toLowerCase();
    if (domainWords.some(dw => intLower.includes(dw) || dw.includes(intLower))) {
      domainMatchesCount += 2;
    }
  }
  if (domainWords.some(dw => candidateSkillsText.includes(dw) || profileProjectsText.includes(dw))) {
    domainMatchesCount += 1;
  }
  const domainScore = Math.min(100, domainMatchesCount * 25);

  // 3. Preferred Role Fit (Weight ~15%)
  const roleLower = profile.preferredRole.toLowerCase();
  const roleMatch = capabilities.some(c => 
    roleLower.includes(c.category.toLowerCase()) || 
    c.name.toLowerCase().includes(roleLower)
  );
  const roleScore = roleMatch ? 100 : 50;

  // 4. Availability & Weekly Hours (Weight ~15%)
  let availScore = 70;
  if (profile.weeklyHours >= 25 || profile.availability.toLowerCase().includes('hackathon')) {
    availScore = 100;
  } else if (profile.weeklyHours >= 20) {
    availScore = 90;
  } else if (profile.weeklyHours >= 15) {
    availScore = 80;
  }
  const availabilityScore = availScore;

  // Final Composite Score (0 - 100)
  const compositeScore = Math.round(
    skillCoverageRatio * 100 * 0.50 +
    domainScore * 0.20 +
    roleScore * 0.15 +
    availabilityScore * 0.15
  );

  return {
    profile,
    score: Math.min(99, Math.max(45, compositeScore)),
    coveredCapabilities: coveredCaps,
    roleMatch,
    domainMatch: domainScore > 40,
    availabilityScore
  };
}

export function computeCapabilityCoverage(
  selectedCandidates: Profile[],
  capabilities: RequiredCapability[]
): { coverageItems: CapabilityCoverageItem[]; readinessScore: number; criticalMissing: string; explanation: string; action: string } {
  const coverageItems: CapabilityCoverageItem[] = [];
  let totalScore = 0;

  for (const cap of capabilities) {
    const capNameLower = cap.name.toLowerCase();
    const capCat = cap.category;
    let maxSkillLevel = 0;
    const coveredBy: string[] = [];

    for (const member of selectedCandidates) {
      let memberContributed = false;
      for (const skill of member.skills) {
        const skillNameLower = skill.name.toLowerCase();
        if (
          skillNameLower.includes(capNameLower) ||
          capNameLower.includes(skillNameLower) ||
          (CATEGORY_MAP[capCat] && (CATEGORY_MAP[capCat].some(k => skillNameLower.includes(k.toLowerCase())) || skill.category === capCat))
        ) {
          if (skill.level > maxSkillLevel) {
            maxSkillLevel = skill.level;
          }
          memberContributed = true;
        }
      }
      if (memberContributed) {
        coveredBy.push(member.name);
      }
    }

    // Percentage: level 5 => 98%, level 4 => 90%, level 3 => 75%, level 2 => 45%, level 1 => 25%, 0 => 15%
    let percentage = 15;
    if (maxSkillLevel >= 5) percentage = 96;
    else if (maxSkillLevel === 4) percentage = 90;
    else if (maxSkillLevel === 3) percentage = 74;
    else if (maxSkillLevel === 2) percentage = 42;
    else if (maxSkillLevel === 1) percentage = 25;

    const status = percentage >= 80 ? 'covered' : percentage >= 50 ? 'partial' : 'missing';
    coverageItems.push({
      capability: cap.name,
      category: cap.category,
      coverage_percentage: percentage,
      status,
      covered_by: coveredBy.length > 0 ? coveredBy : ['None']
    });

    totalScore += percentage;
  }

  const averageReadiness = Math.round(totalScore / (capabilities.length || 1));

  // Find critical missing
  const missingCaps = coverageItems.filter(c => c.status === 'missing' || c.coverage_percentage < 50);
  let criticalMissing = 'Deployment / Cloud Infrastructure';
  let explanation = 'No selected team member has production cloud deployment (Docker/Kubernetes/AWS) experience.';
  let action = 'Recruit a cloud/deployment contributor or assign deployment ownership to the backend member.';

  if (missingCaps.length > 0) {
    criticalMissing = missingCaps[0].capability;
    explanation = `The selected team lacks dedicated experience in ${criticalMissing}. Coverage is currently at ${missingCaps[0].coverage_percentage}%.`;
    action = `Recruit a candidate specializing in ${missingCaps[0].category || criticalMissing}, or cross-train an adjacent team member.`;
  }

  return {
    coverageItems,
    readinessScore: averageReadiness,
    criticalMissing,
    explanation,
    action
  };
}

export function runDeterministicTeamMatching(
  profiles: Profile[],
  project: Project,
  capabilities: RequiredCapability[],
  teamSize: number = 3
): {
  recommendation: TeamRecommendation;
  evaluations: CandidateEvaluation[];
  gapAnalysis: GapAnalysis;
} {
  // Score all candidates
  const scored = profiles
    .filter(p => p.optInStatus)
    .map(p => scoreCandidate(p, project, capabilities))
    .sort((a, b) => b.score - a.score);

  // Combinatorial greedy selection for high complementarity and low redundancy
  const selected: Profile[] = [];
  const selectedCandidateIds: string[] = [];
  const coveredSet = new Set<string>();

  // Iteratively pick candidates who cover the most remaining capabilities while having high score
  const remaining = [...scored];

  while (selected.length < teamSize && remaining.length > 0) {
    let bestCandidateIdx = 0;
    let bestMarginalValue = -1;

    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i];
      // Count newly covered capabilities
      const newCoverage = candidate.coveredCapabilities.filter(c => !coveredSet.has(c)).length;
      // Redundancy penalty if candidate only covers what is already covered
      const redundantCoverage = candidate.coveredCapabilities.filter(c => coveredSet.has(c)).length;
      
      const marginalValue = (candidate.score * 0.4) + (newCoverage * 30) - (redundantCoverage * 5);

      if (marginalValue > bestMarginalValue) {
        bestMarginalValue = marginalValue;
        bestCandidateIdx = i;
      }
    }

    const chosen = remaining.splice(bestCandidateIdx, 1)[0];
    selected.push(chosen.profile);
    selectedCandidateIds.push(chosen.profile.id);
    chosen.coveredCapabilities.forEach(c => coveredSet.add(c));
  }

  // Compute coverage & gap
  const coverageResult = computeCapabilityCoverage(selected, capabilities);

  // Complementarity calculation
  // How well do roles diversify without 100% overlap
  const roleCategories = new Set(selected.map(s => s.skills[0]?.category || s.preferredRole));
  const complementarityScore = Math.min(98, Math.max(70, Math.round((roleCategories.size / selected.length) * 95)));

  const redundancyLevel = complementarityScore >= 85 ? 'Very Low (Optimal)' : complementarityScore >= 70 ? 'Low' : 'Moderate';

  // Role distribution
  const roleMap: Record<string, number> = {};
  selected.forEach(s => {
    roleMap[s.preferredRole] = (roleMap[s.preferredRole] || 0) + 1;
  });
  const role_distribution = Object.entries(roleMap).map(([role, count]) => ({ role, count }));

  // Candidate evaluations
  const evaluations: CandidateEvaluation[] = selected.map(candidate => {
    const candidateScoreObj = scored.find(s => s.profile.id === candidate.id);
    const detScore = candidateScoreObj ? candidateScoreObj.score : 88;

    const topSkills = candidate.skills.slice(0, 3).map(s => `${s.name} (${s.level}/5)`);
    const assignedTasks = [
      `Lead ${candidate.skills[0]?.name || 'technical'} implementation and core modules`,
      `Collaborate on integration with ${selected.filter(o => o.id !== candidate.id).map(o => o.name.split(' ')[0]).join(' and ')}`,
      `Review code & enforce standards for ${candidate.skills[0]?.category || 'architecture'}`
    ];

    return {
      candidate_id: candidate.id,
      name: candidate.name,
      primary_role: candidate.preferredRole,
      match_confidence: detScore,
      deterministic_score: detScore,
      assigned_tasks: assignedTasks,
      strengths_brought: [
        ...topSkills,
        `Experience: ${candidate.experience}`,
        `Availability: ${candidate.availability}`
      ],
      why_selected: `${candidate.name} was selected because their skills in ${topSkills.slice(0, 2).join(', ')} fulfill key project requirements with strong role alignment and proven project experience.`,
      why_me: {
        skillFit: `Your skills in ${topSkills.join(', ')} directly address high-priority project technical pillars.`,
        domainInterest: `Your background and interests in ${candidate.interests.slice(0, 2).join(', ')} match this project's vision.`,
        teamComplement: `You fulfill unique capabilities without duplicating other members' core focus areas.`,
        availabilityFit: `Your availability of ${candidate.availability} provides sufficient dedicated capacity for hackathon milestones.`
      }
    };
  });

  const recommendation: TeamRecommendation = {
    selected_candidate_ids: selectedCandidateIds,
    selected_candidates: selected,
    team_fit_score: Math.min(99, Math.round((coverageResult.readinessScore * 0.6) + (complementarityScore * 0.4))),
    selection_reason: `${selected.map(s => s.name.split(' ')[0]).join(', ')} form a balanced unit. Each member owns a distinct capability pillar with low redundancy and high domain complementarity.`,
    complementarity_score: complementarityScore,
    redundancy_level: redundancyLevel,
    role_distribution
  };

  const gapAnalysis: GapAnalysis = {
    readiness_score: coverageResult.readinessScore,
    capability_coverage: coverageResult.coverageItems,
    critical_missing_capability: coverageResult.criticalMissing,
    missing_capability_explanation: coverageResult.explanation,
    recommended_action: coverageResult.action,
    missing_skills: [
      'Cloud Deployment & Infrastructure',
      'Container Orchestration (Docker / Kubernetes)',
      'Automated CI/CD Workflows'
    ],
    critical_risks: [
      'Deployment bottleneck during demo day if backend lead must configure cloud servers manually.',
      'Potential environment parity issues between local dev and live staging.'
    ],
    suggested_recruits: [
      'DevOps / Cloud Engineer (e.g. Priya Patel)',
      'Or streamline by adopting serverless deployment providers (Vercel, Supabase).'
    ]
  };

  return {
    recommendation,
    evaluations,
    gapAnalysis
  };
}
