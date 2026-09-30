# Research: Task Manager Goals

**Date**: 2026-09-30
**Branch**: `001-task-manager-goals`

## Decisions

### App Router and browser state

- **Decision**: Keep `app/page.tsx` as a Server Component shell and isolate interactive goal management in a Client Component. Read and write `localStorage` only in client effects and user actions, after the initial render.
- **Rationale**: The installed Next.js guide identifies state, event handlers, effects, and browser APIs as Client Component use cases. Client Components are prerendered for the first load, so reading storage during render can make server and browser output disagree. A stable initial state followed by a client load avoids that mismatch while containing browser-only code.
- **Alternatives considered**: Make the entire route a Client Component, increasing the client boundary unnecessarily; read storage in render or a state initializer, risking hydration mismatch; add a backend, which conflicts with the same-browser-only scope.
- **Source**: [Next.js Server and Client Components guide](../../node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md).

### Tailwind theme

- **Decision**: Define the light palette as Tailwind 4 `@theme` color tokens in `app/globals.css`; keep the existing Tailwind import and PostCSS plugin.
- **Rationale**: Tailwind 4 and its PostCSS integration are already declared and configured. Theme tokens expose a small consistent palette through generated utilities without another styling dependency.
- **Alternatives considered**: Add a CSS-in-JS or component styling package; use scattered literal colors, which weakens consistency; use plain custom properties for values that do not need Tailwind utility generation.
- **Source**: [Next.js CSS guide](../../node_modules/next/dist/docs/01-app/01-getting-started/11-css.md), [global stylesheet](../../app/globals.css), and [PostCSS configuration](../../postcss.config.mjs).

### Date handling with date-fns

- **Decision**: Add date-fns and use its date-only parsing, formatting, validity, and calendar-day difference functions. Persist end dates as `YYYY-MM-DD` strings and interpret them in the user's local calendar.
- **Rationale**: Calendar-day deadlines must not drift when elapsed hours cross daylight-saving transitions. date-fns provides explicit calendar-day operations and date formatting while avoiding bespoke date arithmetic. The dependency is user-requested and limited to the functions needed by this feature.
- **Alternatives considered**: `Intl.DateTimeFormat` plus custom date arithmetic would avoid a dependency but require maintaining timezone and daylight-saving-sensitive calculations; timestamp subtraction does not represent local calendar days reliably.
- **Implementation note**: Keep date-only values as date-only strings in storage. Do not turn them into UTC timestamps for display. Validate parsed values before formatting or calculating differences.

### Local persistence

- **Decision**: Store the serialized goal collection under a versioned localStorage key, scoped to the app's origin and the current browser profile. Load after hydration, validate parsed records, and persist successful user changes.
- **Rationale**: This meets persistence across reloads without accounts, network services, or cross-device synchronization. The feature has no external API, so there is no contract artifact.
- **Alternatives considered**: Session storage loses data when the session ends; a server database requires authentication and service infrastructure outside the requested scope.
- **Risks and handling**: Browser storage can be cleared, restricted, or full. Catch read/write failures, avoid crashing the board, and present a concise message when persistence is unavailable. Browser storage is shared by tabs on the same origin, but does not synchronize to other browser profiles or devices.

## Constitution Review

The framework versions remain those pinned in `package.json`. The date-fns addition is the
only new runtime dependency and is justified by the requested date behavior and explicit
calendar-day functions. No automated tests or test suite artifacts are planned.