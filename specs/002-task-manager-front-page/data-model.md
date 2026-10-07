# Data Model: Task Manager Front Page

## Goal

A single user-authored item tracked from its active state through completion or deletion.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `id` | string | Yes | Stable and unique within the stored goal collection. Generated when a goal is created. |
| `title` | string | Yes | Trim surrounding whitespace; must contain at least one non-whitespace character. |
| `endDate` | date-only string | Yes | Valid `YYYY-MM-DD` calendar date. Interpreted using the user's local calendar; a past date is allowed and appears overdue. |
| `status` | `current` or `completed` | Yes | New goals start as `current`. Completing a current goal changes its status to `completed`. |

The current implementation defines this entity as `Goal` in `lib/goals.ts`.

## Derived Deadline State

Deadline labels and highlighting are calculated from `endDate` and the user's local calendar date. They are not separately persisted.

| Derived value | Rule |
|---|---|
| Days remaining | Signed local-calendar day difference from today to the end date. |
| Due today | Days remaining equals 0. |
| Overdue days | Absolute value of a negative day difference; shown only for current goals. |
| Near deadline | Current goal with day difference from 0 through 3 inclusive. |

Completed goals remain in the completed group and do not transition back to current in this feature.

## Lifecycle

```text
Create -> Current -> Completed
             |           |
             +-- Delete -+-- Delete
```

- **Create**: A valid title and end date create a current goal.
- **Complete**: Checking a current goal changes its status to completed immediately.
- **Delete**: A confirmed delete removes a goal from the stored collection, whether current or completed.
- **Cancel deletion**: Leaves the goal and status unchanged.

## Persistence and Validation

- Persist the collection as JSON under the existing versioned key `task-manager:goals:v1` in same-browser `localStorage`.
- Validate each stored record's id, title, date string, and status before displaying it.
- If stored data is malformed or storage is unavailable, do not silently overwrite it. Show a clear message and keep the board from crashing.
- Browser storage is best-effort user data: it can be cleared by the user or unavailable due to browser settings. It is not synchronized across browsers or devices.

## Relationships and Uniqueness

There are no relationships to other entities. Goal IDs must be unique within the stored collection. Goal titles do not need to be unique.
