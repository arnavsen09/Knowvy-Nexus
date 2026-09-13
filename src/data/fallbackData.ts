import { MatchResponsePayload } from '../types/nexus';
import { DEMO_PROFILES } from './mockProfiles';

const arnav = DEMO_PROFILES.find(p => p.id === 'user-01')!;
const rahul = DEMO_PROFILES.find(p => p.id === 'user-02')!;
const sara = DEMO_PROFILES.find(p => p.id === 'user-03')!;

export const FALLBACK_MATCH_RESULT: MatchResponsePayload = {
  mode: 'fallback',
  analysis: {
    project_title: 'AI-Powered Student Learning Gap Identifier',
    domain_category: 'EdTech / Adaptive AI Learning',
    complexity_level: 'High',
    summary: 'An intelligent educational platform that diagnoses student conceptual misconceptions in STEM subjects through interactive diagnostic tasks, constructs adaptive knowledge graphs, and synthesizes step-by-step remediation micro-lessons.',
    required_capabilities: [
      {
        name: 'LLM & Adaptive Prompt Engineering',
        category: 'AI/ML',
        priority: 'critical',
        description: 'Generating diagnostic probes and pedagogical remediation paths tailored to student comprehension levels.',
        minLevel: 4
      },
      {
        name: 'Interactive Frontend & Student Dashboard',
        category: 'Frontend',
        priority: 'critical',
        description: 'Engaging, low-friction student interface featuring instant feedback, question flows, and visual progress tracking.',
        minLevel: 4
      },
      {
        name: 'Scalable Backend & Knowledge Graph Storage',
        category: 'Backend',
        priority: 'high',
        description: 'Secure student performance logging, prerequisite graph traversal, and high-performance API endpoints.',
        minLevel: 4
      },
      {
        name: 'K-12 User Research & Cognitive UX',
        category: 'UI/UX',
        priority: 'high',
        description: 'Interface design minimizing cognitive fatigue and test anxiety for high-school students.',
        minLevel: 4
      },
      {
        name: 'Production Cloud Deployment & CI/CD',
        category: 'DevOps/Cloud',
        priority: 'medium',
        description: 'Containerized deployment, cloud infrastructure scaling, and automated testing pipelines.',
        minLevel: 3
      }
    ],
    key_deliverables: [
      'Interactive Student Diagnostic Web App',
      'Gemini-powered Misconception Diagnosis Engine',
      'Prerequisite Skill Graph & Task Recommender',
      'Student Progress & Confidence Dashboard'
    ]
  },
  teamRecommendation: {
    selected_candidate_ids: ['user-01', 'user-02', 'user-03'],
    selected_candidates: [arnav, rahul, sara],
    team_fit_score: 93,
    selection_reason: 'Arnav covers AI and frontend, Rahul fills the backend and database architecture gap, and Sara contributes cognitive UX and education research. The team has strong capability coverage across all primary project pillars with exceptionally low skill redundancy.',
    complementarity_score: 95,
    redundancy_level: 'Very Low (Optimal)',
    role_distribution: [
      { role: 'AI & Frontend Lead', count: 1 },
      { role: 'Backend & Data Lead', count: 1 },
      { role: 'UI/UX & Education Research', count: 1 }
    ]
  },
  candidateEvaluations: [
    {
      candidate_id: 'user-01',
      name: 'Arnav Sen',
      primary_role: 'AI & Frontend Lead',
      match_confidence: 96,
      deterministic_score: 94,
      assigned_tasks: [
        'Design Gemini prompt architecture for misconception identification',
        'Build responsive React diagnostic interactive components',
        'Implement client-side state machine for quiz flows and instant hints'
      ],
      strengths_brought: [
        'Deep Gemini API & LangChain integration experience',
        'Solid React/TypeScript and Tailwind craft',
        'Demonstrated track record in adaptive learning tools (CogniFlow)'
      ],
      why_selected: 'Arnav bridges the gap between sophisticated generative AI pipelines and fluid user interfaces, single-handedly fulfilling the two highest priority project requirements.',
      why_me: {
        skillFit: 'Your 5/5 Python & Gemini API mastery directly covers the highest priority requirement (LLM & Adaptive Prompt Engineering), while your React expertise ensures rapid UI integration.',
        domainInterest: 'Your stated passion for "Adaptive Education" and "Human-AI Interaction" perfectly aligns with this EdTech project vision.',
        teamComplement: 'You free Rahul to focus exclusively on scalable database schemas and security, while pairing seamlessly with Sara\'s Figma designs.',
        availabilityFit: 'Your 25 hrs/week hackathon-ready schedule guarantees high velocity during critical AI prototyping sprints.'
      }
    },
    {
      candidate_id: 'user-02',
      name: 'Rahul Varma',
      primary_role: 'Backend Architect',
      match_confidence: 92,
      deterministic_score: 90,
      assigned_tasks: [
        'Architect relational schema for student attempt history & skill prerequisites in PostgreSQL',
        'Build high-performance REST APIs with Node.js and FastAPI',
        'Implement caching layer with Redis for sub-50ms recommendation lookups'
      ],
      strengths_brought: [
        'Battle-tested database schema design (5/5 PostgreSQL & Prisma)',
        'Experience with high-throughput API architectures (50k QPS background)',
        '3x hackathon backend track record ensuring reliable shipping'
      ],
      why_selected: 'Rahul provides rock-solid backend infrastructure and database modeling that ensures student diagnostic data is logged reliably and fetched with low latency.',
      why_me: {
        skillFit: 'Your 5/5 PostgreSQL and Node.js expertise fulfills the critical Scalable Backend and Data Storage requirement.',
        domainInterest: 'You listed "Student productivity platforms" and "Data modeling" as core passions, bringing domain context to data structures.',
        teamComplement: 'Neither Arnav nor Sara specializes in complex data integrity or schema migrations; your presence eliminates any backend bottleneck.',
        availabilityFit: 'Your 20 hrs/week evening/weekend availability provides dedicated backend support alongside frontend sprints.'
      }
    },
    {
      candidate_id: 'user-03',
      name: 'Sara Lindqvist',
      primary_role: 'UI/UX & Education Research',
      match_confidence: 91,
      deterministic_score: 89,
      assigned_tasks: [
        'Conduct cognitive load audit of high-school diagnostic questionnaire',
        'Create high-fidelity Figma prototype and interactive component design system',
        'Design supportive visual feedback mechanisms to alleviate student math anxiety'
      ],
      strengths_brought: [
        'Direct experience interviewing 80+ high schoolers on learning anxiety',
        'Exceptional information architecture and Figma prototyping (5/5)',
        'Cognitive science background optimizing learning retention'
      ],
      why_selected: 'Sara transforms a complex technical AI diagnostic into a welcoming, encouraging learning environment tailored specifically to adolescents.',
      why_me: {
        skillFit: 'Your 5/5 Figma design and Cognitive Science research background ensure the product genuinely solves high school test anxiety.',
        domainInterest: 'Your deep commitment to "K-12 Education" and "Cognitive Load Reduction" ensures pedagogical validity.',
        teamComplement: 'You bring qualitative human-centered design to balance Arnav and Rahul\'s technical engineering strengths.',
        availabilityFit: 'Your 20 hrs/week flexible schedule enables iterative design sprints and rapid prototype testing.'
      }
    }
  ],
  gapAnalysis: {
    readiness_score: 93,
    critical_missing_capability: 'Deployment / Cloud Infrastructure',
    missing_capability_explanation: 'No selected team member has strong production cloud deployment (Docker / Kubernetes / AWS) experience. Arnav and Sara have minimal deployment background, while Rahul has only introductory Docker exposure.',
    recommended_action: 'Recruit a cloud/deployment contributor (e.g., Priya Patel) from the community pool, or assign deployment ownership to Rahul Varma using automated platforms like Vercel / Railway to bypass infrastructure complexity.',
    capability_coverage: [
      {
        capability: 'AI / LLM Intelligence',
        category: 'AI/ML',
        coverage_percentage: 96,
        status: 'covered',
        covered_by: ['Arnav Sen']
      },
      {
        capability: 'Frontend & Interactive UI',
        category: 'Frontend',
        coverage_percentage: 90,
        status: 'covered',
        covered_by: ['Arnav Sen', 'Sara Lindqvist']
      },
      {
        capability: 'Backend & Data Schema',
        category: 'Backend',
        coverage_percentage: 92,
        status: 'covered',
        covered_by: ['Rahul Varma']
      },
      {
        capability: 'UI/UX & Student Research',
        category: 'UI/UX',
        coverage_percentage: 95,
        status: 'covered',
        covered_by: ['Sara Lindqvist']
      },
      {
        capability: 'Deployment & Cloud Infrastructure',
        category: 'DevOps/Cloud',
        coverage_percentage: 28,
        status: 'missing',
        covered_by: ['Rahul Varma (Basic Docker)']
      }
    ],
    missing_skills: [
      'AWS / GCP Cloud Provisioning',
      'Container Orchestration (Docker / Kubernetes)',
      'Automated CI/CD Pipeline Configuration'
    ],
    critical_risks: [
      'Risk of demo deployment failures or cold start delays during live presentation without dedicated DevOps configuration.',
      'Potential bottleneck if backend developer gets consumed by hosting and environment configuration rather than core APIs.'
    ],
    suggested_recruits: [
      'Cloud / DevOps Engineer (e.g. Priya Patel) to configure zero-downtime deployment pipelines.',
      'Alternative: Adopt zero-config platforms (Vercel + Supabase) to mitigate operational risk.'
    ]
  },
  roadmap: {
    project_title: 'AI-Powered Student Learning Gap Identifier',
    total_phases: 5,
    summary: 'A streamlined 5-phase execution plan designed for rapid hackathon delivery, clearly delineating ownership between AI, Backend, and UX.',
    phases: [
      {
        phase: 'Phase 1 — Architecture & Pedagogical Scaffolding',
        milestone: 'Prerequisite Graph & Diagnostic Schema Defined',
        owner_role: 'All Leads (Sara / Rahul / Arnav)',
        focus_area: 'System Specification & User Journey',
        deliverables: [
          'Sara: High-school student user flow and wireframe prototypes in Figma',
          'Rahul: PostgreSQL entity relationship diagram (Students, Skills, Questions, Diagnoses)',
          'Arnav: Gemini prompt templates for extracting misconception patterns from student answers'
        ],
        risk_mitigation: 'Lock schema early to prevent frontend/backend integration churn.'
      },
      {
        phase: 'Phase 2 — Backend & AI Pipeline Implementation',
        milestone: 'Functional API Endpoints & Evaluation Engine Working',
        owner_role: 'Backend (Rahul) & AI Lead (Arnav)',
        focus_area: 'Core Intelligence & Data Persistence',
        deliverables: [
          'Rahul: FastAPI/Node endpoints for submitting attempts and retrieving recommendations',
          'Arnav: Multi-step Gemini structured inference chain with JSON schema validation',
          'Sara: Design system tokens, illustration guidelines, and micro-copy for praise/remediation'
        ],
        risk_mitigation: 'Implement prompt caching and deterministic fallback responses for API latency spikes.'
      },
      {
        phase: 'Phase 3 — Interactive Frontend & Component Integration',
        milestone: 'Interactive Diagnostic Flow & Adaptive Hinting Live',
        owner_role: 'Frontend (Arnav) & UX (Sara)',
        focus_area: 'Student Experience & Feedback Loops',
        deliverables: [
          'Arnav: Build React quiz interface with step-by-step reasoning reveal and animations',
          'Sara: User test interactive prototype with student personas and refine copy tone',
          'Rahul: Implement Redis caching for instant response loading under 50ms'
        ],
        risk_mitigation: 'Verify keyboard accessibility and responsive layout across mobile and laptop viewports.'
      },
      {
        phase: 'Phase 4 — Gap Mitigation & Automated Deployment',
        milestone: 'Staging Environment Live on Vercel / Railway',
        owner_role: 'Backend (Rahul) assisted by DevOps Recruit / Automated Tooling',
        focus_area: 'Operational Reliability & CI/CD',
        deliverables: [
          'Rahul: Deploy containerized API on Railway/Vercel with automated GitHub Actions testing',
          'Arnav: Connect production frontend build to staging API with error boundaries',
          'Sara: Comprehensive end-to-end user testing & edge case verification'
        ],
        risk_mitigation: 'Address the identified deployment gap using managed zero-config cloud platforms to minimize overhead.'
      },
      {
        phase: 'Phase 5 — Testing, Polish & Hackathon Demo Pitch',
        milestone: 'Polished Live Product & Impactful Presentation',
        owner_role: 'Sara (Demo Narrative) & Arnav/Rahul (Live Stability)',
        focus_area: 'Presentation & Live Demo Validation',
        deliverables: [
          'Sara: Pitch deck emphasizing student impact, cognitive science foundation, and live walkthrough',
          'Arnav & Rahul: Seed realistic student diagnostic profiles showing dramatic learning progression',
          'Team: Conduct 3 dry-run demos ensuring zero API flakiness or UI glitches'
        ],
        risk_mitigation: 'Prepare offline fallback demonstration mode to guarantee a flawless live presentation under any network condition.'
      }
    ]
  }
};
