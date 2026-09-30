# Tasks: Task Manager Goals

**Input**: Design documents from `specs/001-task-manager-goals/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, and `quickstart.md`

**Testing**: No unit, integration, or end-to-end test tasks are included, per project constitution. Story verification is a manual browser walkthrough only.

**Organization**: Tasks are grouped by user story. Complete Setup and Foundational phases before story work.

## Phase 1: Setup

**Purpose**: Add the explicitly requested date utility dependency to the existing app.

- [X] T001 Add date-fns as a runtime dependency in `package.json` and synchronize `package-lock.json`, importing only the date functions needed by this feature.

---

## Phase 2: Foundational

**Purpose**: Establish shared theme, goal data/date rules, and browser persistence before implementing the user stories.

- [X] T002 [P] Define the restrained light palette as Tailwind 4 `@theme` color tokens in `app/globals.css`, preserving the existing Tailwind import.
- [X] T003 [P] Define and validate the Goal model and date helpers in `lib/goals.ts`; preserve these field rules verbatim: `id`: "Stable unique identifier generated when the goal is created."; `title`: "Trimmed, non-empty user-visible title."; `endDate`: "Valid date-only value in `YYYY-MM-DD` form; interpreted in the user's local calendar. Past dates are allowed and appear overdue."; `status`: "New goals start as `current`. Checking a current goal changes it to `completed`. Completed goals cannot return to current in this scope." Use date-fns calendar-day calculations rather than elapsed-millisecond subtraction.
- [X] T004 Implement post-hydration `localStorage` loading and persistence in `app/_components/goal-manager.tsx`; validate stored records, avoid overwriting unresolved or malformed stored data with an empty list, and handle unavailable/read/write failures without crashing the board.

**Checkpoint**: Shared date rules, theme tokens, and browser-state handling are ready.

---

## Phase 3: User Story 1 - Review Goals and Deadlines (Priority: P1) 🎯 MVP Core

**Goal**: Show current and completed goals with clear local-calendar deadline status, deadline highlighting, empty states, and a responsive two-column layout.

**Independent Verification**: With valid goal records already saved in this browser, manually open and reload the page. Confirm current and completed goals are separated, days remaining/due-today/overdue are accurate, the due-soon highlight covers today through three days ahead, and both groups remain usable at a narrow viewport.

- [X] T005 [P] [US1] Build the reusable goal display and deadline labels in `app/_components/goal-card.tsx`, including due-today, overdue, and current-goal-only due-soon presentation using `lib/goals.ts`.
- [X] T006 [US1] Render current and completed goal columns, empty states, storage loading/error feedback, and responsive stacking in `app/_components/goal-manager.tsx` using `app/_components/goal-card.tsx`.
- [X] T007 [US1] Keep `app/page.tsx` as the route shell and render the interactive board from `app/_components/goal-manager.tsx`.
- [X] T008 [P] [US1] Set the page title and description to Task Manager in `app/layout.tsx` without changing the existing root layout behavior.

**Checkpoint**: A user can review stored goal records and their current/completed/deadline states.

---

## Phase 4: User Story 2 - Add a Goal (Priority: P2)

**Goal**: Create a current goal through a title/end-date modal and retain it in this browser.

**Independent Verification**: Manually open the add-goal dialog, submit a valid title and date, and confirm the new current goal remains after reload. Confirm blank/invalid values are explained and cancel creates nothing.

- [X] T009 [P] [US2] Build the accessible title and end-date dialog, required-field validation, and cancel behavior in `app/_components/new-goal-dialog.tsx`; allow past dates so overdue goals remain supported.
- [X] T010 [US2] Connect the add-goal action and dialog to `app/_components/goal-manager.tsx`; create a uniquely identified current goal, close on successful submit, preserve state on cancel, and persist valid additions through the shared storage flow.

**Checkpoint**: A new user can populate the board and retain goals in the same browser.

---

## Phase 5: User Story 3 - Complete or Delete a Goal (Priority: P3)

**Goal**: Complete a current goal or permanently delete a current/completed goal after confirmation.

**Independent Verification**: Manually check a current goal and confirm it moves to completed without a reopen action. Request deletion from each group, cancel once to confirm preservation, then confirm deletion and reload to confirm removal persists.

- [X] T011 [P] [US3] Add a completion checkbox for current goals and a separate delete action with explicit confirmation for both statuses in `app/_components/goal-card.tsx`; do not expose a reopen action for completed goals.
- [X] T012 [US3] Implement completion and confirmed-deletion state transitions and persistence in `app/_components/goal-manager.tsx`; preserve the goal when deletion is canceled and remove confirmed deletions from storage.

**Checkpoint**: Completion, deletion, and persistence match the defined goal lifecycle.

---

## Phase 6: Polish and Cross-Cutting Concerns

**Purpose**: Complete manual product verification and repository quality checks without introducing a test suite.

- [X] T013 Perform the manual browser walkthrough in `specs/001-task-manager-goals/quickstart.md` and update that guide only if implemented behavior or prerequisites differ.
- [X] T014 Run the existing `npm run lint` and `npm run build` scripts from `package.json`, then resolve relevant lint/build issues without adding or running unit, integration, or end-to-end tests.

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No feature-code dependencies; complete T001 before foundational date helpers.
- **Foundational (Phase 2)**: Starts after T001. T002 and T003 can proceed in parallel; T004 depends on T003.
- **User Story 1 (Phase 3)**: Starts after Phase 2. T005 and T008 can proceed in parallel; T006 depends on T004 and T005; T007 depends on T006.
- **User Story 2 (Phase 4)**: Board shell from US1 is required. T009 is an independent dialog component; T010 depends on T007 and T009.
- **User Story 3 (Phase 5)**: Depends on the shared board and saved-goal flow. T011 can be prepared in parallel with T009 after US1; T012 depends on T010 and T011 because both stories update the shared goal manager.
- **Polish (Phase 6)**: After the desired stories are implemented; complete T013 before T014 so the Next.js development server and production build do not compete for generated output.

### User Story Dependencies

- **User Story 1 (P1)**: Depends on foundational theme, model/date helpers, and storage loading. It can display previously stored records but cannot create a new goal by itself.
- **User Story 2 (P2)**: Depends on the US1 board and storage foundation so a created goal has a visible destination.
- **User Story 3 (P3)**: Depends on the US1 goal card/manager and US2 creation flow for a complete user-managed lifecycle. Its goal-card controls can be developed separately from the add dialog; manager integration is sequential to avoid same-file conflicts.

### Parallel Opportunities

- T002 and T003 modify different files after T001.
- T005 and T008 modify different files after the foundation is ready.
- After US1, T009 and T011 can be worked on in parallel because they modify separate components; T010 and T012 remain sequential because both modify `app/_components/goal-manager.tsx`.
- Run T014 lint/build checks after T013 has stopped the development server used for the manual walkthrough.

## Parallel Examples

### Foundation

```text
Task: T002 Define Tailwind @theme color tokens in app/globals.css
Task: T003 Define the Goal model and date helpers in lib/goals.ts
```

### User Story 1

```text
Task: T005 Build goal display/deadline labels in app/_components/goal-card.tsx
Task: T008 Set Task Manager metadata in app/layout.tsx
```

### User Stories 2 and 3

```text
Task: T009 Build the goal dialog in app/_components/new-goal-dialog.tsx
Task: T011 Add completion and confirmed-delete controls in app/_components/goal-card.tsx
```

## Implementation Strategy

### MVP First

The usable MVP includes **User Story 1 plus User Story 2**: displaying the board alone
would leave a new user with no way to create a goal. Complete Setup and Foundational
phases, then implement the board and goal-creation flow. User Story 3 adds completion and
confirmed deletion as the next increment.

### Incremental Delivery

1. Complete Setup and Foundational tasks.
2. Deliver US1 to display saved goals and deadline states.
3. Deliver US2 so users can create and persist goals; this completes the usable MVP.
4. Deliver US3 for completion and deletion lifecycle actions.
5. Perform the manual quickstart walkthrough and lint/build checks; do not create or run
   unit, integration, or end-to-end tests.