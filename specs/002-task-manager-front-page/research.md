# Research: Task Manager Front Page

**Date**: 2026-09-30
**Branch**: `002-task-manager-front-page`

## Decisions

### App Router rendering and browser persistence

- **Decision**: Keep `app/page.tsx` as a Server Component shell and keep interactive goal management in a Client Component. Initialize the client-rendered view to a server-stable state, then load `localStorage` in an effect after hydration. Persist successful user changes to the existing versioned key.
- **Rationale**: Next.js 16 prerenders Client Components into initial HTML. Reading browser storage in a state initializer returns different goal data on the server and browser when saved goals exist, which can cause hydration mismatch. Loading after hydration preserves the user's same-browser persistence requirement without making the whole route a client boundary.
- **Alternatives considered**: Make the whole route client-only, which broadens the client boundary; read storage during render, which is not server-safe; add a pre-hydration DOM script, which adds complexity for a small goal list; use a service or database, which is out of scope.
- **Current implementation note**: `app/_components/goal-manager.tsx` reads storage in a lazy state initializer. Replace that with a stable initial state and post-hydration load. Its write failure is caught but not surfaced, despite the nearby comment referring to a visible message; display an actionable persistence warning without discarding in-memory changes.
- **Source**: [Next.js Server and Client Components guide](../../node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md).

### Tailwind 4 theme colors

- **Decision**: Use the existing `@import "tailwindcss"` and `@theme` block in `app/globals.css` for the light palette. Prefer its existing semantic `--color-*` tokens for UI states and add or adjust only tokens needed by the design.
- **Rationale**: Tailwind CSS 4 is already configured through the existing PostCSS plugin. Its `@theme` color namespace supplies utilities without a new styling dependency. Reusing the tokens avoids a second, inconsistent set of color literals.
- **Alternatives considered**: Add CSS-in-JS or a component styling package; use scattered literal colors; define a separate theme system.
- **Current implementation note**: Theme tokens exist, but several page and card classes use Tailwind's built-in slate/blue/red/amber colors directly. Align the foreground, surfaces, borders, deadline highlight, completion, and destructive action with the semantic palette.
- **Source**: [Next.js CSS guide](../../node_modules/next/dist/docs/01-app/01-getting-started/11-css.md), [Tailwind theme tokens](../../node_modules/tailwindcss/theme.css), and [global stylesheet](../../app/globals.css).

### Date-only values and date-fns

- **Decision**: Keep goal end dates as validated `YYYY-MM-DD` strings. Use date-fns `parseISO`, `format`, `isValid`, and `differenceInCalendarDays`; determine due-today, overdue, and due-soon states from local calendar-day differences. A current goal is near deadline when the difference is 0 through 3 inclusive.
- **Rationale**: The feature defines dates by local calendar days, not elapsed 24-hour periods. date-fns calendar-day differences handle local day boundaries and daylight-saving changes. The requested dependency is already declared, so no package addition is necessary.
- **Alternatives considered**: Subtract timestamp milliseconds, which can miscount calendar days around daylight-saving transitions; hand-build timezone arithmetic; persist UTC timestamps, which changes the meaning of a date-only deadline.
- **Risks and handling**: Avoid `new Date("YYYY-MM-DD")`, which parses as UTC and can display as the previous local date. Parse validated date-only values with date-fns. Calculate user-local deadline status in the browser after hydration so the server's timezone or date cannot disagree with the user's local calendar.
- **Source**: [date-fns package declaration](../../package.json) and [current goal/date helpers](../../lib/goals.ts).

### Goal record and storage behavior

- **Decision**: Store a serialized array of validated goal records under the existing versioned `task-manager:goals:v1` key. Keep persistence scoped to the current browser profile and origin. Do not add accounts, remote synchronization, import/export, or an API.
- **Rationale**: This matches the clarified same-browser-only scope and keeps the application usable without a server-side data service.
- **Alternatives considered**: Session storage does not preserve data across browser sessions; cookies or a backend add unnecessary identity, service, and synchronization concerns.
- **Risks and handling**: Storage can be blocked, cleared, malformed, or full. Preserve malformed stored content rather than overwriting it automatically, continue to keep the current session usable where possible, and visibly report read/write failures. A browser profile or origin change does not share goals.

### Modal interaction

- **Decision**: Keep the existing add-goal interaction and validation, but ensure the modal has complete keyboard focus behavior: focus enters on open, stays within the modal, Escape/cancel closes it, and focus returns to the opener. Prefer the native modal dialog behavior if it fits the existing component without an added dependency.
- **Rationale**: The constitution requires usability across supported input methods. The existing element has dialog ARIA attributes but does not currently move, trap, or restore keyboard focus.
- **Alternatives considered**: Add a dialog library, which is unnecessary for this focused interaction; keep the current generic container without keyboard modality, which leaves an accessibility gap.

## Constitution Review

The selected approach reuses existing modules and dependencies, keeps interactions simple, preserves the responsive page structure, and adds no automated testing. No constitution violation or unresolved technology choice remains.
