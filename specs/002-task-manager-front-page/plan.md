# Implementation Plan: Task Manager Front Page

**Branch**: `002-task-manager-front-page` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-task-manager-front-page/spec.md`

## Summary

Deliver the Task Manager goal board with separate current and completed lists, local-calendar deadline states, goal creation in a modal, completion, and confirmed deletion. Most of this UI already exists. Preserve the existing App Router and component boundaries while correcting storage initialization to avoid hydration mismatches, surfacing write failures, and using the existing Tailwind 4 `@theme` palette consistently. Keep goals in same-browser `localStorage`; use the already-installed `date-fns` for date-only formatting and calendar-day calculations.

## Technical Context

**Language/Version**: TypeScript 5 (`^5` in package.json)

**Primary Dependencies**: Next.js 16.3.7, React 19.2.8, Tailwind CSS 4, and date-fns (`^4.1.0`, already declared)

**Storage**: Browser `localStorage`, scoped to the current origin and browser profile; no account or cross-device synchronization

**Testing**: No unit, integration, or end-to-end tests may be created or run. Use a manual browser walkthrough only, per the user and project constitution.

**Target Platform**: Current desktop and mobile browsers supported by the installed Next.js release

**Project Type**: Single Next.js App Router web application

**Performance Goals**: Goal actions update locally without network round trips. No numeric latency target is specified.

**Constraints**: Use Tailwind 4 `@theme` color tokens; read browser storage only after hydration; interpret `YYYY-MM-DD` end dates using the user's local calendar; add no backend or new dependency; do not create or run automated tests.

**Scale/Scope**: One user's personal goal list in one browser profile. No explicit goal-count limit or server-side scale target is defined.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Plan |
|---|---|---|
| Clean Code | PASS | Keep the route, goal manager, goal card, dialog, and goal/date helpers within the existing focused module boundaries. |
| Simple UX | PASS | Preserve the two clearly labeled goal groups, short add flow, direct completion action, and confirmed destructive deletion. |
| Responsive Design | PASS | Keep both lists and their controls usable at narrow widths and with supported input methods; give the modal complete keyboard focus behavior. |
| Minimal Dependencies | PASS | Use dependencies already declared in `package.json`; add no package or parallel styling/state framework. |
| No Automated Testing | PASS | No automated test files or commands. Validation is a manual browser walkthrough only. |
| Platform Constraints | PASS | Retain the declared Next.js, React, and Tailwind versions and the existing App Router/PostCSS setup. |

There are no constitution violations requiring an exception.

## Project Structure
## Project Structure

### Documentation (this feature)

```text
specs/002-task-manager-front-page/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- checklists/requirements.md
`-- tasks.md             # Created by /speckit-tasks, not by this command
```

No `contracts/` directory is needed: this feature exposes no external API or system integration.

### Source Code (repository root)

```text
app/
|-- _components/
|   |-- goal-card.tsx
|   |-- goal-manager.tsx
|   `-- new-goal-dialog.tsx
|-- globals.css          # Tailwind import and @theme color tokens
|-- layout.tsx           # Root layout and page metadata
`-- page.tsx             # Server-rendered route shell
lib/
`-- goals.ts             # Goal shape, validation, persistence key, date helpers
```

**Structure Decision**: Continue within the existing single-project App Router structure. Keep `app/page.tsx` as the server-rendered shell and isolate browser-only goal state in `GoalManager`. Reuse the goal card, add-goal dialog, global theme, and `lib/goals.ts`; do not introduce a backend, storage abstraction, or UI library.
## Complexity Tracking

No additional architectural complexity or constitution exceptions are proposed.

## Constitution Check (Post-Design)

The design passes the same gates: existing platform and dependencies are retained, theme colors remain in Tailwind `@theme`, storage is restricted to the browser and loaded after hydration, responsive and keyboard-usable interaction is required, and no automated tests are added or run. There are no unresolved constitution violations.
