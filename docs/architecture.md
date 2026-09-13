# Architecture

## Overview
The application is a single-page React application (SPA) with a custom Express backend for API proxying and SSR pre-rendering (for SEO).

## Diagram
```mermaid
graph TD
    Client[Client Browser / PWA<br>React + Tailwind]
    LocalStorage[(localStorage<br>User State)]
    Server[Express Server<br>Node.js / Cloud Run]
    Gemini[Google Gemini API]

    Client <-->|State/Progression/Themes| LocalStorage
    Client -->|1. Chat Messages| Server
    Server -->|2. High-Context Prompts| Gemini
    Gemini -->|3. Streaming/Text Response| Server
    Server -->|4. AI Response / Curriculum Fallback| Client
    Client -->|5. Render UI| Client
```

## Layering Rules
- **UI Components:** (`src/components/`, `src/features/**/components/`) Do not contain business logic. Receive data via props and call action handlers.
- **State/Hooks:** (`src/features/**/hooks/`) Manages local state and React context.
- **Server API:** (`src/server.ts`, `src/server/api/`) Handlers for proxying external APIs securely. No business logic on the client for external secrets.
- **Data Access:** Data persistence is intentionally scoped to `localStorage` (Offline-first approach). No cloud database is used.