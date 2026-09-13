import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { DEMO_PROFILES } from './src/data/mockProfiles';
import { FALLBACK_MATCH_RESULT } from './src/data/fallbackData';
import { runDeterministicTeamMatching, scoreCandidate } from './src/lib/matchingEngine';
import { Project, RequiredCapability, Profile, ExecutionRoadmap } from './src/types/nexus';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI lazily with telemetry User-Agent header
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Error initializing GoogleGenAI:', err);
    return null;
  }
}

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

// Health check & environment status
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({
    status: 'ok',
    geminiConfigured: hasKey,
    profilesCount: DEMO_PROFILES.length,
    timestamp: new Date().toISOString(),
  });
});

// Community Profiles Endpoint
app.get('/api/profiles', (req, res) => {
  res.json({
    profiles: DEMO_PROFILES,
    count: DEMO_PROFILES.length,
  });
});

// 1. Analyze Project Endpoint
app.post('/api/analyze-project', async (req, res) => {
  const { name, description, domain, desiredTeamSize, optionalSkills } = req.body;

  if (!description || description.trim().length === 0) {
    return res.status(400).json({ error: 'Project description is required.' });
  }

  const ai = getGeminiClient();

  // If no API key is set, return intelligent deterministic fallback
  if (!ai) {
    console.log('Gemini API key not detected or placeholder. Using deterministic project analysis fallback.');
    return res.json({
      analysis: FALLBACK_MATCH_RESULT.analysis,
      mode: 'fallback',
      notice: 'Running in demo mode. Add GEMINI_API_KEY to activate live AI generation.'
    });
  }

  try {
    const prompt = `Analyze this project idea for team composition and technical capability extraction:
Project Name: ${name || 'Untitled Project'}
Domain: ${domain || 'General Tech'}
Desired Team Size: ${desiredTeamSize || 3}
User-Specified Skills: ${(optionalSkills || []).join(', ') || 'None specified'}
Project Description:
"""${description}"""

Extract:
1. Project title and verified domain category
2. Overall technical complexity level (Low, Moderate, High, Very High)
3. Concise 2-3 sentence project summary focusing on core architecture
4. 4 to 6 specific required capabilities. For each capability provide:
   - name (e.g., "LLM Reasoning & Prompt Pipeline", "Interactive React UI", "FastAPI & Relational Storage", "UI/UX & Education Research", "Cloud Deployment & CI/CD")
   - category (Choose one: Frontend, Backend, AI/ML, UI/UX, Data, DevOps/Cloud, Mobile, Product/Research)
   - priority (critical, high, medium, low)
   - description (what this person will actually own)
   - minLevel (integer 1 to 5)
5. 3 to 4 concrete key deliverables for a hackathon MVP.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            project_title: { type: Type.STRING },
            domain_category: { type: Type.STRING },
            complexity_level: { type: Type.STRING, enum: ['Low', 'Moderate', 'High', 'Very High'] },
            summary: { type: Type.STRING },
            required_capabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['critical', 'high', 'medium', 'low'] },
                  description: { type: Type.STRING },
                  minLevel: { type: Type.INTEGER }
                },
                required: ['name', 'category', 'priority', 'description']
              }
            },
            key_deliverables: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['project_title', 'domain_category', 'complexity_level', 'summary', 'required_capabilities']
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json({
      analysis: parsed,
      mode: 'gemini'
    });
  } catch (error: any) {
    console.error('Gemini analyze-project error:', error);
    // Graceful fallback to verified data
    return res.json({
      analysis: FALLBACK_MATCH_RESULT.analysis,
      mode: 'fallback',
      error: error.message || 'Gemini error encountered. Switched smoothly to fallback analysis.'
    });
  }
});

// 2. Match Team Endpoint (Deterministic Scoring + Gemini Reasoning)
app.post('/api/match-team', async (req, res) => {
  const { project, capabilities, teamSize = 3 } = req.body;

  if (!project || !capabilities || !Array.isArray(capabilities)) {
    return res.status(400).json({ error: 'Valid project and capabilities array required.' });
  }

  // Step 1: Run Deterministic Matching Engine
  const deterministicResult = runDeterministicTeamMatching(
    DEMO_PROFILES,
    project,
    capabilities,
    teamSize
  );

  const ai = getGeminiClient();

  // If no Gemini client, return deterministic result with structured templates
  if (!ai) {
    console.log('Gemini API key not found. Returning deterministic match with structured fallback reasoning.');
    // If project matches EdTech demo, return exact fallback match result
    if (project.name?.toLowerCase().includes('learning') || project.description?.toLowerCase().includes('student')) {
      return res.json(FALLBACK_MATCH_RESULT);
    }
    return res.json({
      analysis: {
        project_title: project.name,
        domain_category: project.domain,
        complexity_level: 'High',
        summary: project.description,
        required_capabilities: capabilities
      },
      teamRecommendation: deterministicResult.recommendation,
      candidateEvaluations: deterministicResult.evaluations,
      gapAnalysis: deterministicResult.gapAnalysis,
      mode: 'fallback'
    });
  }

  // Step 2: Use Gemini to generate deep contextual reasoning for the deterministic picks
  try {
    const selected = deterministicResult.recommendation.selected_candidates || [];
    const selectedSummary = selected.map(s => `
ID: ${s.id}
Name: ${s.name}
Role: ${s.preferredRole}
Skills: ${s.skills.map(k => `${k.name} (${k.level}/5)`).join(', ')}
Bio: ${s.bio}
Interests: ${s.interests.join(', ')}
Availability: ${s.availability}
`).join('\n---\n');

    const prompt = `You are the lead intelligence reasoning engine for Knowvy Nexus.
We have run a deterministic scoring engine that selected the following ${selected.length} candidates for this project:

PROJECT:
Name: ${project.name}
Domain: ${project.domain}
Description: ${project.description}

REQUIRED CAPABILITIES:
${capabilities.map((c: RequiredCapability) => `- [${c.priority.toUpperCase()}] ${c.name} (${c.category}): ${c.description}`).join('\n')}

SELECTED CANDIDATES (Determined by deterministic coverage & complementarity engine):
${selectedSummary}

DETERMINISTIC READINESS SCORE: ${deterministicResult.gapAnalysis.readiness_score}%
DETERMINISTIC COMPLEMENTARITY SCORE: ${deterministicResult.recommendation.complementarity_score}%

TASK:
Provide human-level reasoning, transparent "Why Me" explanations, and a critical gap analysis for this team composition.
Ensure you highlight:
1. An overall "Why this team?" explanation synthesizing how their specific skills complement each other with minimal redundancy.
2. For EACH candidate, a structured evaluation:
   - assigned_tasks (3 practical responsibilities)
   - strengths_brought (3 key strengths)
   - why_selected (1 concise paragraph)
   - why_me (skillFit, domainInterest, teamComplement, availabilityFit)
3. Gap Analysis:
   - critical_missing_capability (The most vulnerable skill not covered by this team, e.g. Deployment / Cloud Infrastructure or Mobile)
   - missing_capability_explanation (Why it is missing among these ${selected.length} people)
   - recommended_action (Concrete advice: recruit someone like Priya Patel, or use managed Vercel/Railway platforms)
   - missing_skills (list of 3 strings)
   - critical_risks (list of 2 strings)
   - suggested_recruits (list of 2 strings)
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            selection_reason: { type: Type.STRING },
            candidate_evaluations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  candidate_id: { type: Type.STRING },
                  assigned_tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                  strengths_brought: { type: Type.ARRAY, items: { type: Type.STRING } },
                  why_selected: { type: Type.STRING },
                  why_me: {
                    type: Type.OBJECT,
                    properties: {
                      skillFit: { type: Type.STRING },
                      domainInterest: { type: Type.STRING },
                      teamComplement: { type: Type.STRING },
                      availabilityFit: { type: Type.STRING }
                    },
                    required: ['skillFit', 'domainInterest', 'teamComplement', 'availabilityFit']
                  }
                },
                required: ['candidate_id', 'assigned_tasks', 'strengths_brought', 'why_selected', 'why_me']
              }
            },
            critical_missing_capability: { type: Type.STRING },
            missing_capability_explanation: { type: Type.STRING },
            recommended_action: { type: Type.STRING },
            missing_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            critical_risks: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggested_recruits: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: [
            'selection_reason',
            'candidate_evaluations',
            'critical_missing_capability',
            'missing_capability_explanation',
            'recommended_action',
            'missing_skills',
            'critical_risks',
            'suggested_recruits'
          ]
        }
      }
    });

    const geminiData = JSON.parse(response.text?.trim() || '{}');

    // Merge Gemini reasoning with deterministic scoring
    const mergedEvaluations = deterministicResult.evaluations.map(detEval => {
      const gEval = (geminiData.candidate_evaluations || []).find(
        (ge: any) => ge.candidate_id === detEval.candidate_id
      );
      if (gEval) {
        return {
          ...detEval,
          assigned_tasks: gEval.assigned_tasks || detEval.assigned_tasks,
          strengths_brought: gEval.strengths_brought || detEval.strengths_brought,
          why_selected: gEval.why_selected || detEval.why_selected,
          why_me: gEval.why_me || detEval.why_me
        };
      }
      return detEval;
    });

    const mergedGapAnalysis = {
      ...deterministicResult.gapAnalysis,
      critical_missing_capability: geminiData.critical_missing_capability || deterministicResult.gapAnalysis.critical_missing_capability,
      missing_capability_explanation: geminiData.missing_capability_explanation || deterministicResult.gapAnalysis.missing_capability_explanation,
      recommended_action: geminiData.recommended_action || deterministicResult.gapAnalysis.recommended_action,
      missing_skills: geminiData.missing_skills || deterministicResult.gapAnalysis.missing_skills,
      critical_risks: geminiData.critical_risks || deterministicResult.gapAnalysis.critical_risks,
      suggested_recruits: geminiData.suggested_recruits || deterministicResult.gapAnalysis.suggested_recruits
    };

    const mergedRecommendation = {
      ...deterministicResult.recommendation,
      selection_reason: geminiData.selection_reason || deterministicResult.recommendation.selection_reason
    };

    return res.json({
      analysis: {
        project_title: project.name,
        domain_category: project.domain,
        complexity_level: 'High',
        summary: project.description,
        required_capabilities: capabilities
      },
      teamRecommendation: mergedRecommendation,
      candidateEvaluations: mergedEvaluations,
      gapAnalysis: mergedGapAnalysis,
      mode: 'gemini'
    });
  } catch (err: any) {
    console.error('Error running Gemini team reasoning:', err);
    // Fall back to deterministic result
    return res.json({
      analysis: {
        project_title: project.name,
        domain_category: project.domain,
        complexity_level: 'High',
        summary: project.description,
        required_capabilities: capabilities
      },
      teamRecommendation: deterministicResult.recommendation,
      candidateEvaluations: deterministicResult.evaluations,
      gapAnalysis: deterministicResult.gapAnalysis,
      mode: 'fallback',
      notice: 'Gemini reasoning failed or timed out. Deterministic team match returned safely.'
    });
  }
});

