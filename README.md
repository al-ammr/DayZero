# DayZero by TechOptyx

> The Builder Operating System for AI, Video Animation, and Digital Marketing.

![TechOptyx Status](https://img.shields.io/badge/Status-Production%20Ready-success) ![License](https://img.shields.io/badge/License-Proprietary-blue)

**Live URL:** [ai-full-stack-developer-eta.vercel.app](https://ai-full-stack-developer-eta.vercel.app)

## What it does
- **Guided Curriculums:** Take users from zero to hero across Full-Stack AI, Marketing, and Video Animation tracks.
- **AI Path Assistant:** A context-aware chatbot powered by Google Gemini that answers questions based strictly on the current learning phase.
- **Offline-First Progression:** Track tasks, pinned videos, and streaks entirely in the browser using a robust `localStorage` architecture (PWA supported).

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Build Tool / Bundler:** Vite 6 + esbuild
- **Server:** Express v4 (Node.js 22 targeted)
- **Styling:** Tailwind CSS 4
- **AI Integration:** Google Gemini SDK (`@google/genai`)

## Quickstart

**Prerequisites:** Node.js v22+, npm

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd react-example
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Environment Variables
| Name | Required | Description | Example | Where to get it |
| :--- | :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Yes | API key for AI Assistant | `AIzaSy...` | Google AI Studio |
| `NODE_ENV` | No | Environment mode | `development` | Built-in |
| `PORT` | No | Port for Express Server | `3000` | Local Config |

## Project Structure
```text
├── src/
│   ├── components/       # Shared cross-feature UI (Modals, Toasts)
│   ├── config/           # Environment validation (Zod)
│   ├── features/         # Domain-driven features (curriculum, video, assistant)
│   ├── lib/              # Framework-agnostic utilities (YouTube parsers, etc)
│   ├── seo/              # SSR Prerendering and SEO optimizations
│   ├── server/           # Server-side API routes and middleware
│   ├── types/            # Global TypeScript interfaces
│   ├── App.tsx           # Primary routing and application shell
│   └── server.ts         # Express server entry point
├── dist/                 # Production build outputs (client + server.cjs)
└── docs/                 # Architecture diagrams, runbooks, and ADRs
```

## Scripts Reference
| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local Express + Vite dev server (port 3000) using tsx. |
| `npm run build` | Production client build + server compilation via esbuild. |
| `npm run start` | Run the compiled production server (`dist/server.cjs`). |
| `npm run lint` | Type-check the project (`tsc --noEmit`). |
| `npm run clean` | Remove `dist/` directory. |

## Architecture
See [docs/architecture.md](./docs/architecture.md) for the system diagram and layering rules.

## Testing
This project relies on strict TypeScript compilation for structural integrity.
- Run `npm run lint` to execute a full typecheck across the codebase.
- Manual testing is currently required for E2E user flows (Dashboard → Curriculum → Chat).

## Deployment
This app compiles to a single `dist/server.cjs` and a folder of static UI assets.
- **Target Platform:** Designed for containerized environments (Google Cloud Run, Fly.io, Railway, Render).
- **Deploying:** Run `npm run build` inside a standard Node.js Dockerfile, and set `CMD ["npm", "run", "start"]`. Ensure `PORT=3000` is exposed.
- **Rollback:** Simply revert the traffic splitting on your container orchestrator (e.g. Cloud Run revisions) to the previous working image.

## Troubleshooting
- **AI Chatbot fails to respond:** Check your `GEMINI_API_KEY` in `.env`. Ensure it has not hit rate limits.
- **Loss of Progress:** If you clear your browser cache, progress is lost. The app is intentionally designed as offline-first with `localStorage`.
- **Port Conflicts:** If port `3000` is in use, modify the `PORT` env var, but note the container orchestrator expects 3000 by default.

## Contributing
Please see `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` for guidelines.

## License
Proprietary / Copyright TechOptyx.
