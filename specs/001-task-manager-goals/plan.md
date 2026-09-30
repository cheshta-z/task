# Implementation Plan: Task Manager Goals

**Branch**: `001-task-manager-goals` | **Date**: 2026-09-30 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-task-manager-goals/spec.md`

## Summary

Build a responsive, light-themed goal board with current and completed columns, a modal
for creating goals, completion and confirmed deletion actions, and local-calendar deadline
indicators. Keep the route as a Server Component shell and place interactive state and
browser storage behind a focused Client Component. Persist goals in the same browser's
local storage; use Tailwind 4 `@theme` tokens and date-fns for calendar-aware date display
and deadline calculations.

## Technical Context

**Language/Version**: TypeScript 5 (`^5` in package.json)

**Primary Dependencies**: Next.js 16.3.7, React 19.2.8, Tailwind CSS 4 (`^4`); add date-fns for date formatting and local calendar-day calculations

**Storage**: Browser `localStorage`, scoped to the app origin and browser profile; no account or cross-device sync

**Testing**: No unit, integration, or end-to-end tests may be created or run (project constitution). Use a manual browser walkthrough; lint/build checks are not test suites.

**Target Platform**: Current evergreen desktop and mobile browsers supported by the installed Next.js release

**Project Type**: Single Next.js App Router web application

**Performance Goals**: Goal actions update locally without network round trips. No numeric latency target is specified.

**Constraints**: Follow package.json versions; use Tailwind CSS 4 `@theme`; access localStorage only in the browser after hydration; date-only values use local calendar semantics; no authentication, remote service, or automated test suite.

**Scale/Scope**: One user's small personal goal list on one browser profile. Browser storage capacity is the practical limit; no server-side scale target is defined.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Plan |
|---|---|---|
| Clean Code | PASS | Keep the route, interactive board, reusable goal presentation/form, and goal/date helpers focused; avoid a new architecture layer. |
| Simple UX | PASS | Two clearly labeled lists, a short add flow, direct completion, and explicit confirmation before destructive deletion. |
| Responsive Design | PASS | Preserve both goal groups and their actions at narrow widths; stack columns when needed. |
| Minimal Dependencies | PASS | Add only the user-requested date-fns package. Its calendar-day functions provide explicit DST-safe day calculations and formatting, avoiding custom date arithmetic; import only the needed functions. |
| No Automated Testing | PASS | No unit, integration, or end-to-end tests, test files, or test commands. The quickstart is a manual product walkthrough only. |
| Platform Constraints | PASS | Stay on the Next.js, React, and Tailwind versions declared by package.json; use existing App Router and Tailwind/PostCSS setup. |

## Project Structure

### Documentation (this feature)

```text
specs/001-task-manager-goals/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md             # Created by /speckit-tasks, not by this command
```

No `contracts/` directory is needed: this feature exposes no API or external-system contract.

### Source Code (repository root)

```text
app/
├── _components/
│   ├── goal-card.tsx
│   ├── goal-manager.tsx
│   └── new-goal-dialog.tsx
├── globals.css          # Tailwind import and @theme color tokens
├── layout.tsx           # Task Manager metadata and existing root layout
└── page.tsx              # Server-rendered route shell
lib/
└── goals.ts              # Goal types, date calculations, and stored-data validation
```

**Structure Decision**: Extend the existing single-project App Router structure. Keep
`app/page.tsx` server-rendered and isolate browser-only state in `GoalManager`. Use one
small reusable goal card and one dialog component; centralize goal shape and date/data
helpers in `lib/goals.ts`. Do not introduce a backend, state-management library, or UI
component dependency.

## Constitution Check (Post-Design)

The design passes the same gates: only one justified date utility dependency is added;
local storage remains browser-only; the existing pinned framework and Tailwind versions
are retained; layouts adapt to narrow viewports; and no automated test suite is planned.
There are no unresolved constitution violations.
