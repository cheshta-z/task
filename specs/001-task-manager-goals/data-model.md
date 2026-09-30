# Data Model: Task Manager Goals

## Goal

Represents one user-created goal in either the current or completed list.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `id` | string | Yes | Stable unique identifier generated when the goal is created. |
| `title` | string | Yes | Trimmed, non-empty user-visible title. |
| `endDate` | string | Yes | Valid date-only value in `YYYY-MM-DD` form; interpreted in the user's local calendar. Past dates are allowed and appear overdue. |
| `status` | `current` \| `completed` | Yes | New goals start as `current`. Checking a current goal changes it to `completed`. Completed goals cannot return to current in this scope. |

Deleting a goal removes it from the stored collection after the user confirms. No completion
timestamp is required by the current behavior.

## Derived Deadline State

Deadline values are derived at display time and are not persisted:

- `daysRemaining`: local calendar-day difference between the goal's end date and today.
- `dueToday`: true when `daysRemaining` is zero.
- `overdueDays`: absolute calendar-day difference when `daysRemaining` is negative.
- `dueSoon`: true only for a current goal with `daysRemaining` from zero through three, inclusive.

Use date-fns calendar-day operations, not elapsed-millisecond subtraction. Completed goals
remain listed but are not highlighted as current deadlines.

## Persistence

- **Store**: Browser `localStorage`, under an application-specific versioned key such as
  `task-manager:goals:v1`.
- **Value**: JSON serialization of a collection of `Goal` records.
- **Scope**: Same application origin and browser profile. No account, remote backup, or
  cross-device synchronization. Tabs on the same origin share browser storage.
- **Lifecycle**: Load after the client has mounted; validate the collection and each
  record before use. Persist after create, complete, and confirmed delete actions.
- **Failure behavior**: Storage access or serialization failures must not crash the UI.
  Keep the current session usable and tell the user when a change could not be saved.

## State Transitions

```text
Create:       (new)       -> current
Complete:     current     -> completed
Delete:       current     -> removed
Delete:       completed   -> removed
Reopen:       completed   -> not supported
```