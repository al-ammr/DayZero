import { PHASES, VIDEO_PHASES, MARKETING_PHASES, Phase, PROMPTS } from '../constants';

const ALL_PHASES: Phase[] = [...PHASES, ...VIDEO_PHASES, ...MARKETING_PHASES];

interface PhaseContext {
  track?: string;
  number?: string;
  title?: string;
  objective?: string;
  totalTasks?: number;
  completedCount?: number;
}

export function generateCurriculumGuidance(
  message: string,
  phaseInfo?: PhaseContext,
  history?: Array<{ role: string; text: string }>
): string {
  const query = message.toLowerCase().trim();
  
  // Find current phase if available
  let matchedPhase: Phase | undefined;
  if (phaseInfo?.number) {
    matchedPhase = ALL_PHASES.find(p => p.number === phaseInfo.number);
  }
  if (!matchedPhase && phaseInfo?.title) {
    matchedPhase = ALL_PHASES.find(p => 
      p.title.toLowerCase().includes(phaseInfo.title!.toLowerCase()) ||
      phaseInfo.title!.toLowerCase().includes(p.title.toLowerCase())
    );
  }
  // If still not matched, check if query references a phase number (e.g., "phase 1", "module 3")
  if (!matchedPhase) {
    const phaseMatch = query.match(/(?:phase|module)\s*(\d{1,2})/i);
    if (phaseMatch) {
      const numStr = phaseMatch[1].padStart(2, '0');
      matchedPhase = ALL_PHASES.find(p => p.number === numStr);
    }
  }

  // Fallback to Phase 01 if no phase specified
  const currentPhase = matchedPhase || PHASES[1];
  const track = phaseInfo?.track || 'AI Full-Stack Development';

  // 1. Monetization & Selling Strategy Query
  if (
    query.includes('monetiz') || 
    query.includes('price') || 
    query.includes('pricing') || 
    query.includes('client') || 
    query.includes('pitch') || 
    query.includes('sell') || 
    query.includes('earn') ||
    query.includes('how much') ||
    query.includes('where to find')
  ) {
    const selling = currentPhase.project.sellingStrategy;
    const deliverables = currentPhase.project.deliverables || [];

    return `### 💰 Monetization Strategy for Phase ${currentPhase.number}: ${currentPhase.title}

#### 1. Core Market Deliverables
${deliverables.map(d => `- **${d}**`).join('\n')}

#### 2. Benchmark Pricing & Structure
- **Recommended Price Point:** **${selling.pricing}**
- **Contract Terms:** 50% deposit upfront via Stripe Invoicing, 50% upon final acceptance and handover.
- **Delivery Timeline:** 3 to 5 business days per project.

#### 3. Where to Find High-Intent Clients
${selling.whereToFind.map(ch => `- **${ch}**`).join('\n')}

#### 4. Battle-Tested Outreach Pitch
\`\`\`text
${selling.pitch}
\`\`\`

#### 5. Pro Execution Tip
> **Do not sell the technology; sell the business outcome.** Clients do not buy "FastAPI endpoints with LangChain"; they buy "a 24/7 lead qualification bot that stops customer loss and books 15 more appointments per month".

---
*💡 **Notice**: Answered via DayZero Curriculum Intelligence. Add a valid Gemini API key in **Settings > Secrets** for customized live generative streaming.*`;
  }

  // 2. Actionable Sprint Plan / Next Steps Query
  if (
    query.includes('step') || 
    query.includes('sprint') || 
    query.includes('action') || 
    query.includes('next') || 
    query.includes('breakdown') || 
    query.includes('plan') ||
    query.includes('roadmap') ||
    query.includes('where to start')
  ) {
    const tasks = currentPhase.tasks || [];
    const taskSlice = tasks.slice(0, 5);

    return `### ⚡ 24-Hour Action Plan for Phase ${currentPhase.number}: ${currentPhase.title}

**Phase Objective:** ${currentPhase.objective}

#### Phase Breakdown & Milestones:
${taskSlice.map((t, i) => `**Step ${i + 1}: ${t.label}**\n- Focus: Complete the key technical implementation and commit your code to GitHub.`).join('\n\n')}

#### Key Deliverable To Ship:
- **Project:** ${currentPhase.project.title}
- **Description:** ${currentPhase.project.description}
- **Deliverables:**
${currentPhase.project.deliverables.map(d => `  - ${d}`).join('\n')}

#### Checklist for Today:
1. Clone or open your workspace and configure your environment.
2. Complete the primary tutorial or video resource associated with this phase.
3. Build the minimum viable deliverable.
4. Prepare the outreach pitch and send 5 personalized direct messages or emails.

---
*💡 **Notice**: Answered via DayZero Curriculum Intelligence. Add a valid Gemini API key in **Settings > Secrets** for customized live generative streaming.*`;
  }

  // 3. Recommended Tools, Stack & Architecture
  if (
    query.includes('tool') || 
    query.includes('stack') || 
    query.includes('architect') || 
    query.includes('framework') || 
    query.includes('librar') || 
    query.includes('package') ||
    query.includes('tech')
  ) {
    const tools = currentPhase.tools || [];
    const resources = currentPhase.resources || [];

    return `### 🛠️ Recommended Tools & Tech Stack for Phase ${currentPhase.number}: ${currentPhase.title}

#### Recommended Development Stack:
${tools.length > 0 
  ? tools.map(t => `- **${t.name}**: Industry-standard tool for this phase ([Documentation](${t.url}))`).join('\n')
  : `- **TypeScript & React**: Modern, scalable client architecture.\n- **Node.js / Express or Python / FastAPI**: Fast, robust server API handling.\n- **Tailwind CSS**: High-velocity, responsive styling.`
}

#### High-Value Learning & Video Resources:
${resources.slice(0, 4).map(r => `- **[${r.title}](${r.url})** (${r.type.toUpperCase()})`).join('\n')}

#### Best Practice Architecture Guidelines:
1. **Separation of Concerns:** Keep your AI prompts, server API endpoints, and client presentation components decoupled.
2. **Environment Security:** Never leak API secrets or private tokens to the client browser. Always proxy sensitive calls through a server route (\`/api/*\`).
3. **Error Resilience:** Always provide fallback UI states and graceful offline or timeout recovery.

---
*💡 **Notice**: Answered via DayZero Curriculum Intelligence. Add a valid Gemini API key in **Settings > Secrets** for customized live generative streaming.*`;
  }

  // 4. Prompt Templates & Prompt Engineering Query
  if (
    query.includes('prompt') || 
    query.includes('template') || 
    query.includes('system prompt') || 
    query.includes('instruction')
  ) {
    const samplePrompts = PROMPTS.slice(0, 2);

    return `### 📝 Battle-Tested Prompt Templates for Builders

Here are two high-impact prompt templates directly relevant to DayZero builders:

#### 1. ${samplePrompts[0]?.title || 'SaaS Idea & Deliverable Validator'}
**Category:** ${samplePrompts[0]?.category.toUpperCase() || 'BUSINESS'} | **Difficulty:** ${samplePrompts[0]?.difficulty || 'Intermediate'}
\`\`\`text
${samplePrompts[0]?.prompt || 'Analyze this feature for market fit and monetization potential.'}
\`\`\`

#### 2. ${samplePrompts[1]?.title || 'Component Refactor & Performance'}
**Category:** ${samplePrompts[1]?.category.toUpperCase() || 'CODING'} | **Difficulty:** ${samplePrompts[1]?.difficulty || 'Advanced'}
\`\`\`text
${samplePrompts[1]?.prompt || 'Refactor for performance and readability.'}
\`\`\`

#### Prompt Engineering Best Practices:
- **Role Priming:** Always assign an explicit persona (e.g., *"You are a principal cloud architect"* or *"You are a direct-response copywriter"*).
- **Constraints:** Specify negative constraints (e.g., *"Do not include generic pleasantries or introductory fluff"*).
- **Structured Output:** Ask for JSON schemas, bulleted checklists, or markdown tables.

---
*💡 **Notice**: Answered via DayZero Curriculum Intelligence. Add a valid Gemini API key in **Settings > Secrets** for customized live generative streaming.*`;
  }

  // 5. General Contextual Query (AI Fullstack, Video, Marketing or DayZero Overview)
  return `### 🚀 DayZero Guidance: Phase ${currentPhase.number} — ${currentPhase.title}

**Track:** ${track}  
**Objective:** ${currentPhase.objective}

#### Key Deliverable Overview:
- **Project Name:** ${currentPhase.project.title}
- **Description:** ${currentPhase.project.description}
- **Deliverables:**
${currentPhase.project.deliverables.map(d => `  - ${d}`).join('\n')}

#### Recommended Next Action:
1. Review the phase checklist in the sidebar and complete the current milestone.
2. Build the project deliverable and add it to your portfolio showcase.
3. Use the market-tested selling strategy (**${currentPhase.project.sellingStrategy.pricing}**) to pitch 3 to 5 prospects this week.

If you have specific questions about **monetization**, **sprint planning**, **recommended tools**, or **prompt templates**, simply ask me below!

---
*💡 **Notice**: Answered via DayZero Curriculum Intelligence. Add a valid Gemini API key in **Settings > Secrets** for customized live generative streaming.*`;
}
