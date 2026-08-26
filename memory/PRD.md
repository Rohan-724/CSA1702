# MediSense — Product Requirements Document

## Original Problem Statement
Build a complete web-based AI health assistant called "MediSense" — an educational school project that acts as an AI-powered symptom assessment chatbot with emergency triage, calm/severity classification, self-care guidance, educational OTC medication information, and a clear "next step" recommendation. Not a diagnostic or prescribing tool.

## Architecture
- **Frontend:** React 19 + React Router 7, Tailwind + shadcn/ui, Cormorant Garamond / Work Sans / IBM Plex Sans, sonner for toasts.
- **Backend:** FastAPI + Motor (MongoDB), JWT auth via httpOnly cookie + bcrypt.
- **LLM:** Claude Sonnet 5 via `emergentintegrations` (EMERGENT_LLM_KEY).
- **DB collections:** `users`, `conversations`, `messages`.

## User Personas
- Curious patient / student wanting to understand a symptom.
- School evaluator viewing the medical-safety and emergency triage flow.

## Core Requirements (static)
- Emergency triage takes priority; no medication in emergencies.
- Never diagnose; use "could be consistent with" framing.
- Educational OTC info only, with pharmacist/doctor deferrals.
- Clear "next step" ending each assessment.
- Auth-gated chat with persistent conversation history.

## Implemented (Feb 2026)
- Landing page with hero, "How it works", features, CTA, footer disclaimer.
- Email/password auth (register/login/logout/me) with JWT httpOnly cookies + bcrypt.
- Chat interface: sidebar with history, main pane, welcome message, typing indicator, emergency alert styling, timestamps, Enter-to-send, new conversation, delete conversation.
- Backend `/api/chat` streams the whole reply from Claude Sonnet 5 with the MediSense system prompt (emergency triage, severity, OTC guardrails).
- Markdown-lite renderer for headings, lists, bold, blockquotes.
- Admin seeded on startup.
- Test credentials at `/app/memory/test_credentials.md`.

## Prioritized Backlog
- P1: Streaming SSE responses so users see the reply appear word-by-word.
- P1: Password reset flow.
- P2: Structured medication card component (parse OTC block into a dedicated card UI).
- P2: Rename conversation title / auto-summarize.
- P2: Symptom timeline / share-with-doctor export (PDF or copy link).
- P2: Multi-language (start with EN + one more).
- P3: Rate limiting and abuse protection.

## Next Tasks (post first-finish)
- Add streaming responses.
- Improve mobile sidebar (drawer).
- Structured OTC card + severity chip parsing.