// 3. Execution Roadmap Endpoint
app.post('/api/execution-roadmap', async (req, res) => {
  const { project, team, gapAnalysis } = req.body;

  if (!project || !team) {
    return res.status(400).json({ error: 'Project and Team information required.' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    console.log('Gemini API key not found. Returning fallback roadmap.');
    return res.json({
      roadmap: FALLBACK_MATCH_RESULT.roadmap,
      mode: 'fallback'
    });
  }

  try {
    const selectedMembers = team.selected_candidates || [];
    const membersText = selectedMembers.map((m: any) => `${m.name} (${m.preferredRole})`).join(', ');

    const prompt = `Create a realistic 5-phase hackathon / MVP execution roadmap for this project and team:
Project: ${project.name} (${project.domain})
Description: ${project.description}
Team: ${membersText || 'Multidisciplinary 3-person team'}
Identified Gap / Risk: ${gapAnalysis?.critical_missing_capability || 'Deployment / Cloud'} (${gapAnalysis?.recommended_action || 'Bypass with serverless/PaaS'})

Return 5 distinct chronological phases:
Phase 1: Architecture & Technical Foundations
Phase 2: Core Engine & Data Persistence
Phase 3: Interactive UI & Integration
Phase 4: Gap Mitigation & Staging Deployment
Phase 5: Testing, Polish & Demo Pitch

For each phase, specify:
- phase (e.g. "Phase 1 — Architecture & Technical Foundations")
- milestone (clear deliverable goal)
- owner_role (which team role takes primary ownership)
- focus_area (core theme of the sprint)
- deliverables (3 specific concrete items)
- risk_mitigation (1 practical risk tip)

Also provide an overall summary of the execution strategy.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            project_title: { type: Type.STRING },
            total_phases: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  milestone: { type: Type.STRING },
                  owner_role: { type: Type.STRING },
                  focus_area: { type: Type.STRING },
                  deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
                  risk_mitigation: { type: Type.STRING }
                },
                required: ['phase', 'milestone', 'owner_role', 'focus_area', 'deliverables']
              }
            }
          },
          required: ['project_title', 'total_phases', 'summary', 'phases']
        }
      }
    });

    const parsedRoadmap = JSON.parse(response.text?.trim() || '{}') as ExecutionRoadmap;
    return res.json({
      roadmap: parsedRoadmap,
      mode: 'gemini'
    });
  } catch (error: any) {
    console.error('Gemini execution roadmap error:', error);
    return res.json({
      roadmap: FALLBACK_MATCH_RESULT.roadmap,
      mode: 'fallback',
      error: error.message || 'Gemini error. Delivered verified fallback roadmap.'
    });
  }
});

// -------------------------------------------------------------
// Vite Middleware / Static Serving
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Knowvy Nexus] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
