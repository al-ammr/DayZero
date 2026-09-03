# DayZero by TechOptyx — AI Full-Stack Developer Path

> **Status note:** This repository is the original MVP powering the AI Full-Stack Developer track. It is live and fully functional, but is being succeeded by DayZero V1 — a rebuilt, three-track platform (Full-Stack Development, AI Video & Filmmaking, AI Marketing) — in active development in a separate repository. This repo will continue running unchanged at its current URL until V1 is launch-ready, at which point it will redirect here. See Known Limitations below before building on top of this codebase.

**Live app:** [ai-full-stack-developer-eta.vercel.app](https://ai-full-stack-developer-eta.vercel.app)

---

## What This Is

An AI-guided, phase-based learning path that takes a learner from zero to a deployed, sellable AI-powered product — full-stack development, taught with an explicit focus on turning each phase's skill into income, not just knowledge.

Each of the phases follows the same structured breakdown:
- **Tasks** — A checkable list of what to accomplish in the phase
- **Learning Videos** — Curated tutorials for the phase's topic
- **Tool Tasks** — Hands-on tasks covering the specific tools introduced
- **Follow-Along Project** — A guided build, video-led
- **Monetization** — Market value estimate, a cold-pitch script, and where to actually find clients for this specific skill
- **Resources** — External links (documentation, certifications, further reading)

Beyond the core curriculum, the app also includes:
- **Dashboard** — Overall progress, tasks completed, active phase, and a learning-velocity chart
- **AI Path Assistant** — Intelligent contextual chatbot powered by Google Gemini for real-time guidance
- **Prompt Library** — Curated, filterable AI prompts (coding, debugging, business/outreach)
- **Certifications page** — Links to free external certifications (Google, Harvard, Claude, etc.) with completion toggles
- **Light & Dark Mode** theme toggling

---

## Tech Stack

- **Build tool:** Vite 6
- **Framework:** React 19 + TypeScript
- **Backend:** Node.js Express server (`server.ts`) with Vite middleware
- **Styling:** Tailwind CSS 4
- **AI:** Google Gemini (`@google/genai`) with multi-model fallback (`gemini-2.5-flash`, `gemini-3.1-flash-lite`, `gemini-3.8-flash`)
- **UI & Animation:** motion, react-confetti, lucide-react
- **Charts:** recharts
- **Markdown rendering:** react-markdown

*This project was originally scaffolded from `google-gemini/aistudio-repository-template`.*

---

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Gemini API key in `.env` or container environment variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local Express + Vite dev server (port 3000) |
| `npm run build` | Production client build + server compilation via esbuild |
| `npm run start` | Run the compiled production server (`dist/server.cjs`) |
| `npm run lint` | Type-check the project (`tsc --noEmit`) |

---

## Project Structure

```text
├── .env.example          # Environment variables template
├── metadata.json         # App metadata and permissions
├── server.ts             # Express server handling /api/chat and Vite middleware
├── src/
│   ├── App.tsx           # Primary application layout, routing & navigation
│   ├── components/       # UI subcomponents (AI Assistant, Certifications, etc.)
│   ├── constants.ts      # Tracks, phases, curriculum data & prompt library
│   ├── types.ts          # Core TypeScript interfaces & types
│   └── index.css         # Tailwind CSS entry point
├── phases_part*.json     # Curriculum phase definitions
└── dist/                 # Production build outputs (client + server.cjs)
```

Curriculum content is bundled directly and consumed at runtime — all curriculum data is static, fast, and accessible offline.

---

## Known Limitations

- **Client State:** Progress and completion status are saved in local storage. Clearing browser cache resets progress.
- **Account Sync:** No remote user accounts or multi-device sync.
- **Single Backend Scope:** The backend handles Gemini AI proxying securely; state management remains client-side.

---

## About

Built by **Amr Suleiman** under **TechOptyx**.  
*Tagline: Earn while you learn. From Day Zero.*
