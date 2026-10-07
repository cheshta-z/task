# Tasks: Task Manager Front Page

**Input**: Design documents from `/specs/002-task-manager-front-page/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: No automated tests requested. This feature is validated by manual browser walkthroughs only.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing app structure and theme setup for the Task Manager board.

- [x] T001 Create the implementation task plan against the existing App Router structure in `app/page.tsx`, `app/layout.tsx`, `app/_components/goal-manager.tsx`, `app/_components/goal-card.tsx`, `app/_components/new-goal-dialog.tsx`, and `lib/goals.ts`
- [x] T002 [P] Confirm the Tailwind 4 light theme and semantic colors in `app/globals.css` support the current and completed goal states, near-deadline highlights, and destructive actions
- [x] T003 [P] Confirm the root metadata in `app/layout.tsx` matches the Task Manager experience and does not conflict with the App Router page shell

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared goal logic and browser persistence must be complete before any story-specific work is considered ready.

- [x] T004 Implement the shared `Goal` model, validation, and date helpers in `lib/goals.ts`, including `Goal` typing, title trimming, `YYYY-MM-DD` validation, storage key management, and local calendar-day calculations with `date-fns`
- [x] T005 [P] Implement hydration-safe `localStorage` read/write behavior in `app/_components/goal-manager.tsx` so the board loads persisted goals after mount without a server/client mismatch and reports storage failures clearly
- [x] T006 [P] Keep `app/page.tsx` as a thin Server Component shell so only the interactive goal board remains client-side, preserving Next.js App Router boundaries and reducing unnecessary client work

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Review Goals and Deadlines (Priority: P1) 🎯 MVP

**Goal**: Let the user inspect current goals, compare them with completed goals, and understand deadlines and due-soon status at a glance.

**Independent Test**: A user can open the page and, without assistance, tell which goals are current or complete, how many days remain, and which goals are due soon or overdue.

- [x] T007 [P] [US1] Build the two-column responsive board and empty states in `app/_components/goal-manager.tsx` so current and completed goals remain clearly separated at desktop and narrow widths
- [x] T008 [US1] Implement deadline labeling and highlight states in `app/_components/goal-card.tsx`, including "Due today", overdue counts, remaining days, and near-deadline styling for dates from today through three calendar days ahead
- [x] T009 [US1] Wire `GoalCard` state to the shared date rules in `lib/goals.ts` so overdue, due-soon, and due-today values are derived consistently from local calendar-day differences
- [x] T010 [US1] Ensure completed goals remain in the completed column and never return to current goals via the card UI in `app/_components/goal-card.tsx` and `app/_components/goal-manager.tsx`

**Checkpoint**: User Story 1 is independently usable and understandable.

---

## Phase 4: User Story 2 - Add a Goal (Priority: P2)

**Goal**: Allow the user to create a valid goal from a modal form and see the new current goal immediately in the board.

**Independent Test**: A user can open the add-goal form, submit a valid title and end date, and the new goal appears in the current list without reloading the page.

- [x] T011 [P] [US2] Implement the add-goal modal in `app/_components/new-goal-dialog.tsx` with title and end-date inputs, validation messages, Cancel behavior, and proper ARIA semantics for the dialog
- [x] T012 [US2] Wire the add-goal submit flow in `app/_components/goal-manager.tsx` so valid submissions create a new current goal, close the modal, and persist the updated list in same-browser `localStorage`
- [x] T013 [US2] Reset form state and validation errors after success or cancel in `app/_components/new-goal-dialog.tsx` so invalid or blank submissions do not create goals

**Checkpoint**: User Story 2 is independently functional and validates cleanly.

---

## Phase 5: User Story 3 - Complete or Delete a Goal (Priority: P3)

**Goal**: Allow the user to move a current goal to completed and permanently delete a goal only after confirmation.

**Independent Test**: A user can complete a goal and confirm it moves to the completed column, or delete a goal and confirm it is removed only after a confirmation step.

- [x] T014 [P] [US3] Add the completion checkbox flow in `app/_components/goal-card.tsx` and `app/_components/goal-manager.tsx` so a current goal moves to the completed column immediately and stays completed
- [x] T015 [US3] Add the confirmed delete flow in `app/_components/goal-card.tsx` and `app/_components/goal-manager.tsx` so a current or completed goal is removed only after the user confirms the action
- [x] T016 [US3] Persist completed/deleted state changes in `app/_components/goal-manager.tsx` and keep the board, validation, and storage state consistent after each action

**Checkpoint**: User Story 3 is independently functional and keeps the goal list accurate.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize quality, usability, and consistency across the single-page flow.

- [x] T017 [P] Review the light theme and semantic color usage across `app/globals.css`, `app/_components/goal-card.tsx`, and `app/_components/goal-manager.tsx` to ensure the current goals, completed goals, near-deadline highlights, and delete actions remain visually consistent
- [x] T018 [P] Confirm keyboard and focus behavior for the add-goal modal and action buttons in `app/_components/new-goal-dialog.tsx` and `app/_components/goal-manager.tsx` so the page stays usable with supported input methods
- [x] T019 Final walkthrough against `specs/002-task-manager-front-page/quickstart.md` to confirm same-browser persistence, local-calendar due logic, empty states, delete confirmation, and responsive layout match the feature spec

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: No dependencies; can begin immediately.
- **Phase 2**: Depends on Phase 1 completion; blocks all user-story work.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion; MVP-ready and independently testable.
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion; can start in parallel with User Story 1 if the team has capacity.
- **User Story 3 (Phase 5)**: Depends on Phase 2 completion; can start in parallel with User Story 1 or 2 if the team has capacity.
- **Phase 6**: Depends on all planned story work being complete.

### User Story Dependencies

- **US1**: No dependencies on other stories; delivers the primary page view and deadline status.
- **US2**: No dependencies on other stories; adds new goal creation independently.
- **US3**: No dependencies on other stories; completes the action flow for checked and deleted goals.

### Parallel Opportunities

- T002 and T003 can run in parallel during Phase 1.
- T005 and T006 can run in parallel during Phase 2.
- T007 and T011 can proceed in parallel once the foundational phase is complete.
- T014 and T017 can proceed in parallel during final polish or story completion.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete User Story 1 to validate the board and deadline states.
3. Stop and validate the page before adding the next story.

### Incremental Delivery

1. Build the shared goal model and local state.
2. Deliver the current/completed board and deadline labeling.
3. Add the modal form and validation.
4. Add completion and delete flows.
5. Finalize polish and keyboard/responsive quality checks.

### Parallel Team Strategy

- One developer can focus on `lib/goals.ts` and `app/_components/goal-manager.tsx` while another handles `new-goal-dialog.tsx` and card styling.
- This allows the board, deadline states, and form validation to be completed independently without a custom backend or external service.
