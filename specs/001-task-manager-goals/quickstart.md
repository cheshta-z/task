# Quickstart: Task Manager Goals

## Prerequisites

- Node.js version supported by the installed Next.js release.
- npm and the repository dependencies installed. After the planned date-fns dependency
  and lockfile change are implemented, install from the lockfile with `npm ci`.

## Run the application

From the repository root:

```powershell
npm run dev
```

Open `http://localhost:3000` in a browser. This guide is a manual product walkthrough;
it does not require or invoke unit, integration, or end-to-end tests.

## Manual walkthrough

1. On a fresh browser profile, confirm the current and completed groups have clear empty
   states.
2. Add a goal with a title and an end date more than three days away. Confirm it appears
   as current and shows the remaining calendar days.
3. Add goals due today and within the next three days. Confirm each current goal is
   highlighted; confirm a past end date is presented as overdue.
4. Reload the page. Confirm the goals and their statuses remain available in that browser.
5. Check a current goal. Confirm it moves to completed and no reopen action is available.
6. Request deletion of a goal from each group. Confirm cancel leaves the goal unchanged
   and confirmation removes it.
7. Open and cancel the add-goal dialog. Confirm no goal is created. Submit a blank title
   or missing date and confirm the form explains the invalid value.
8. Resize to a narrow viewport. Confirm both groups remain readable, usable, and free of
   horizontal overflow.

## Expected result

The visible goal groups, deadline labels, and actions match the scenarios in
[spec.md](spec.md). Updates are local to the current browser profile and remain available
after reload; no account or remote synchronization is involved.