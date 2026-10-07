# Feature Specification: Task Manager Front Page

**Feature Branch**: `002-task-manager-front-page`

**Created**: 2026-09-30

**Status**: Draft

**Input**: User description: "Reinitialise front page - this application should be a goal tracking web app called 'task manager'. There should be two columns - a left one where current goals are shown, along with how many days left the user has to achieve the goal, and a right one where completed goals are. Each goal can be 'checked' using a checkbox, and then either moved to the completed column or permanently deleted. To add new goals, a user can click on a button to open a new goal form in a modal (title and end date fields). Goals reaching their end date (within 3 days) are highlighted. Let's use a modern light theme with basic colours."

## Clarifications

### Session 2026-09-30

- Q: Should saved goals be available only in the browser where they were created, or follow the user across devices? → A: Save goals for reuse in the same browser only. (Carried forward from the prior clarification for this feature.)

## User Scenarios & Testing *(mandatory)*

The independent outcomes below describe user-visible behavior for review and demonstration. They do not require creating or running unit, integration, or end-to-end tests.

### User Story 1 - Review Goals and Deadlines (Priority: P1)

A user opens Task Manager and sees current goals in one column, completed goals in another, and the end date and remaining time for each current goal. Goals due soon and overdue are easy to distinguish.

**Why this priority**: Seeing what remains and what is complete is the primary value of a goal tracker.

**Independent Test**: A user can identify a current goal's deadline, remaining time, and status, and distinguish it from completed goals using the page alone.

**Acceptance Scenarios**:

1. **Given** current and completed goals exist, **When** the user opens the page, **Then** current goals appear in the left column and completed goals appear in the right column.
2. **Given** a current goal has an end date from today through three calendar days ahead, inclusive, **When** the user views the page, **Then** it is highlighted and its remaining days are shown.
3. **Given** a current goal's end date has passed, **When** the user views the page, **Then** it remains current and is visibly identified as overdue.
4. **Given** the user closes and reopens the app in the same browser, **When** their goals are shown, **Then** previously saved goals and their statuses remain available.

---

### User Story 2 - Add a Goal (Priority: P2)

A user creates a goal by opening a form, entering a title and end date, and submitting it. The new goal appears among current goals.

**Why this priority**: Users need a quick way to capture goals before they can track progress toward them.

**Independent Test**: A user can create a goal with a title and end date and see it listed as current.

**Acceptance Scenarios**:

1. **Given** the goal page is open, **When** the user activates the add-goal button, **Then** a modal form with title and end-date fields appears.
2. **Given** the required fields contain valid values, **When** the user submits the form, **Then** the modal closes and the new goal appears in current goals.
3. **Given** a required field is empty or invalid, **When** the user submits the form, **Then** the goal is not created and the user is told which value needs attention.
4. **Given** the form is open, **When** the user cancels it, **Then** the form closes without creating a goal.

---

### User Story 3 - Complete or Delete a Goal (Priority: P3)

A user checks a current goal to move it to the completed column, or chooses a separate delete action to permanently remove a goal.

**Why this priority**: Clear completion and deletion actions keep the current list useful while preserving a distinct record of completed goals.

**Independent Test**: A user can move a goal to completed by checking it, and can permanently delete a goal through an explicit confirmation.

**Acceptance Scenarios**:

1. **Given** a goal is in current goals, **When** the user checks its completion checkbox, **Then** it moves to completed goals and no longer appears as current.
2. **Given** a goal is in either column, **When** the user chooses delete and confirms, **Then** the goal is permanently removed from both lists.
3. **Given** a delete confirmation is open, **When** the user cancels, **Then** the goal remains unchanged in its original list.
4. **Given** a goal is in completed goals, **When** the user views its available actions, **Then** no action is offered to return it to current goals.

---

### Edge Cases

- A goal due today is labeled as due today and receives the near-deadline highlight.
- A goal overdue by one or more calendar days remains current until completed or deleted, and shows how many days overdue.
- An empty current or completed list shows a clear empty state without obscuring the other list.
- A title containing only whitespace, a missing title, or a missing/invalid end date cannot be submitted.
- Canceling a deletion confirmation leaves the goal and its status unchanged.
- On narrow screens, the two goal groups remain distinct and usable when displayed one after the other.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST be titled "Task Manager" and present current goals separately from completed goals.
- **FR-002**: Each current goal MUST show its title, end date, and remaining calendar days; a goal due today MUST be labeled "Due today," and an overdue goal MUST show the days overdue.
- **FR-003**: A current goal with an end date from today through three calendar days ahead, inclusive, MUST receive a visible near-deadline highlight. Overdue goals MUST have a distinct overdue indication.
- **FR-004**: The page MUST provide an add-goal action that opens a modal with title and end-date fields.
- **FR-005**: The add-goal form MUST require a nonblank title and valid end date, explain invalid or missing values, and create a current goal only after valid submission.
- **FR-006**: Canceling the add-goal form MUST close it without creating a goal.
- **FR-007**: Checking a current goal MUST mark it complete and move it from current goals to completed goals. Completed goals MUST NOT be reopenable in the initial scope.
- **FR-008**: The user MUST be able to request deletion of a current or completed goal. The page MUST ask for confirmation before permanent deletion, and canceling confirmation MUST preserve the goal.
- **FR-009**: Goals and their current/completed status MUST remain available after the user closes and reopens the app in the same browser. Goals MUST NOT sync across browsers or devices in the initial scope.
- **FR-010**: The page MUST use a modern light appearance with restrained basic colors and a responsive layout. On narrow screens, both goal groups MUST remain readable and available without horizontal overflow.
- **FR-011**: Empty current and completed lists MUST each have a clear empty state.

### Key Entities *(include if data involved)*

- **Goal**: A user-defined item with a title, end date, and status of current or completed. A goal may also be permanently deleted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of current goals displayed include a title, end date, and correct calendar-day status (days remaining, due today, or days overdue).
- **SC-002**: 100% of current goals due today through three calendar days ahead receive the near-deadline highlight; overdue goals are distinguishable from upcoming goals.
- **SC-003**: A user can create a goal by entering only a title and end date and submitting the form in under one minute.
- **SC-004**: After completion or confirmed deletion, the affected goal appears only in its correct resulting state: completed or absent.
- **SC-005**: At desktop and narrow viewport sizes, users can distinguish the current and completed goal groups and access each group's actions without clipped content or horizontal scrolling.
- **SC-006**: In a review with representative users, users can correctly identify a current goal's status and locate a completed goal without assistance.

## Assumptions

- The initial experience is for one user; accounts, sharing, notifications, recurring goals, and cross-device synchronization are outside this feature's scope.
- Goals and their statuses remain available in the browser where they were created after reopening the app; use in another browser or on another device is outside this feature's scope.
- Day counts use the user's local calendar date rather than elapsed 24-hour periods.
- The three-day highlight includes goals due today and on each of the next three calendar dates. Overdue goals use a distinct indication.
- Checking a current goal completes it immediately. Deletion is a separate action and requires confirmation. Completed goals cannot be reopened in the initial scope.
- The page uses two side-by-side columns when space permits and stacks the groups on narrow screens.
