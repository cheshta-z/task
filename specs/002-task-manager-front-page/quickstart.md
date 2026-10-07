# Quickstart: Task Manager Front Page

This guide is a manual browser walkthrough. Per the user request and project constitution, do not create or run unit, integration, or end-to-end tests.

## Prerequisites

- Node.js version compatible with the repository's `package.json` and lockfile
- Dependencies installed with `npm install`
- A current desktop or mobile browser

## Run the app

From the repository root:

```powershell
npm run dev
```

Open the local URL printed by Next.js.

## Manual validation

1. Confirm the page title is Task Manager and current and completed goals have distinct, clearly labeled columns on a wide viewport.
2. Reduce the viewport width. Confirm the goal groups stack without horizontal scrolling, clipping, or loss of controls.
3. Add a goal with a title and end date four or more local calendar days ahead. Confirm it appears under current goals with its title, formatted date, and remaining days.
4. Add goals due today and within the next three calendar dates. Confirm each current goal is highlighted and the day label is correct. Confirm an overdue current goal is clearly marked and reports days overdue.
5. Open the add-goal dialog and submit blank or invalid fields. Confirm the errors identify the fields and no goal is added. Cancel the dialog and confirm no goal is added.
6. Complete a current goal. Confirm it moves to completed and cannot be reopened. Delete a current or completed goal and confirm it is removed only after confirmation; cancel another deletion and confirm it remains.
7. Reload the same browser profile. Confirm goals and statuses remain. Open a different browser profile and confirm goals do not synchronize.
8. Exercise the dialog with a keyboard: open it, verify focus enters and remains within it, close with Escape or Cancel, and confirm focus returns to the opener.
9. If browser storage is unavailable or malformed, confirm the page remains usable, does not silently replace malformed saved data, and explains persistence failures.

## Expected result

The current/completed lists, local-calendar deadline indicators, goal actions, responsive layout, and same-browser persistence work without a network service or automated test suite.
